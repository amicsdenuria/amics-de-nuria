import type {
  ActivityStatus,
  DomainActivity,
} from '@/domain/activity/activity.types';

import { spiritActivity } from './mockActivity-sortides-esperit';

// Development only: opt in before starting the server; never change the system clock.
export const getAgendaVerification = () => {
  const scenario =
    process.env.NODE_ENV === 'development'
      ? process.env.AGENDA_VERIFY
      : undefined;
  if (!scenario) return null;
  const now = new Date(
    process.env.AGENDA_VERIFY_NOW ?? '2026-10-08T12:00:00+02:00',
  );
  if (!Number.isFinite(now.getTime()))
    throw new Error('Invalid AGENDA_VERIFY_NOW');
  let sequence = 0;
  const make = (
    title: string,
    start: string,
    status: ActivityStatus = 'scheduled',
    end?: string,
    durationMinutes?: number,
  ): DomainActivity => ({
    ...spiritActivity,
    id: `verify-${++sequence}`,
    slug: `verify-${sequence}`,
    title,
    status,
    isSpiritActivity: false,
    registration: {},
    schedule: {
      startDate: new Date(start),
      endDate: end ? new Date(end) : undefined,
      durationMinutes,
    },
  });
  let activities: DomainActivity[] = [];
  let featuredSlug: string | null = null;
  let currentSpiritId: string | null = null;
  if (scenario === 'detail') {
    const minimal: DomainActivity = {
      ...make('Només informació essencial', '2026-10-09T09:00:00+02:00'),
      location: { name: 'Videoconferència', isOnline: true },
      participants: {},
      requirements: undefined,
      content: undefined,
    };
    const complete: DomainActivity = {
      ...make(
        'Activitat amb tots els detalls',
        '2026-10-09T09:00:00+02:00',
        'scheduled',
        '2026-10-09T11:00:00+02:00',
        120,
      ),
      location: {
        name: 'Punt de trobada',
        address: 'Carrer Major, 1',
        city: 'Queralbs',
        province: 'Girona',
        isOnline: false,
      },
      organizer: {
        name: 'Amics de Núria',
        organizerUrl: 'https://amicsdenuria.com',
      },
      registration: { registrationUrl: 'https://example.org/inscripcio' },
      price: { isFree: false, amount: 12 },
      requirements: {
        minAge: 6,
        maxAge: 80,
        level: 'beginner',
        requiredMaterials: ['Aigua', 'Calçat de muntanya'],
        notes: 'Arribeu deu minuts abans.',
      },
      content: {
        ...spiritActivity.content,
        images: [
          { url: '/hero-vall-nuria.webp', alt: 'Vista de la Vall de Núria' },
          { url: '', alt: 'Imatge sense origen' },
          { url: '/monestir-montserrat.webp', alt: 'Monestir de Montserrat' },
        ],
      },
    };
    activities = [
      minimal,
      complete,
      {
        ...complete,
        id: 'detail-full',
        slug: 'detail-full',
        title: 'Completa amb inscripció externa',
        status: 'full',
        description: complete.description.concat(
          ' A més a més conté aquest text que el fa més llarg, i encara més llarg',
        ),
      },
      {
        ...complete,
        id: 'detail-cancelled',
        slug: 'detail-cancelled',
        title: 'Cancel·lada amb motiu',
        status: 'cancelled',
        metadata: {
          cancelledAt: new Date('2026-10-07T10:00:00+02:00'),
          cancellationReason: 'Cancel·lada per pluja.',
        },
      },
      {
        ...complete,
        id: 'detail-finished',
        slug: 'detail-finished',
        title: 'Finalitzada avui',
        schedule: {
          startDate: new Date('2026-10-08T09:00:00+02:00'),
          endDate: new Date('2026-10-08T10:00:00+02:00'),
        },
      },
      {
        ...complete,
        id: 'detail-archived',
        slug: 'detail-archived',
        title: 'Activitat arxivada',
        schedule: { startDate: new Date('2026-10-07T09:00:00+02:00') },
      },
      {
        ...minimal,
        id: 'detail-empty',
        slug: 'detail-empty',
        title: 'Opcionals buits',
        requirements: { requiredMaterials: [], notes: ' ' },
        content: { mainImage: { url: '', alt: '' }, images: [] },
      },
    ];
  } else if (scenario === 'calendar') {
    activities = [
      make('Avui al matí', '2026-10-08T10:30:00+02:00'),
      make(
        'Finalitzada avui',
        '2026-10-08T11:00:00+02:00',
        'scheduled',
        '2026-10-08T11:30:00+02:00',
      ),
      make(
        'Dos dies',
        '2026-10-07T09:00:00+02:00',
        'scheduled',
        '2026-10-09T17:00:00+02:00',
        3360,
      ),
      make(
        'Durada fins demà',
        '2026-10-08T23:00:00+02:00',
        'scheduled',
        undefined,
        120,
      ),
      make('Cancel·lada demà', '2026-10-09T09:00:00+02:00', 'cancelled'),
      make('Completa avui', '2026-10-08T12:00:00+02:00', 'full', undefined, 60),
      make('Ahir', '2026-10-07T10:00:00+02:00'),
    ];
    activities = activities.map((activity, index) => ({
      ...activity,
      registration:
        index === 0
          ? {}
          : { registrationUrl: 'https://example.org/inscripcio' },
    }));
  } else if (['spirit', 'spirit-missing', 'spirit-unmarked', 'spirit-invalid'].includes(scenario)) {
    activities = [
      {
        ...make('Edició anterior', '2026-09-20T08:00:00+02:00'),
        isSpiritActivity: true,
      },
      {
        ...make('Camí nou (empat B)', '2027-05-09T08:00:00+02:00'),
        id: 'spirit-b',
        isSpiritActivity: true,
      },
      {
        ...make('Camí nou (empat A)', '2027-05-09T08:00:00+02:00', 'cancelled'),
        id: 'spirit-a',
        isSpiritActivity: true,
      },
      { ...make('Edició invàlida', 'invalid'), isSpiritActivity: true },
      make('Sortides amb l’Esperit (sense marca)', '2028-05-09T08:00:00+02:00'),
    ];
    currentSpiritId = scenario === 'spirit' ? 'verify-1'
      : scenario === 'spirit-unmarked' ? 'verify-5'
      : scenario === 'spirit-invalid' ? 'verify-4' : 'missing';
  } else if (scenario === 'browser') {
    activities = [
      { ...make('Música a Núria', '2026-10-07T18:00:00+02:00'),
        type: { id: 'verify-music', slug: 'music', name: 'Música' } },
      { ...make('Passejada d’avui', '2026-10-08T10:00:00+02:00'),
        location: { name: 'Refugi del Bosc', city: 'Ribes de Freser', isOnline: false } },
      { ...make('Finalitzada aquest matí', '2026-10-08T08:00:00+02:00', 'scheduled', '2026-10-08T09:00:00+02:00'),
        description: 'Observació de les constel·lacions.' },
      make('Trobada completa', '2026-10-09T09:00:00+02:00', 'full'),
      { ...make('Trobada cancel·lada', '2026-10-09T10:00:00+02:00', 'cancelled'),
        organizer: { name: 'Associació Camins' } },
      { ...make('Taller de descobertes', '2026-10-09T11:00:00+02:00'),
        type: { id: 'verify-new-type', slug: 'astronomy', name: 'Astronomia' },
        location: { name: 'Videoconferència', isOnline: true } },
      make('Camí de dos dies', '2026-10-07T09:00:00+02:00', 'scheduled', '2026-10-09T17:00:00+02:00'),
      make('Cancel·lada anterior', '2026-10-06T10:00:00+02:00', 'cancelled'),
    ];
  } else if (/^load-more-(0|1|12|13|24|25|60)$/.test(scenario)) {
    activities = Array.from({ length: Number(scenario.slice(10)) }, (_, index) => ({
      ...make(
        `Activitat de prova ${index + 1}`,
        new Date(Date.UTC(index < 37 ? 2027 : 2026, index < 37 ? 4 : 8, 1, 7, index)).toISOString(),
        index % 3 === 0 ? 'full' : 'scheduled',
      ),
      type: index % 2 === 0
        ? { id: 'verify-music', slug: 'music', name: 'Música' }
        : spiritActivity.type,
    }));
  } else if (
    /^preview-(0|1|6|8)$/.test(scenario) ||
    scenario === 'same-highlight'
  ) {
    const count =
      scenario === 'same-highlight' ? 1 : Number(scenario.slice(8)) + 2;
    activities = Array.from({ length: count }, (_, index) =>
      make(
        `Activitat ${index + 1}`,
        `2027-05-${String(index + 1).padStart(2, '0')}T09:00:00+02:00`,
      ),
    );
    featuredSlug = activities[scenario === 'same-highlight' ? 0 : 1].slug;
  } else if (
    /^archive-(0|1|6|8)$/.test(scenario) ||
    scenario === 'archive-featured'
  ) {
    const count =
      scenario === 'archive-featured' ? 8 : Number(scenario.slice(8));
    activities = Array.from({ length: count }, (_, index) =>
      make(
        `Arxivada ${index + 1}`,
        `2026-09-${String(index + 1).padStart(2, '0')}T09:00:00+02:00`,
      ),
    );
    if (scenario === 'archive-featured')
      featuredSlug = activities[count - 1].slug;
  } else if (scenario !== 'empty') {
    throw new Error('Unknown AGENDA_VERIFY scenario');
  }
  return { activities, featuredSlug, currentSpiritId, now };
};
