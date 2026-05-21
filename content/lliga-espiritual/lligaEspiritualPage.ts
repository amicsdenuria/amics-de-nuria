import { InstagramIcon, MapPinIcon, YoutubeIcon } from 'lucide-react';

import { LligaEspiritualContent } from './interfaces';
import { PrimaryPageNavItem } from '../interfaces/primary-page-interfaces';
import { lligaEspiritualSubpages } from './lligaEspiritualSubpages';

const lligaEspiritualCTAs: PrimaryPageNavItem[] = [
  // TODO: Acabar de decidir els CTAs
  {
    label: lligaEspiritualSubpages.missioValors.title,
    href: '/lliga-espiritual/missio-valors',
  },
  {
    label: lligaEspiritualSubpages.drRamon.title,
    href: '/lliga-espiritual/dr-ramon-bassols',
  },
  {
    label: lligaEspiritualSubpages.confraria.title,
    href: '/lliga-espiritual/confraria',
  },
  {
    label: lligaEspiritualSubpages.origens.title,
    href: '/lliga-espiritual/origens',
  },
  { label: 'Segueix-nos', href: '/lliga-espiritual#rrss' },
  {
    label: lligaEspiritualSubpages.cartaPresident.title,
    href: '/lliga-espiritual/carta-president',
  },
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
      ctas: [
        lligaEspiritualCTAs[0],
        lligaEspiritualCTAs[lligaEspiritualCTAs.length - 1],
      ],
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

    cards: {
      title: 'La Lliga espiritual de la Mare de Déu de Núria',
      items: [
        {
          title: lligaEspiritualSubpages.missioValors.title,
          description: lligaEspiritualSubpages.missioValors.intro,
          href: '/lliga-espiritual/missio-valors',
        },
        {
          title: lligaEspiritualSubpages.drRamon.title,
          description: lligaEspiritualSubpages.drRamon.intro,
          href: '/lliga-espiritual/dr-ramon-bassols',
        },
        {
          title: lligaEspiritualSubpages.confraria.title,
          description: lligaEspiritualSubpages.confraria.intro,
          href: '/lliga-espiritual/confraria',
        },
        {
          title: lligaEspiritualSubpages.origens.title,
          description: lligaEspiritualSubpages.origens.intro,
          href: '/lliga-espiritual/origens',
        },
        {
          title: lligaEspiritualSubpages.cartaPresident.title,
          description: lligaEspiritualSubpages.cartaPresident.intro,
          href: '/lliga-espiritual/carta-president',
        },
      ],
    },

    rrss: {
      title: 'Xarxes Socials',
      subtitle:
        "Comparteix la passió per Núria: segueix-nos per viure activitats, pelegrinatges i altres iniciatives que organitzem des de l'associació.",
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
        {
          label: 'Youtube',
          href: 'https://www.youtube.com/@AmicsdeN%C3%BAria',
          subtitle: '@AmicsdeNúria',
          icon: YoutubeIcon,
        },
      ],
      others: [
        {
          label: "Bisbat d'Urgell",
          href: 'https://bisbaturgell.org/ca/',
          subtitle: "Església d'Urgell",
        },
      ],
    },
  },
  pages: lligaEspiritualSubpages,
};
