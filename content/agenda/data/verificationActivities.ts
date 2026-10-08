import type { ActivityStatus, DomainActivity } from '@/domain/activity/activity.types';
import { spiritActivity } from './mockActivity-sortides-esperit';

// Development only: opt in before starting the server; never change the system clock.
export const getAgendaVerification = () => {
  const scenario = process.env.NODE_ENV === 'development' ? process.env.AGENDA_VERIFY : undefined;
  if (!scenario) return null;
  const now = new Date(process.env.AGENDA_VERIFY_NOW ?? '2026-10-08T12:00:00+02:00');
  if (!Number.isFinite(now.getTime())) throw new Error('Invalid AGENDA_VERIFY_NOW');
  let sequence = 0;
  const make = (
    title: string, start: string, status: ActivityStatus = 'scheduled',
    end?: string, durationMinutes?: number,
  ): DomainActivity => ({
    ...spiritActivity, id: `verify-${++sequence}`, slug: `verify-${sequence}`, title, status,
    isSpiritActivity: false, registration: {},
    schedule: {
      startDate: new Date(start), endDate: end ? new Date(end) : undefined, durationMinutes,
    },
  });
  let activities: DomainActivity[] = [];
  let featuredSlug: string | null = null;
  if (scenario === 'calendar') {
    activities = [
      make('Avui al matí', '2026-10-08T10:30:00+02:00'),
      make('Finalitzada avui', '2026-10-08T11:00:00+02:00', 'scheduled', '2026-10-08T11:30:00+02:00'),
      make('Dos dies', '2026-10-07T09:00:00+02:00', 'scheduled', '2026-10-09T17:00:00+02:00', 3360),
      make('Durada fins demà', '2026-10-08T23:00:00+02:00', 'scheduled', undefined, 120),
      make('Cancel·lada demà', '2026-10-09T09:00:00+02:00', 'cancelled'),
      make('Completa avui', '2026-10-08T12:00:00+02:00', 'full', undefined, 60),
      make('Ahir', '2026-10-07T10:00:00+02:00'),
    ];
    activities = activities.map((activity, index) => ({
      ...activity,
      registration: index === 0 ? {} : { registrationUrl: 'https://example.org/inscripcio' },
    }));
  } else if (scenario === 'spirit') {
    activities = [
      { ...make('Edició anterior', '2026-09-20T08:00:00+02:00'), isSpiritActivity: true },
      { ...make('Camí nou (empat B)', '2027-05-09T08:00:00+02:00'), id: 'spirit-b', isSpiritActivity: true },
      { ...make('Camí nou (empat A)', '2027-05-09T08:00:00+02:00', 'cancelled'), id: 'spirit-a', isSpiritActivity: true },
      { ...make('Edició invàlida', 'invalid'), isSpiritActivity: true },
      make('Sortides amb l’Esperit (sense marca)', '2028-05-09T08:00:00+02:00'),
    ];
  } else if (/^preview-(0|1|6|8)$/.test(scenario) || scenario === 'same-highlight') {
    const count = scenario === 'same-highlight' ? 1 : Number(scenario.slice(8)) + 2;
    activities = Array.from({ length: count }, (_, index) => make(
      `Activitat ${index + 1}`,
      `2027-05-${String(index + 1).padStart(2, '0')}T09:00:00+02:00`,
    ));
    featuredSlug = activities[scenario === 'same-highlight' ? 0 : 1].slug;
  } else if (/^archive-(0|1|6|8)$/.test(scenario) || scenario === 'archive-featured') {
    const count = scenario === 'archive-featured' ? 8 : Number(scenario.slice(8));
    activities = Array.from({ length: count }, (_, index) => make(
      `Arxivada ${index + 1}`,
      `2026-09-${String(index + 1).padStart(2, '0')}T09:00:00+02:00`,
    ));
    if (scenario === 'archive-featured') featuredSlug = activities[count - 1].slug;
  } else if (scenario !== 'empty') {
    throw new Error('Unknown AGENDA_VERIFY scenario');
  }
  return { activities, featuredSlug, now };
};
