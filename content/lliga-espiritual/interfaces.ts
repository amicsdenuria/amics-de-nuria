import {
  BlocksPageContent,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  SectionCard,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export interface LligaEspiritualSubpages {
  missioValors: BlocksPageContent;
  // drRamon: BlocksPageContent
  // confraria: BlocksPageContent
  // origens: BlocksPageContent
  // cartaPresident: BlocksPageContent
}

export interface LligaEspiritualContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    subscribe: TextBlock;

    cards: {
      title: string;
      items: SectionCard[];
    };

    // TODO
    // Missió i valors (unificar contingut actual)
    // Dr. Ramon Bassols
    // La Confraria de la Mare de Déu
    // Origens d'Amics de Núria (historia va fora i s'afegeix el contingut d'aquesta secció)
    // -- Fets cronològics (subpàgina)
    // Carta del president
    rrss: {
      title: string;
      subtitle: string;
      own: SocialLink[];
      others: SocialLink[];
    };
  };
  pages: LligaEspiritualSubpages;
}
