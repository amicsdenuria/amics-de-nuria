import { DomainActivity } from '@/domain/activity/activity.types';

export const spiritActivity: DomainActivity = {
  slug: 'spirit-activity',
  id: 'spirit-activity',
  titol: "Sortida amb l'Esperit - Cami de la Llum",
  descripcio:
    'Una jornada de caminar i pregar, convertint el sender en un espai de silenci i paraula compartida.',
  tipus: 'natura',
  estat: 'agendada',
  horari: {
    dataInici: new Date('2026-06-14T08:00:00'),
    dataFi: new Date('2026-06-14T18:00:00'),
    duradaMinuts: 600,
  },
  ubicacio: {
    nom: 'Santuari de Montserrat',
    ciutat: 'Monistrol de Montserrat',
    provincia: 'Barcelona',
    esOnline: false,
  },
  organitzador: {
    nom: 'Pelegrinatge a Nuria',
  },
  participants: {
    minimParticipants: 5,
    maximParticipants: 25,
  },
  inscripcio: {
    requereixInscripcio: true,
    dataLimitInscripcio: new Date('2026-06-10'),
  },
  preu: {
    esGratuita: true,
  },
  requisits: {
    nivell: 'qualsevol',
    observacions: 'Portar calçat comodo i aigua',
  },
};
