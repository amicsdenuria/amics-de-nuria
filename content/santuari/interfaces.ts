import {
  BlocksPageContent,
  InfoItem,
  NestedTextBlock,
  OrderedCardItem,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
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
    pilgrimages: {
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

export interface ComArribarPageContent {
  title: string;
  intro: string;
  sections: NestedTextBlock[];
  practical: InfoItem[];
}

export interface SantuariSubpages {
  vallDeNuria: BlocksPageContent;
  basilica: BlocksPageContent;
  mareDeDeu: BlocksPageContent;
  creuOllaCampana: BlocksPageContent;
  santGil: BlocksPageContent;
  viaCrucis: {
    title: string;
    intro: string;
    blocks: TextBlock[];
    stations: OrderedCardItem[];
    recommendations: string;
    closing: string;
  };
  llarAmadeu: BlocksPageContent;
  comArribar: ComArribarPageContent;
}
