import {
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

interface AgendaContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    nextActivity: {
      title: string;
    };
    keyActivity: {
      title: string;
    };
    activities: {
      title: string;
      description: string;
    };
  };
}

const agendaCTAs: PrimaryPageNavItem[] = [
  { label: 'Pròxima activitat', href: '/agenda#next-activity' },
  { label: 'Activitat destacada', href: '/agenda#key-activity' },
  { label: 'Totes les activitats', href: '/agenda#activities' },
];

export const agendaContent: AgendaContent = {
  nav: agendaCTAs,

  home: {
    hero: {
      pretitle: "Activa't",
      title: "Agenda d'activitats",
      subtitle: 'Subtitol a mirar',
      description: 'Description a mirar',
      ctas: agendaCTAs,
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-center',
      },
    },

    intro: {
      title: 'Descobreix les activitats que celebrem',
      body: "Durant tot l'any Amics de Núria organitza diferents activitats. Troba la que t'encaixa i vine a gaudir i a passar una bona estona en molt bona companyia.",
    },

    nextActivity: {
      title: 'Pròxima activitat',
    },

    keyActivity: {
      title: 'Activitat destacada',
    },

    activities: {
      title: 'Totes les activitats',
      description:
        "Aquí trobaras totes les activitats organitzades des d'Amics de Núria, o activitats externes.",
    },
  },
};
