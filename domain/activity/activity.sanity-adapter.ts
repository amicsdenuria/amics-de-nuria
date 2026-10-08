import type { ActivitiesQueryResult, ActivityBySlugQueryResult } from '@/sanity.types';
import type { DomainImage } from '@/domain/shared/image.types';
import type { ActivityLevel, ActivityStatus, DomainActivity } from './activity.types';

type SanityActivity = ActivitiesQueryResult[number] | ActivityBySlugQueryResult;
const object = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : {};
const text = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;
const number = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined;
const date = (value: unknown): Date | undefined => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return undefined;
  const result = new Date(value as string);
  const calendarDay = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  return Number.isFinite(result.getTime()) && Number.isFinite(calendarDay.getTime()) &&
    calendarDay.toISOString().slice(0, 10) === value.slice(0, 10) ? result : undefined;
};
const url = (value: unknown): string | undefined => {
  try {
    const result = new URL(text(value) ?? '');
    return ['http:', 'https:'].includes(result.protocol) ? result.href : undefined;
  } catch { return undefined; }
};
const bounds = (min: unknown, max: unknown) => {
  const minimum = number(min);
  const maximum = number(max);
  return minimum !== undefined && maximum !== undefined && minimum > maximum
    ? [undefined, undefined] as const : [minimum, maximum] as const;
};
const geometry = (value: unknown, keys: readonly string[]) => {
  const data = object(value);
  return keys.every((key) => number(data[key]) !== undefined && (data[key] as number) <= 1)
    ? Object.fromEntries(keys.map((key) => [key, data[key]])) : undefined;
};
const image = (value: unknown): DomainImage | undefined => {
  const data = object(value);
  const asset = object(data.asset);
  const ref = text(asset._ref);
  const alt = text(data.alt);
  if (!ref || !/^image-[a-z\d]+-\d+x\d+-[a-z\d]+$/i.test(ref) || !alt) return undefined;
  const crop = geometry(data.crop, ['top', 'bottom', 'left', 'right']);
  const validCrop = crop && (crop.top as number) + (crop.bottom as number) < 1 &&
    (crop.left as number) + (crop.right as number) < 1 ? crop : undefined;
  return {
    alt,
    sanity: {
      asset: { _ref: ref },
      crop: validCrop,
      hotspot: geometry(data.hotspot, ['x', 'y', 'width', 'height']),
    },
  };
};

export const activityFromSanity = (value: SanityActivity): DomainActivity | null => {
  if (value === null) return null;
  const data = object(value);
  const type = object(data.type);
  const schedule = object(data.schedule);
  const location = object(data.location);
  const organizer = object(data.organizer);
  const price = object(data.price);
  const required = {
    _id: text(data._id), slug: text(data.slug), title: text(data.title),
    description: text(data.description), 'type._id': text(type._id),
    'type.slug': text(type.slug), 'type.name': text(type.name),
    'location.name': text(location.name), 'organizer.name': text(organizer.name),
  };
  const invalid = Object.entries(required).filter(([, value]) => !value).map(([key]) => key);
  const id = required._id;
  if (id && (!/^[a-z\d_.-]+$/i.test(id) || /^(drafts|versions)\./.test(id))) invalid.push('_id');
  const startDate = date(schedule.startDate);
  if (!startDate) invalid.push('schedule.startDate');
  if (!['scheduled', 'full', 'cancelled'].includes(data.status as string)) invalid.push('status');
  if (typeof location.isOnline !== 'boolean') invalid.push('location.isOnline');
  if (typeof price.isFree !== 'boolean') invalid.push('price.isFree');
  if (price.isFree === false && number(price.amount) === undefined) invalid.push('price.amount');
  if (invalid.length) {
    console.warn('[agenda] Rejected activity', { id: id ?? '(missing)', fields: invalid });
    return null;
  }
  const end = date(schedule.endDate);
  const endDate = end && end > startDate! ? end : undefined;
  const duration = number(schedule.durationMinutes);
  const durationMinutes = endDate && duration !== undefined &&
    Math.abs((endDate.getTime() - startDate!.getTime()) / 60_000 - duration) > 0.001
    ? undefined : duration;
  const participants = object(data.participants);
  const [minParticipants, maxParticipants] = bounds(participants.minParticipants, participants.maxParticipants);
  const requirements = object(data.requirements);
  const [minAge, maxAge] = bounds(requirements.minAge, requirements.maxAge);
  const level = ['beginner', 'intermediate', 'advanced', 'any'].includes(requirements.level as string)
    ? requirements.level as ActivityLevel : undefined;
  const requiredMaterials = Array.isArray(requirements.requiredMaterials)
    ? requirements.requiredMaterials.map(text).filter((item) => item !== undefined) : [];
  const notes = text(requirements.notes);
  const content = object(data.content);
  const mainImage = image(content.mainImage);
  const images = Array.isArray(content.images)
    ? content.images.map(image).filter((item) => item !== undefined).slice(0, 10) : [];
  const metadata = object(data.metadata);
  return {
    id: id!, slug: required.slug!, title: required.title!, description: required.description!,
    type: { id: required['type._id']!, slug: required['type.slug']!, name: required['type.name']! },
    status: data.status as ActivityStatus,
    isSpiritActivity: data.isSpiritActivity === true,
    schedule: { startDate: startDate!, endDate, durationMinutes },
    location: {
      name: required['location.name']!, isOnline: location.isOnline as boolean,
      ...(location.isOnline ? {} : {
        address: text(location.address), city: text(location.city), province: text(location.province),
      }),
    },
    organizer: { name: required['organizer.name']!, organizerUrl: url(organizer.organizerUrl) },
    participants: { minParticipants, maxParticipants },
    registration: { registrationUrl: url(object(data.registration).registrationUrl) },
    price: price.isFree ? { isFree: true } : { isFree: false, amount: number(price.amount)! },
    requirements: minAge !== undefined || maxAge !== undefined || level || requiredMaterials.length || notes
      ? { minAge, maxAge, level, requiredMaterials, notes } : undefined,
    content: mainImage || images.length ? { mainImage, images } : undefined,
    metadata: data.status === 'cancelled'
      ? { cancelledAt: date(metadata.cancelledAt), cancellationReason: text(metadata.cancellationReason) }
      : undefined,
  };
};

export const activitiesFromSanity = (data: ActivitiesQueryResult): DomainActivity[] =>
  data.map(activityFromSanity).filter((activity) => activity !== null);
