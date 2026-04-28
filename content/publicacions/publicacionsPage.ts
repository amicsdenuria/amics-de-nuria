import {
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

interface PublicacionsContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    keyPublication: {
      title: string;
    };
    magazine: TextBlock;
    gallery: TextBlock;
    books: TextBlock;
    other: TextBlock;
  };
}

const publicacionsCTAs: PrimaryPageNavItem[] = [
  { label: 'Publicació destacada', href: '/publicacions#key-publication' },
  { label: 'Revista', href: '/publicacions#magazine' },
  { label: 'Galería', href: '/publicacions#gallery' },
];

export const publicacionsContent: PublicacionsContent = {
  nav: publicacionsCTAs,
  home: {
    hero: {
      pretitle: "Informa't",
      title: 'Publicacions',
      subtitle: 'Troba aquí tot el contingut relacionat amb Amics de Núria',
      description: '',
      ctas: publicacionsCTAs,
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-cover',
      },
    },

    intro: {
      title: 'Descobreix les publicacions',
      body: "Llistem les publicacions més interessants de l'entitat i també publicacions externes.",
    },

    keyPublication: {
      title: 'Publicació recomanada',
    },

    magazine: {
      title: "La revista d'Amics de Núria",
      body: "Aquesta resvista es publica des d'Amics de Núria i conté articles relacionats amb l'entitat i tot el seu entorn",
    },

    gallery: {
      title: 'Galería multimedia',
      body: "Troba aquí el contingut multimedia d'activitats, pelegrinatges i altres esdeveniments d'Amics de Núria",
    },

    books: {
      title: 'Llibres',
      body: 'Aquí trobaràs llibres relacionats amb Núria i tot el seu entorn',
    },

    other: {
      title: 'Altres',
      body: "Troba altres continguts que d'una manera o altra tenen relació amb l'entitat",
    },
  },
};
