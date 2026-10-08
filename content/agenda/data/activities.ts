import type { DomainActivity } from '@/domain/activity/activity.types';
import { activityTypes } from './activityTypes';
import { spiritActivity } from './mockActivity-sortides-esperit';

export const localActivities: DomainActivity[] = [
  spiritActivity,
  {
    ...spiritActivity,
    id: 'activity-sortides-amb-esperit-2027',
    slug: 'sortides-amb-esperit-2027',
    title: "Sortides amb l'Esperit: camí de primavera",
    schedule: {
      startDate: new Date('2027-05-09T08:00:00+02:00'),
      endDate: new Date('2027-05-09T18:00:00+02:00'),
      durationMinutes: 600,
    },
  },
  {
    id: 'activity-sortida-familiar-a-nuria',
    slug: 'sortida-familiar-a-nuria',
    title: 'Sortida familiar a Núria',
    description:
      'Una jornada per descobrir la vall en família amb una caminada suau i una estona de convivència.',
    type: activityTypes.nature,
    isSpiritActivity: false,
    status: 'full',
    schedule: {
      startDate: new Date('2027-07-05T09:00:00+02:00'),
      endDate: new Date('2027-07-05T17:00:00+02:00'),
      durationMinutes: 480,
    },
    location: {
      name: 'Vall de Núria',
      city: 'Queralbs',
      province: 'Girona',
      isOnline: false,
    },
    organizer: { name: 'Amics de Núria' },
    participants: { minParticipants: 8, maxParticipants: 35 },
    registration: {},
    price: { isFree: false, amount: 12 },
    requirements: {
      minAge: 6,
      level: 'beginner',
      notes: 'Els menors han de participar acompanyats d’una persona adulta.',
    },
    content: {
      mainImage: {
        url: '/hero-vall-nuria.webp',
        alt: 'Vista panoràmica de la Vall de Núria',
      },
    },
  },
  {
    id: 'activity-taller-online-pelegrinatge',
    slug: 'taller-online-pelegrinatge',
    title: 'Taller online de preparació del pelegrinatge',
    description:
      'Sessió pràctica per preparar el material i resoldre dubtes abans de començar el camí.',
    type: activityTypes.workshop,
    isSpiritActivity: false,
    status: 'scheduled',
    schedule: {
      startDate: new Date('2027-07-15T19:00:00+02:00'),
      durationMinutes: 90,
    },
    location: { name: 'Videoconferència', isOnline: true },
    organizer: {
      name: 'Amics de Núria',
      organizerUrl: 'https://amicsdenuria.com',
    },
    participants: { maxParticipants: 50 },
    registration: {},
    price: { isFree: true },
    requirements: { level: 'any' },
  },
  {
    id: 'activity-festa-final-temporada',
    slug: 'festa-final-de-temporada',
    title: 'Festa final de temporada',
    description:
      'Celebració de cloenda amb música i activitats per a totes les edats.',
    type: activityTypes.celebration,
    isSpiritActivity: false,
    status: 'cancelled',
    schedule: {
      startDate: new Date('2027-09-06T18:00:00+02:00'),
      endDate: new Date('2027-09-06T21:00:00+02:00'),
      durationMinutes: 180,
    },
    location: {
      name: 'Plaça del Monestir',
      city: 'Ripoll',
      province: 'Girona',
      isOnline: false,
    },
    organizer: { name: 'Amics de Núria' },
    participants: {},
    registration: {},
    price: { isFree: true },
    metadata: {
      cancelledAt: new Date('2027-08-20T10:00:00+02:00'),
      cancellationReason: 'Activitat cancel·lada per motius organitzatius.',
    },
  },
  {
    id: 'activity-vetlla-pregaria-2026',
    slug: 'vetlla-de-pregaria-2026',
    title: 'Vetlla de pregària',
    description:
      'Espai de pregària comunitària per compartir el sentit espiritual del camí.',
    type: activityTypes.culture,
    isSpiritActivity: false,
    status: 'scheduled',
    schedule: {
      startDate: new Date('2026-07-12T20:00:00+02:00'),
      endDate: new Date('2026-07-12T21:00:00+02:00'),
      durationMinutes: 60,
    },
    location: {
      name: 'Parròquia de Santa Maria',
      city: 'Barcelona',
      province: 'Barcelona',
      isOnline: false,
    },
    organizer: { name: 'Amics de Núria' },
    participants: {},
    registration: {},
    price: { isFree: true },
  },
];
