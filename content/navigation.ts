import { PrimaryPageNavItem } from './interfaces/primary-page-interfaces';
// import { agendaContent } from './agenda/agendaPage';
import { contactaContent } from './contacta/contactaPage';
import { lligaEspiritualContent } from './lliga-espiritual/lligaEspiritualPage';
// import { publicacionsContent } from './publicacions/publicacionsPage';
import { rutesItinerarisContent } from './rutes-itineraris/rutesItinerarisPage';
import { santuariContent } from './santuari/santuariPage';

export interface NavSection {
  id: string;
  label: string;
  href: string;
  children?: PrimaryPageNavItem[];
}

export const mainPageHomeLabel = 'Vista general';

export const mainNavigation: NavSection[] = [
  {
    id: 'home',
    label: 'Inici',
    href: '/',
  },
  {
    id: 'santuari',
    label: santuariContent.home.hero.title,
    href: '/santuari',
    children: santuariContent.nav,
  },
  // {
  //   id: 'agenda',
  //   label: agendaContent.home.hero.title,
  //   href: '/agenda',
  //   children: agendaContent.nav,
  // },
  {
    id: 'rutes-itineraris',
    label: rutesItinerarisContent.home.hero.title,
    href: '/rutes-itineraris',
    children: rutesItinerarisContent.nav,
  },
  // {
  //   id: 'publicacions',
  //   label: publicacionsContent.home.hero.title,
  //   href: '/publicacions',
  //   children: publicacionsContent.nav,
  // },
  {
    id: 'lliga-espiritual',
    label: lligaEspiritualContent.home.hero.title,
    href: '/lliga-espiritual',
    children: lligaEspiritualContent.nav,
  },
  {
    id: 'contacta',
    label: contactaContent.home.hero.title,
    href: '/contacta',
  },
];
