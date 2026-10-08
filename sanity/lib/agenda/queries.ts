import { defineQuery } from 'next-sanity';

const activityProjection = `
  _id, title, description, "slug": slug.current, status, isSpiritActivity,
  type->{_id, name, "slug": slug.current},
  schedule{startDate, endDate, durationMinutes},
  location{name, address, city, province, isOnline},
  organizer{name, organizerUrl},
  participants{minParticipants, maxParticipants},
  registration{registrationUrl},
  price{isFree, amount},
  content{mainImage{asset, crop, hotspot, alt}}
`;
const activityDetailProjection = `
  ${activityProjection},
  requirements{minAge, maxAge, level, requiredMaterials, notes},
  metadata{cancelledAt, cancellationReason},
  content{mainImage{asset, crop, hotspot, alt}, images[]{asset, crop, hotspot, alt}}
`;

export const activitiesQuery = defineQuery(`
  *[_type == "activity"] | order(schedule.startDate asc, _id asc){${activityProjection}}
`);
export const activityBySlugQuery = defineQuery(`
  *[_type == "activity" && slug.current == $slug] | order(_id asc)[0]{${activityDetailProjection}}
`);
export const featuredActivityQuery = defineQuery(`
  *[_type == "featuredActivity" && _id == $singletonId][0]
    .featuredActivity->{${activityDetailProjection}}
`);
export const currentSpiritActivityQuery = defineQuery(`
  *[_type == "currentSpiritActivity" && _id == $singletonId][0]
    .currentSpiritActivity->{${activityDetailProjection}}
`);
