import {
  BlocksPageContent,
  InfoItem,
  NestedTextBlock,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  RomanOrderedCardItem,
  SectionCard,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

export interface SantuariContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    cards: {
      title: string;
      items: SectionCard[];
    };
    rutesItineraris: {
      title: string;
      intro: string;
      cta: {
        label: string;
        href: string;
      };
    };
  };
  pages: SantuariSubpages;
}

export interface ViaCrucisPageContent {
  title: string;
  intro: string;
  blocks: TextBlock[];
  stations: RomanOrderedCardItem[];
}

export interface ComArribarPageContent {
  title: string;
  intro: string;
  sections: NestedTextBlock[];
  practical: InfoItem[];
  map: string;
}

export interface SantuariSubpages {
  vallDeNuria: BlocksPageContent;
  basilica: BlocksPageContent;
  mareDeDeu: BlocksPageContent;
  creuOllaCampana: BlocksPageContent;
  santGil: BlocksPageContent;
  creuRiba: BlocksPageContent;
  viaCrucis: ViaCrucisPageContent;
  llarAmadeu: BlocksPageContent;
  comArribar: ComArribarPageContent;
}
