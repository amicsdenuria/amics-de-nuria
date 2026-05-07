// import {
//   BookOpenIcon,
//   CalendarIcon,
// } from 'lucide-react';
import { ChurchIcon, RouteIcon, UsersIcon } from 'lucide-react';
import {
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
} from '../interfaces/primary-page-interfaces';

import { HomeSectionItem } from './interfaces';
import { site } from '@/config/site.config';

const homeCTAs: PrimaryPageNavItem[] = [
  { label: 'Rutes i itineraris', href: '/rutes-itineraris' },
  { label: 'Lliga Espiritual', href: '/lliga-espiritual' },
];

export const homeSections: HomeSectionItem[] = [
  {
    title: 'El Santuari',
    description:
      'Un lloc de fe, silenci i acollida. Descobreix la història i els espais de contemplació.',
    href: '/santuari',
    icon: ChurchIcon,
    gridClass: 'md:col-span-1', // 1/3
  },

  {
    title: 'Rutes i itineraris',
    description:
      'Rutes, itineraris i variants de camí per arribar al Santuari fent pelegrinatge. Prepara la teva visita espiritual amb tota la informació necessària.',
    href: '/rutes-itineraris',
    icon: RouteIcon,
    gridClass: 'md:col-span-2', // 2/3
  },

  // {
  //   title: 'Agenda',
  //   description:
  //     "Celebracions, actes litúrgics, trobades comunitàries i esdeveniments especials al llarg de l'any. Consulta el calendari i no et perdis cap activitat.",
  //   href: '/agenda',
  //   icon: CalendarIcon,
  //   gridClass: 'md:col-span-3', // 3/3 (full width)
  // },

  // TO PROD
  // {
  //   title: 'Lliga Espiritual',
  //   description:
  //     'Espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
  //   href: '/lliga-espiritual',
  //   icon: UsersIcon,
  //   gridClass: 'md:col-span-2', // 2/3
  // },
  // TILL PROD READY
  {
    title: 'Lliga Espiritual',
    description:
      'Espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
    href: '/lliga-espiritual',
    icon: UsersIcon,
    gridClass: 'md:col-span-3', // 2/3
  },

  // {
  //   title: 'Publicacions',
  //   description: 'Llibres, materials de pregària i recursos espirituals.',
  //   href: '/publicacions',
  //   icon: BookOpenIcon,
  //   gridClass: 'md:col-span-1', // 1/3
  // },
];

interface HomeContent {
  hero: PrimaryPageHeroContent;
  sections: HomeSectionItem[];
}

export const homeContent: HomeContent = {
  hero: {
    pretitle: 'Amics de Núria',
    title: site.hero.title,
    subtitle: '',
    description: site.hero.description,
    ctas: homeCTAs,
    img: {
      src: '/hero-santuari-nuria.webp',
      alt: 'Santuari de Núria',
      className: 'object-center',
    },
  },

  sections: homeSections,
};
