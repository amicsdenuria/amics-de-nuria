import {
  BlocksPageContent,
  NestedBlocksPageContent,
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
  drRamon: BlocksPageContent;
  confraria: BlocksPageContent;
  origens: NestedBlocksPageContent;
  cartaPresident: {
    title: string;
    intro: string;
    content: string[];
  };
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

    chronology: TextBlock & {
      ctaLabel: string;
      href: string;
    };

    rrss: {
      title: string;
      subtitle: string;
      own: SocialLink[];
      others: SocialLink[];
    };
  };
  pages: LligaEspiritualSubpages;
}
