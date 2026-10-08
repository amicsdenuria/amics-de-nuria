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
    featuredActivity: {
      title: string;
    };
    activities: {
      title: string;
      description: string;
    };
    archive: {
      title: string;
      description: string;
    };
    empty: {
      title: string;
      description: string;
    };
  };
}

const agendaCTAs: PrimaryPageNavItem[] = [
  { label: 'Pròxima activitat', href: '/agenda#next-activity' },
  { label: 'Activitat destacada', href: '/agenda#featured-activity' },
  { label: 'Properes activitats', href: '/agenda#activities' },
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

    featuredActivity: {
      title: 'Activitat destacada',
    },

    activities: {
      title: 'Properes activitats',
      description:
        "Descobreix les properes trobades organitzades per Amics de Núria i les activitats amb què col·laborem.",
    },

    archive: {
      title: "Arxiu d'activitats",
      description:
        "Consulta les activitats que ja hem celebrat i els moments compartits amb la comunitat.",
    },

    empty: {
      title: 'Encara no hi ha activitats publicades',
      description:
        'Torna aviat per descobrir les properes propostes dels Amics de Núria.',
    },
  },
};
