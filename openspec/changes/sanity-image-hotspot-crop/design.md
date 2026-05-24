# Design: Sanity Image Hotspot Crop

## Technical Approach

Migrate route-itinerary images from URL-first to metadata-first at the Sanity/domain boundary, then generate render-ready `next/image` props only at UI boundaries. GROQ projections will preserve `asset`, `crop`, `hotspot`, and `alt`; domain adapters will keep that object plus a URL-only fallback for mocks/legacy data. UI components will call a shared helper in `sanity/lib/image.ts` so missing assets never become empty `src` values.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Image contract | Add a shared `DomainImage` shape with optional `sanity`, optional `url`, and required `alt`. | Keep `{ url, alt }`; expose raw Sanity query types to UI. | Keeps legacy mocks valid while preserving crop/hotspot without coupling UI to generated query result types. |
| URL generation | Extend `sanity/lib/image.ts` with `getImageProps(image, options)` over existing `urlFor`. | Build URLs in adapters; duplicate builder calls in components. | Render context owns dimensions/sizes; central helper prevents divergent fallback behavior. |
| Rendering safety | Helper returns `null` when neither Sanity asset nor valid URL exists; components conditionally skip images. | Pass `''` to `next/image`; throw on missing image. | Matches spec fallback and avoids invalid `next/image` sources in partial content. |
| Server/client boundary | Generate plain serializable props (`src`, `alt`, `width/height` or `fill/sizes`) before or inside client components, not pass builder instances. | Pass Sanity builder/client objects through props. | Keeps Next.js RSC/client boundaries explicit and serializable. |

## Data Flow

    Sanity GROQ img{asset,crop,hotspot,alt}
        └─→ generated sanity.types.ts
            └─→ domain adapters: DomainImage
                └─→ UI render boundary: getImageProps(...)
                    └─→ next/image or skip render

URL-only mocks follow `DomainImage.url` directly through the same helper.

## File Changes

| File | Action | Description |
|---|---|---|
| `sanity/lib/rutes-itineraris/poi/getPoiBySlug.ts` | Modify | Query `img{asset,crop,hotspot,alt}` instead of only `asset->url`. |
| `sanity/lib/rutes-itineraris/region/getRegionBySlug.ts` | Modify | Preserve region image metadata. |
| `sanity/lib/rutes-itineraris/region/getRegionsBySlugs.ts` | Modify | Preserve stage-linked region image metadata. |
| `sanity/lib/rutes-itineraris/stage/getStageBySlug.ts` | Modify | Preserve `regions[].img`, `pois[].img`, and `imgs[]` metadata. |
| `sanity/lib/rutes-itineraris/stage/getStagesBySlugs.ts` | Modify | Same metadata projection for list fetches. |
| `sanity.types.ts` | Modify | Regenerate after GROQ changes. |
| `domain/shared/image.types.ts` | Create | Define reusable image contract. |
| `domain/{poi,region,stage}/*.types.ts` | Modify | Replace URL-only nested shapes with `DomainImage`. |
| `domain/{poi,region,stage}/*.adapter.ts` | Modify | Preserve metadata and fallback URL. |
| `sanity/lib/image.ts` | Modify | Add centralized safe prop builders around `urlFor`. |
| `app/(site)/(public)/components/PrimaryPageHero.tsx` | Modify | Accept render-ready image props or `null`. |
| `app/(site)/(public)/rutes-itineraris/heroMappers.ts` | Modify | Produce safe hero image config. |
| `app/(site)/(public)/rutes-itineraris/{poi,region}/[slug]/page.tsx` | Modify | Skip lightbox when no usable image exists. |
| `app/(site)/(public)/rutes-itineraris/stage/[slug]/components/StageContent.tsx` | Modify | Use safe props for POI/region cards. |
| `app/(site)/(public)/rutes-itineraris/stage/[slug]/components/StageMedia.tsx` | Modify | Pass metadata images through to carousel. |
| `app/(site)/(public)/rutes-itineraris/components/ImgsCarousel.tsx` | Modify | Build carousel image props per slide. |
| `components/ImageLightbox.tsx` | Modify | Accept precomputed thumbnail/full image props. |
| `content/rutes-itineraris/mockData/*.ts` | Modify | Keep URL-only values compatible with `DomainImage`. |

## Interfaces / Contracts

```ts
export interface DomainImageSanitySource {
  asset?: { _ref?: string; _id?: string; url?: string } | null;
  crop?: unknown;
  hotspot?: unknown;
}

export interface DomainImage {
  sanity?: DomainImageSanitySource | null;
  url?: string;
  alt: string;
}
```

`getImageProps(image, { width, height, fit, sizes, fill })` returns serializable props for `next/image` or `null`.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | No runner configured | Cover by strict types and helper branch review. |
| Integration | Query → adapter → UI prop compatibility | `pnpm lint:types` and `pnpm build`. |
| E2E | Existing route pages render | Manual smoke after build; no E2E framework exists. |

## Migration / Rollout

Regenerate Sanity types immediately after query edits, then migrate domain contracts, then UI render boundaries. Rollback is code-only: restore URL projections and URL-only domain/UI props. No Sanity content or schema migration required.

## Open Questions

- [ ] None.
