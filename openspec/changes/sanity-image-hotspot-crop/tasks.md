# Tasks: Sanity Image Hotspot Crop

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed files | 14-19 |
| Estimated changed lines | 220-360 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR or 2 implementation slices |
| Delivery strategy | ask-on-risk (mapped from ask-always) |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|---|---|---|---|
| 1 | Data contract and adapters | Slice 1 | Queries + regenerated `sanity.types.ts` + `domain/shared/image.types.ts` + adapters/types; includes compatibility fallback checks. |
| 2 | Render boundary wiring | Slice 2 | `sanity/lib/image.ts`, hero/stage/carousel/lightbox/page wiring; includes lint/types/build validation. |

## Phase 1: Foundation / Contracts

- [x] 1.1 Create `domain/shared/image.types.ts` with `DomainImageSanitySource` and `DomainImage` (`alt` required, `sanity`/`url` optional).
- [x] 1.2 Update GROQ projections in `sanity/lib/rutes-itineraris/{poi,region,stage}/*.ts` to return `img{asset,crop,hotspot,alt}`.
- [x] 1.3 Regenerate `sanity.types.ts` from updated queries and confirm metadata fields are typed end-to-end.
- [x] 1.4 Update `domain/{poi,region,stage}/*.types.ts` to replace nested `{ url, alt }` image shapes with `DomainImage`.

## Phase 2: Core Implementation / Compatibility

- [x] 2.1 Refactor `domain/{poi,region,stage}/*.adapter.ts` to map Sanity metadata into `DomainImage.sanity` and preserve legacy `url` fallback.
- [x] 2.2 Update `content/rutes-itineraris/mockData/*.ts` to remain URL-only compatible with `DomainImage`.
- [x] 2.3 Extend `sanity/lib/image.ts` with `getImageProps(image, options)` that returns serializable props or `null` when no usable source exists.
- [x] 2.4 Add guard behavior in helper for rollback compatibility: prefer Sanity asset URL building, fallback to raw `url`, never emit empty `src`.

## Phase 3: Integration / UI Wiring

- [x] 3.1 Update `app/(site)/(public)/rutes-itineraris/heroMappers.ts` and `.../components/PrimaryPageHero.tsx` to consume safe image props or `null`.
- [x] 3.2 Update `app/(site)/(public)/rutes-itineraris/stage/[slug]/components/{StageContent.tsx,StageMedia.tsx}` to use `getImageProps` for POI/region/cards/media.
- [x] 3.3 Update `app/(site)/(public)/rutes-itineraris/components/ImgsCarousel.tsx` to build per-slide props from metadata-first images.
- [x] 3.4 Update `components/ImageLightbox.tsx` and `app/(site)/(public)/rutes-itineraris/{poi,region}/[slug]/page.tsx` to skip rendering when no valid image source exists.

## Phase 4: Verification / Rollback Readiness

- [x] 4.1 Validate Requirement scenarios in code review: complete metadata preservation, partial metadata defaults, URL-only render, and missing-source skip.
- [x] 4.2 Run `pnpm lint` and fix violations introduced by contract and UI wiring changes.
- [x] 4.3 Run `pnpm lint:types` and fix strict TypeScript mismatches across domain/UI boundaries.
- [x] 4.4 Run `pnpm build` and smoke-check itinerary routes for hero, stage, carousel, and lightbox rendering paths.
- [x] 4.5 Document rollback steps in change notes: revert query projections/domain contract/helper/UI wiring to URL-only contract if regression appears.
