## Exploration: sanity-image-hotspot-crop

### Current State
Sanity schemas for route itinerary images already enable hotspot (`options: { hotspot: true }`) in `poi.img`, `region.img`, and `stage.imgs[]`. However, Sanity GROQ projections reduce image fields to `{ asset->{url}, alt }`, so `crop` and `hotspot` are never returned by queries. Generated query types in `sanity.types.ts` mirror that reduced shape. Domain adapters then flatten further to `url + alt` DTOs, and UI components render those URLs directly through `next/image`. A Sanity URL builder exists in `sanity/lib/image.ts` (`urlFor`), but it is not used in the route-itinerary rendering path.

### Affected Areas
- `sanity/schemaTypes/rutes-itineraris/poi.ts` — image field supports hotspot in schema.
- `sanity/schemaTypes/rutes-itineraris/region.ts` — image field supports hotspot in schema.
- `sanity/schemaTypes/rutes-itineraris/stage.ts` — stage image array supports hotspot in schema.
- `sanity/lib/rutes-itineraris/poi/getPoiBySlug.ts` — query drops hotspot/crop metadata.
- `sanity/lib/rutes-itineraris/region/getRegionBySlug.ts` — query drops hotspot/crop metadata.
- `sanity/lib/rutes-itineraris/region/getRegionsBySlugs.ts` — query drops hotspot/crop metadata.
- `sanity/lib/rutes-itineraris/stage/getStageBySlug.ts` — nested region/poi/stage images projected as URL-only.
- `sanity/lib/rutes-itineraris/stage/getStagesBySlugs.ts` — same URL-only projection for list fetches.
- `sanity.types.ts` — generated query result types currently expose URL-only image objects.
- `domain/poi/poi.types.ts`, `domain/region/region.types.ts`, `domain/stage/stage.types.ts` — domain models store only `url + alt` image shape.
- `domain/poi/poi.adapter.ts`, `domain/region/region.adapter.ts`, `domain/stage/stage.adapter.ts` — adapters drop metadata during transformation.
- `app/(site)/(public)/rutes-itineraris/**` (`StageContent.tsx`, `StageMedia.tsx`, `ImgsCarousel.tsx`, `poi/[slug]/page.tsx`, `region/[slug]/page.tsx`, `heroMappers.ts`) and `components/ImageLightbox.tsx` — rendering depends on plain URLs and cannot apply Sanity crop/hotspot logic.
- `sanity/lib/image.ts` — existing central place to build Sanity image URLs; currently underused for these flows.

### Approaches
1. **Metadata-first domain model** — keep Sanity image object in query + domain, build URLs at render boundaries.
   - Pros: Preserves crop/hotspot end-to-end, centralizes image behavior, supports per-context sizing/cropping rules.
   - Cons: Touches more files (queries, types, adapters, UI props), requires careful fallback typing.
   - Effort: Medium

2. **Query-time precomputed URLs only** — extend GROQ to return fixed-size derived URLs and keep current domain URL strings.
   - Pros: Smaller UI changes; less type churn in domain.
   - Cons: Locks dimensions/cropping decisions into queries, weak reuse across components, harder to vary responsive sizes, still fragile for future image requirements.
   - Effort: Low/Medium

### Recommendation
Choose **Metadata-first domain model**. Keep Sanity image metadata in fetched data and domain contracts, then generate final URLs via `urlFor` in one shared mapper/helper used by UI components. This preserves hotspot/crop behavior correctly while still allowing backward-compatible fallback to raw `asset->url` when metadata is incomplete.

### Risks
- Type ripple risk: `sanity.types.ts` regeneration plus strict TS updates may cascade through adapters/components.
- Rendering risk: `next/image` requires valid `src`; missing/partial asset data must not produce empty-string URLs.
- Behavioral drift risk: differing width/height choices across components may create inconsistent crops unless centralized.
- Migration risk: existing local/mock image structures use plain URLs; dual-shape compatibility is required during transition.

### Ready for Proposal
Yes — proceed to `sdd-propose` with scope on query projection, type/domain shape migration, centralized Sanity URL builder usage, and explicit fallback rules for legacy/partial image data.
