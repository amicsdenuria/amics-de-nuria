import {
  BlocksPageContent,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';
import {
  InstagramIcon,
  LaptopIcon,
  LucideIcon,
  MapPinIcon,
} from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  subtitle?: string;
  icon?: LucideIcon;
}

interface ComunitatContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    subscribe: TextBlock;
    manifesto: BlocksPageContent;
    rrss: {
      title: string;
      subtitle: string;
      own: SocialLink[];
      others: SocialLink[];
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
      title: 'Comunitat',
      subtitle:
        'Amics de Núria, una comunitat que uneix espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
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
      body: 'Som els Amics de Núria, una comunitat de persones vinculades al Santuari que compartim estima, tradició i compromís amb aquest espai únic del país.',
    },

    subscribe: {
      title: 'Col·labora amb nosaltres',
      body: 'Som una associació sense ànim de lucre. Pots fer-te soci o subscriptor per ajudar a preservar Núria, donar suport a les activitats i mantenir viva la seva tradició.',
    },

    manifesto: {
      title: 'Missió, història i valors',
      intro:
        'Som una comunitat amb història i propòsit, guiada per una missió clara i uns valors que donen sentit a tot el que fem.',
      blocks: [
        {
          title: 'Missió',
          body: 'Promoure i preservar l’esperit, la devoció i el patrimoni de Núria.',
        },
        {
          title: 'Història',
          body: 'Nascuts als anys 50 com un grup de famílies, avui continuem com a hereus d’aquesta tradició compartida.',
        },
        {
          title: 'Valors',
          body: 'Arrelament, espiritualitat, comunitat i amor per la natura i la cultura.',
        },
      ],
    },

    rrss: {
      title: 'Xarxes Socials',
      subtitle:
        'Comparteix la passió per Núria: segueix-nos per viure activitats, pelegrinatges i la vida de la comunitat.',
      own: [
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/amicsdenuria',
          subtitle: '@amicsdenuria',
          icon: InstagramIcon,
        },
        {
          label: 'Wikiloc',
          href: 'https://loc.wiki/u/15686852',
          subtitle: 'Amics de Núria',
          icon: MapPinIcon,
        },
      ],
      others: [
        {
          label: 'Genís Muner',
          href: 'https://www.gmuner.es',
          subtitle: 'Webs a mida',
          icon: LaptopIcon,
        },
        {
          label: 'Embotits de Planoles',
          href: 'https://www.embotitsdeplanoles.com',
          subtitle: 'Embotits de la terra',
        },
      ],
    },
  },
};
