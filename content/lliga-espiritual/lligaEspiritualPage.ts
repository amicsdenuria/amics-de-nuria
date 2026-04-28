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

interface LligaEspiritualContent {
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

const lligaEspiritualCTAs: PrimaryPageNavItem[] = [
  { label: 'Què som?', href: '/lliga-espiritual#manifesto' },
  { label: 'Segueix-nos', href: '/lliga-espiritual#rrss' },
];

export const lligaEspiritualContent: LligaEspiritualContent = {
  nav: lligaEspiritualCTAs,
  home: {
    hero: {
      pretitle: 'Coneix-nos',
      title: 'Lliga Espiritual',
      subtitle:
        'Espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
      description: '',
      ctas: lligaEspiritualCTAs,
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-center',
      },
    },

    intro: {
      title: 'Qui som',
      body: 'Amics de Núria - Lliga espiritual de la Mare de Déu de Núria volem preservar el llegat de la nostra història i la flama de la fe per cultivar, amb estima i compromís, el sentiment cristià i el vincle profund que ens uneix a la Vall de Núria i a Catalunya.',
    },

    subscribe: {
      title: 'Col·labora amb nosaltres',
      body: 'Som una associació sense ànim de lucre. Pots fer-te soci o subscriptor per ajudar a preservar Núria, donar suport a les activitats i mantenir viva la seva tradició.',
    },

    manifesto: {
      title: 'Missió, història i valors',
      intro:
        'Som una agrupació amb història i propòsit, guiada per una missió clara i uns valors que donen sentit a tot el que fem.',
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
          body: 'Arrelament, espiritualitat, germanor i amor per la natura i la cultura.',
        },
      ],
    },

    rrss: {
      title: 'Xarxes Socials',
      subtitle:
        "Comparteix la passió per Núria: segueix-nos per viure activitats, pelegrinatges i altres accions que organitzem des de l'associació.",
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
