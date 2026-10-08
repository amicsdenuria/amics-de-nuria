import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connection } from 'next/server';
import { cache, type ReactNode } from 'react';
import {
  ArrowLeftIcon, ArrowUpRightIcon, BackpackIcon, Building2Icon, CalendarIcon,
  ClockIcon, EuroIcon, MapPinIcon, UsersIcon, type LucideIcon,
} from 'lucide-react';

import OptimizedImage from '@/components/OptimizedImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageContainer from '@/components/ui/page-container';
import { ACTIVITY_TIME_ZONE } from '@/domain/activity/activity.constants';
import { getActivityDisplayStatus, getActivityRegistrationUrl } from '@/domain/activity/activity.selectors';
import { getActivityBySlug, getAgendaNow } from '@/domain/activity/activity.service';
import type { ActivityDisplayStatus, ActivityLevel } from '@/domain/activity/activity.types';
import { cn } from '@/lib/utils';
import { getImageProps } from '@/sanity/lib/image';

type ActivityPageProps = { params: Promise<{ slug: string }> };
const getActivity = cache(getActivityBySlug);
const statusLabels: Record<ActivityDisplayStatus, string> = {
  scheduled: 'Agendada', full: 'Completa', cancelled: 'Cancel·lada', finished: 'Finalitzada',
};
const statusVariants = {
  scheduled: 'default', full: 'secondary', cancelled: 'destructive', finished: 'outline',
} as const;
const levelLabels: Record<ActivityLevel, string> = {
  beginner: 'Iniciació', intermediate: 'Intermedi', advanced: 'Avançat', any: 'Qualsevol',
};
const dateFormatter = new Intl.DateTimeFormat('ca-ES', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: ACTIVITY_TIME_ZONE,
});
const timeFormatter = new Intl.DateTimeFormat('ca-ES', {
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: ACTIVITY_TIME_ZONE,
});
const priceFormatter = new Intl.NumberFormat('ca-ES', { style: 'currency', currency: 'EUR' });

function DetailField({ label, children, icon: Icon }: {
  label: string; children: ReactNode; icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {Icon ? <Icon aria-hidden="true" className="size-3.5 shrink-0" /> : null}
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

function ScheduleDate({ label, date }: { label: string; date: Date }) {
  return (
    <DetailField label={label} icon={CalendarIcon}>
      <time dateTime={date.toISOString()} className="flex flex-col gap-1">
        <span>{dateFormatter.format(date)}</span>
        <span className="text-2xl font-semibold tabular-nums">{timeFormatter.format(date)}</span>
      </time>
    </DetailField>
  );
}

function externalUrl(value?: string): string | null {
  try {
    const url = new URL(value ?? '');
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const activity = await getActivity((await params).slug);
  if (!activity) notFound();
  return {
    title: `${activity.title} | Amics de Núria`,
    description: activity.description,
    openGraph: { title: activity.title, description: activity.description },
  };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  await connection();
  const now = getAgendaNow();
  const activity = await getActivity((await params).slug);
  if (!activity) notFound();
  const { schedule, location, organizer, participants, price, requirements, metadata } = activity;
  const status = getActivityDisplayStatus(activity, now);
  const registrationUrl = getActivityRegistrationUrl(activity, now);
  const organizerUrl = externalUrl(organizer.organizerUrl);
  const locality = [location.city, location.province]
    .filter((item) => item?.trim()).join(', ');
  const mainImage = getImageProps(activity.content?.mainImage, {
    fill: true, sizes: '(min-width: 1280px) 1152px, 100vw', targetWidth: 1600, targetHeight: 900,
  });
  const gallery = (activity.content?.images ?? []).flatMap((image) => {
    const props = getImageProps(image, {
      width: 800, height: 600, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
    });
    return props ? [props] : [];
  });
  const materials = requirements?.requiredMaterials?.filter((item) => item.trim()) ?? [];
  const hasRequirementFields = requirements && (
    requirements.minAge !== undefined || requirements.maxAge !== undefined || requirements.level
  );
  const hasRequirements = requirements && (
    hasRequirementFields || materials.length > 0 || requirements.notes?.trim()
  );
  const hasCancellation = status === 'cancelled' && (metadata?.cancelledAt || metadata?.cancellationReason?.trim());

  return (
    <main>
      <div className={cn('bg-secondary/20', status === 'cancelled' && 'bg-muted/30')}>
        <PageContainer className="max-w-7xl py-12 md:py-20">
          <Button asChild variant="link" className="mb-8">
            <Link href="/agenda">
              <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
              Tornar a l’agenda
            </Link>
          </Button>
          <header className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{activity.type.name}</Badge>
              <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
            </div>
            <h1 className={cn('max-w-4xl text-4xl leading-tight text-balance text-primary md:text-5xl lg:text-6xl', status === 'cancelled' && 'text-muted-foreground line-through')}>
              {activity.title}
            </h1>
          </header>
          {mainImage ? (
            <div className="relative mt-10 aspect-video overflow-hidden rounded-xl">
              <OptimizedImage {...mainImage} className="object-cover" />
            </div>
          ) : null}
        </PageContainer>
      </div>
      <PageContainer className="grid max-w-7xl gap-12 py-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-12">
          <section aria-labelledby="activity-about" className="flex flex-col gap-4">
            <h2 id="activity-about" className="text-2xl text-primary">Sobre l’activitat</h2>
            <p className="whitespace-pre-line text-lg leading-relaxed">{activity.description}</p>
          </section>
          {hasRequirements ? (
            <section aria-labelledby="activity-requirements" className="flex flex-col gap-4">
              <h2 id="activity-requirements" className="flex items-center gap-2 text-2xl text-primary">
                <BackpackIcon aria-hidden="true" className="size-5 shrink-0" />Requisits
              </h2>
              {hasRequirementFields ? (
                <dl className="grid gap-4 sm:grid-cols-2">
                  {requirements.minAge !== undefined ? <DetailField label="Edat mínima">{requirements.minAge} anys</DetailField> : null}
                  {requirements.maxAge !== undefined ? <DetailField label="Edat màxima">{requirements.maxAge} anys</DetailField> : null}
                  {requirements.level ? <DetailField label="Nivell">{levelLabels[requirements.level]}</DetailField> : null}
                </dl>
              ) : null}
              {materials.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Material necessari</h3>
                  <ul className="list-disc pl-5 leading-relaxed">{materials.map((material, index) => <li key={index}>{material}</li>)}</ul>
                </div>
              ) : null}
              {requirements.notes?.trim() ? <p className="whitespace-pre-line leading-relaxed">{requirements.notes}</p> : null}
            </section>
          ) : null}
          {hasCancellation ? (
            <section aria-labelledby="activity-cancellation" className="flex flex-col gap-4">
              <h2 id="activity-cancellation" className="text-2xl text-primary">Cancel·lació</h2>
              {metadata?.cancelledAt ? <dl><ScheduleDate label="Data de cancel·lació" date={metadata.cancelledAt} /></dl> : null}
              {metadata?.cancellationReason?.trim() ? <p className="whitespace-pre-line leading-relaxed">{metadata.cancellationReason}</p> : null}
            </section>
          ) : null}
          {gallery.length > 0 ? (
            <section aria-labelledby="activity-gallery" className="flex flex-col gap-4">
              <h2 id="activity-gallery" className="text-2xl text-primary">Galeria</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((image, index) => <OptimizedImage key={index} {...image} className="h-auto w-full rounded-lg" />)}
              </div>
            </section>
          ) : null}
        </div>
        <aside aria-labelledby="activity-information" className="min-w-0">
          <Card>
            <CardHeader>
              <CardTitle><h2 id="activity-information">Informació pràctica</h2></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <dl className="grid gap-5">
                <ScheduleDate label="Inici" date={schedule.startDate} />
                {schedule.endDate ? <ScheduleDate label="Fi" date={schedule.endDate} /> : null}
                {schedule.durationMinutes !== undefined ? <DetailField label="Durada" icon={ClockIcon}>{schedule.durationMinutes} min</DetailField> : null}
                <DetailField label="Ubicació" icon={MapPinIcon}>
                  <div className="flex flex-col gap-1">
                    <span>{location.name}</span>
                    {location.isOnline ? <span className="text-sm text-muted-foreground">Online</span> : (
                      <>
                        {location.address?.trim() ? <span>{location.address}</span> : null}
                        {locality ? <span>{locality}</span> : null}
                      </>
                    )}
                  </div>
                </DetailField>
                <DetailField label="Organitza" icon={Building2Icon}>
                  {organizerUrl ? <a href={organizerUrl} className="break-words underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">{organizer.name}</a> : organizer.name}
                </DetailField>
                <DetailField label="Preu" icon={EuroIcon}>{price.isFree ? 'Gratuïta' : priceFormatter.format(price.amount!)}</DetailField>
                {participants.minParticipants !== undefined ? <DetailField label="Mínim de participants" icon={UsersIcon}>{participants.minParticipants}</DetailField> : null}
                {participants.maxParticipants !== undefined ? <DetailField label="Màxim de participants" icon={UsersIcon}>{participants.maxParticipants}</DetailField> : null}
              </dl>
              {registrationUrl ? (
                <Button asChild size="lg">
                  <a href={registrationUrl}>
                    Inscripció externa
                    <ArrowUpRightIcon aria-hidden="true" data-icon="inline-end" />
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </aside>
      </PageContainer>
    </main>
  );
}
