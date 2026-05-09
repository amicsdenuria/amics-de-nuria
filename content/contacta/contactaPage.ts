import {
  InfoItem,
  PrimaryPageHeroContent,
} from '../interfaces/primary-page-interfaces';

interface ContactaContent {
  home: {
    hero: PrimaryPageHeroContent;
    info: {
      email: InfoItem;
      phone: InfoItem;
    };
  };
}

export const contactaContent: ContactaContent = {
  home: {
    hero: {
      title: 'Contacta amb Amics de Núria',
      subtitle:
        'Per a més informació sobre sortides, visites, pelegrinatges o col·laboracions, poseu-vos en contacte amb nosaltres.',
      description: '',
      ctas: [],
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de la vall de Núria',
        className: 'object-center',
      },
    },

    info: {
      email: {
        label: 'Correu',
        value: 'amicsdenuria.cat@gmail.com',
      },
      phone: {
        label: 'Telèfon',
        value: '607 93 41 11',
      },
    },
  },
};
