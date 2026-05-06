export interface PrimaryPageNavItem {
  label: string;
  href: string;
}

export interface PrimaryPageHeroContent {
  pretitle?: string;
  title: string;
  subtitle: string;
  description: string;
  ctas: {
    label: string;
    href: string;
  }[];
  img?: {
    src: string;
    alt: string;
    className?: string;
  };
}

export interface SectionCard {
  title: string;
  description: string;
  href: string;
}

export interface TextBlock {
  title: string;
  body: string;
}

export interface InfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface OrderedCardItem {
  number: number;
  title: string;
  body: string;
}

export interface RomanOrderedCardItem {
  number: string;
  title: string;
  body: string;
}

export interface BlocksPageContent {
  title: string;
  intro: string;
  blocks: TextBlock[];
}

export interface NestedTextBlock {
  title: string;
  body: string;
  items?: NestedTextBlock[]; // subseccions opcionals
}
