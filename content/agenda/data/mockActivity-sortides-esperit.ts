import type { DomainActivity } from '@/domain/activity/activity.types';
import { SPIRIT_ACTIVITY_SLUG } from '@/domain/activity/activity.constants';
import { activityTypes } from './activityTypes';

export const spiritActivity: DomainActivity = {
  slug: SPIRIT_ACTIVITY_SLUG,
  id: 'activity-sortides-amb-esperit',
  title: "Sortides amb l'Esperit: camí de la llum",
  description:
    'Una jornada de caminar i pregar, convertint el sender en un espai de silenci i paraula compartida.',
  type: activityTypes.nature,
  status: 'scheduled',
  schedule: {
    startDate: new Date('2026-09-20T08:00:00+02:00'),
    endDate: new Date('2026-09-20T18:00:00+02:00'),
    durationMinutes: 600,
  },
  location: {
    name: 'Santuari de Montserrat',
    city: 'Monistrol de Montserrat',
    province: 'Barcelona',
    isOnline: false,
  },
  organizer: {
    name: 'Amics de Núria',
  },
  participants: {
    minParticipants: 5,
    maxParticipants: 25,
  },
  registration: {
    requiresRegistration: true,
    registrationDeadline: new Date('2026-09-16T23:59:59+02:00'),
  },
  price: {
    isFree: true,
  },
  requirements: {
    level: 'any',
    requiredMaterials: ['Calçat de muntanya', 'Aigua', 'Dinar'],
    notes: 'Cal tenir una condició física adequada per caminar tot el dia.',
  },
  content: {
    mainImage: {
      url: '/monestir-montserrat.webp',
      alt: 'Monestir de Montserrat envoltat de muntanya',
    },
  },
};
