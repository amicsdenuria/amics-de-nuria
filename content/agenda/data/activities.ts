import type { DomainActivity } from '@/domain/activity/activity.types';

export const activities: DomainActivity[] = [
  {
    slug: 'cami-de-la-llum',
    id: 'cami-de-la-llum',
    titol: 'Camí de la Llum',
    descripcio:
      'Sortida matinal per caminar plegats en un entorn natural, amb espais de silenci, contemplació i conversa compartida.',
    tipus: 'natura',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-06-14T08:00:00'),
      dataFi: new Date('2026-06-14T13:00:00'),
      duradaMinuts: 300,
    },
    ubicacio: {
      nom: 'Santuari de Montserrat',
      ciutat: 'Monistrol de Montserrat',
      provincia: 'Barcelona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
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
      observacions: 'Portar calçat còmode, aigua i protecció solar.',
    },
  },
  {
    slug: 'trobada-preparacio-pelegrinatge',
    id: 'trobada-preparacio-pelegrinatge',
    titol: 'Trobada de preparació del pelegrinatge',
    descripcio:
      'Sessió informativa per preparar el pelegrinatge, revisar el material recomanat i resoldre dubtes sobre les etapes.',
    tipus: 'taller',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-06-20T18:00:00'),
      dataFi: new Date('2026-06-20T19:30:00'),
      duradaMinuts: 90,
    },
    ubicacio: {
      nom: 'Centre parroquial',
      ciutat: 'Barcelona',
      provincia: 'Barcelona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {
      maximParticipants: 40,
    },
    inscripcio: {
      requereixInscripcio: true,
      dataLimitInscripcio: new Date('2026-06-18'),
    },
    preu: {
      esGratuita: true,
    },
    requisits: {
      nivell: 'qualsevol',
    },
  },
  {
    slug: 'sortida-familiar-a-nuria',
    id: 'sortida-familiar-a-nuria',
    titol: 'Sortida familiar a Núria',
    descripcio:
      'Activitat oberta a famílies per descobrir la Vall de Núria amb una caminada suau i una estona de convivència.',
    tipus: 'natura',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-07-05T09:00:00'),
      dataFi: new Date('2026-07-05T17:00:00'),
      duradaMinuts: 480,
    },
    ubicacio: {
      nom: 'Vall de Núria',
      ciutat: 'Queralbs',
      provincia: 'Girona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {
      minimParticipants: 8,
      maximParticipants: 35,
    },
    inscripcio: {
      requereixInscripcio: true,
      dataLimitInscripcio: new Date('2026-06-30'),
    },
    preu: {
      esGratuita: false,
      import: 12,
    },
    requisits: {
      nivell: 'iniciacio',
      observacions: 'Activitat recomanada per a totes les edats.',
    },
  },
  {
    slug: 'vetlla-de-pregaria',
    id: 'vetlla-de-pregaria',
    titol: 'Vetlla de pregària',
    descripcio:
      'Espai de pregària comunitària per posar en comú intencions, agraïments i el sentit espiritual del camí.',
    tipus: 'cultura',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-07-12T20:00:00'),
      dataFi: new Date('2026-07-12T21:00:00'),
      duradaMinuts: 60,
    },
    ubicacio: {
      nom: 'Parròquia de Santa Maria',
      ciutat: 'Barcelona',
      provincia: 'Barcelona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {},
    inscripcio: {
      requereixInscripcio: false,
    },
    preu: {
      esGratuita: true,
    },
    requisits: {
      nivell: 'qualsevol',
    },
  },
  {
    slug: 'caminada-dels-pobles',
    id: 'caminada-dels-pobles',
    titol: 'Caminada dels pobles',
    descripcio:
      'Recorregut per camins tradicionals entre petits nuclis de muntanya, amb parada per compartir dinar i experiències.',
    tipus: 'esport',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-07-26T08:30:00'),
      dataFi: new Date('2026-07-26T15:30:00'),
      duradaMinuts: 420,
    },
    ubicacio: {
      nom: 'Estació de Ribes de Freser',
      ciutat: 'Ribes de Freser',
      provincia: 'Girona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {
      minimParticipants: 6,
      maximParticipants: 30,
    },
    inscripcio: {
      requereixInscripcio: true,
      dataLimitInscripcio: new Date('2026-07-22'),
    },
    preu: {
      esGratuita: true,
    },
    requisits: {
      nivell: 'intermedi',
      materialNecessari: ['Motxilla', 'Aigua', 'Esmorzar'],
    },
  },
  {
    slug: 'dinar-de-germanor',
    id: 'dinar-de-germanor',
    titol: 'Dinar de germanor',
    descripcio:
      'Trobada per compartir taula, memòria i projectes de futur amb totes les persones vinculades al camí.',
    tipus: 'gastronomia',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-08-02T13:30:00'),
      dataFi: new Date('2026-08-02T16:30:00'),
      duradaMinuts: 180,
    },
    ubicacio: {
      nom: 'Hostal de la Vall',
      ciutat: 'Queralbs',
      provincia: 'Girona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {
      maximParticipants: 50,
    },
    inscripcio: {
      requereixInscripcio: true,
      dataLimitInscripcio: new Date('2026-07-28'),
    },
    preu: {
      esGratuita: false,
      import: 18,
    },
    requisits: {
      nivell: 'qualsevol',
    },
  },
  {
    slug: 'taller-de-cants',
    id: 'taller-de-cants',
    titol: 'Taller de cants del pelegrí',
    descripcio:
      'Taller participatiu per aprendre cants senzills que acompanyaran les trobades i les etapes del pelegrinatge.',
    tipus: 'musica',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-08-09T17:00:00'),
      dataFi: new Date('2026-08-09T18:30:00'),
      duradaMinuts: 90,
    },
    ubicacio: {
      nom: 'Sala comunitària',
      ciutat: 'Barcelona',
      provincia: 'Barcelona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {
      maximParticipants: 25,
    },
    inscripcio: {
      requereixInscripcio: true,
      dataLimitInscripcio: new Date('2026-08-06'),
    },
    preu: {
      esGratuita: true,
    },
    requisits: {
      nivell: 'qualsevol',
      observacions: 'No cal experiència musical prèvia.',
    },
  },
  {
    slug: 'festa-final-de-temporada',
    id: 'festa-final-de-temporada',
    titol: 'Festa final de temporada',
    descripcio:
      'Celebració de cloenda amb activitats per a totes les edats, música i una breu presentació del calendari vinent.',
    tipus: 'festa',
    estat: 'agendada',
    horari: {
      dataInici: new Date('2026-09-06T18:00:00'),
      dataFi: new Date('2026-09-06T21:00:00'),
      duradaMinuts: 180,
    },
    ubicacio: {
      nom: 'Plaça del Monestir',
      ciutat: 'Ripoll',
      provincia: 'Girona',
      esOnline: false,
    },
    organitzador: {
      nom: 'Amics de Núria',
    },
    participants: {},
    inscripcio: {
      requereixInscripcio: false,
    },
    preu: {
      esGratuita: true,
    },
    requisits: {
      nivell: 'qualsevol',
    },
  },
];
