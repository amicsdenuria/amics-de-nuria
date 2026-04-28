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
      subtitle: "Envian's un correu o truca'ns i et resoldrem qualsevol dubte.",
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
        value: 'amicsdenuria@adn.cat',
      },
      phone: {
        label: 'Telèfon',
        value: '612 34 56 78',
      },
    },
  },
};
