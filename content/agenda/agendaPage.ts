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
      cta: PrimaryPageNavItem;
    };
    archive: {
      title: string;
      description: string;
      cta: PrimaryPageNavItem;
    };
    empty: {
      title: string;
      description: string;
    };
  };
}

// Activate the prepared links only when slice 2C implements the browser route.
export const activityBrowserAvailable = false;
export const activityBrowserComingSoon = 'Disponible properament';

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
      cta: { label: 'Veure totes les properes activitats', href: '/agenda/activitats?period=upcoming' },
    },

    archive: {
      title: "Arxiu d'activitats",
      description:
        "Consulta les activitats que ja hem celebrat i els moments compartits amb la comunitat.",
      cta: { label: "Veure tot l’arxiu d’activitats", href: '/agenda/activitats?period=archived' },
    },

    empty: {
      title: 'Encara no hi ha activitats publicades',
      description:
        'Torna aviat per descobrir les properes propostes dels Amics de Núria.',
    },
  },
};
