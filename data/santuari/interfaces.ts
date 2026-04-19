export interface SantuariNavItem {
  label: string;
  href: string;
}

export interface SantuariHeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctas: {
    label: string;
    href: string;
  }[];
}

export interface SantuariSectionCard {
  title: string;
  description: string;
  href: string;
}

export interface SantuariTextBlock {
  title: string;
  body: string;
}

export interface SantuariInfoItem {
  label: string;
  value: string;
}

export interface SantuariStationItem {
  number: number;
  title: string;
  meditation: string;
}

export interface SantuariPageContent {
  title: string;
  intro: string;
  blocks: SantuariTextBlock[];
}

export interface SantuariContent {
  nav: SantuariNavItem[];
  home: {
    hero: SantuariHeroContent;
    intro: SantuariTextBlock;
    cards: SantuariSectionCard[];
    pilgrimages: {
      title: string;
      intro: string;
      cta: {
        label: string;
        href: string;
      };
    };
  };
  pages: {
    mareDeDeu: SantuariPageContent;
    llarAmadeu: SantuariPageContent;
    santGil: SantuariPageContent;
    viaCrucis: {
      title: string;
      intro: string;
      blocks: SantuariTextBlock[];
      stations: SantuariStationItem[];
      recommendations: string;
      closing: string;
    };
    comArribar: {
      title: string;
      intro: string;
      blocks: SantuariTextBlock[];
      practical: SantuariInfoItem[];
      closing: string;
    };
  };
}
