import {
  BlocksPageContent,
  InfoItem,
  OrderedCardItem,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  SectionCard,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

export interface SantuariSubpages {
  basilica: BlocksPageContent;
  mareDeDeu: BlocksPageContent;
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
  comArribar: {
    title: string;
    intro: string;
    blocks: TextBlock[];
    practical: InfoItem[];
    closing: string;
  };
}

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
