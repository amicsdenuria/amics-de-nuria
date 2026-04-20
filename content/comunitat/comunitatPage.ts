import {
  BlocksPageContent,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

interface ComunitatContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    subscribe: TextBlock;
    manifesto: BlocksPageContent;
    rrss: {
      title: string;
      own: PrimaryPageNavItem[];
      others: PrimaryPageNavItem[];
    };
  };
}

const comunitatCTAs: PrimaryPageNavItem[] = [
  { label: 'Què som?', href: '/comunitat#manifesto' },
  { label: 'Segueix-nos', href: '/comunitat#rrss' },
];

export const comunitatContent: ComunitatContent = {
  nav: comunitatCTAs,
  home: {
    hero: {
      pretitle: 'Coneix-nos',
      title: "L'associació",
      subtitle:
        'Una comunitat que uneix espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
      description: '',
      ctas: comunitatCTAs,
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-center',
      },
    },

    intro: {
      title: 'Qui som',
      body: 'Text a revisar',
    },

    subscribe: {
      title: 'Col·labora amb nosaltres',
      body: 'Text a revisar',
    },

    manifesto: {
      title: 'Missió, història i valors',
      intro: 'Text a revisar',
      blocks: [
        { title: 'Missió', body: 'Text a revisar' },
        { title: 'Història', body: 'Text a revisar' },
        { title: 'Valors', body: 'Text a revisar' },
      ],
    },

    rrss: {
      title: 'Xarxes Socials',
      own: [
        { label: 'Instagram', href: 'https://www.instagram.com/amicsdenuria' },
        { label: 'Facebook', href: 'https://www.facebook.com/amicsdenuria' },
      ],
      others: [
        { label: 'Web', href: 'https://www.gmuner.es' },
        {
          label: 'Embotits de Planoles',
          href: 'https://www.embotitsdeplanoles.com',
        },
      ],
    },
  },
};
