import {
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

interface PublicacionsContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    keyPublication: TextBlock;
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

    keyPublication: {
      title: 'Publicació recomanada',
      body: '<Contingut de la publicació recomanada>',
    },

    magazine: {
      title: "La revista d'Amics de Núria",
      body: '<Contingut de la revista>',
    },

    gallery: {
      title: 'Galería multimedia',
      body: '<Contingut de la galeria>',
    },

    books: {
      title: 'Llibres',
      body: '<Contingut dels llibres>',
    },

    other: {
      title: 'Altres',
      body: '<Altres continguts>',
    },
  },
};
