export interface DomainImageSanitySource {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  } | null;
  crop?: unknown;
  hotspot?: unknown;
}

export interface DomainImage {
  sanity?: DomainImageSanitySource | null;
  url?: string;
  alt: string;
}
