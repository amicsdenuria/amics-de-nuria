## Implementation Progress

**Change**: sanity-image-hotspot-crop  
**Mode**: Standard

### Completed Tasks
- [x] 1.1 Create `domain/shared/image.types.ts` with `DomainImageSanitySource` and `DomainImage`.
- [x] 1.2 Update itinerary GROQ image projections to `asset,crop,hotspot,alt`.
- [x] 1.3 Regenerate `sanity.types.ts`.
- [x] 1.4 Migrate domain image contracts to `DomainImage`.
- [x] 2.1 Map Sanity metadata in adapters.
- [x] 2.2 Keep URL-only mock data compatible with `DomainImage` contract.
- [x] 2.3 Add `getImageProps(image, options)` in `sanity/lib/image.ts`.
- [x] 2.4 Add safe guard behavior: prefer Sanity source, fallback to raw URL, return `null` for missing src.
- [x] 3.1 Wire hero mappers/components to safe image props.
- [x] 3.2 Wire stage content/media to safe image props.
- [x] 3.3 Wire carousel slides to metadata-first image input.
- [x] 3.4 Wire lightbox + poi/region pages to skip rendering without valid source.
- [x] 4.1 Validate requirement scenarios by code-path review.
- [x] 4.2 Run `pnpm lint`.
- [x] 4.3 Run `pnpm lint:types`.
- [x] 4.4 Run `pnpm build`.
- [x] 4.5 Rollback note documented below.
- [x] Correction: make fill-mode Sanity URL generation target-aware so editorial crop/hotspot is resolved against explicit render dimensions or aspect ratio instead of an unconstrained `fit('crop')` URL.

### Post-Review Correction (Hero hotspot/crop robustness)
- [x] Extended `getImageProps(..., { fill: true })` to accept optional `targetWidth`/`targetHeight` or `targetAspectRatio` so Sanity URL generation can include concrete crop targets for fill-mode images while still returning Next Image fill props.
- [x] Updated POI/Region hero mappers to pass `targetWidth: 1920` and `targetHeight: 1080` for fill hero images.
- [x] Updated aspect-video POI/Region stage cards to pass `targetWidth: 768` and `targetHeight: 432` for fill card images.
- [x] Preserved local/static hero behavior (`object-top`) while avoiding forced object-position overrides for Sanity hero images.
- [x] Avoided unconstrained `fit('crop')` for fill-mode Sanity URLs when no target frame is provided; raw legacy URLs still pass through unchanged and missing sources still return `null`.
- [x] Re-ran validation commands after correction (`pnpm lint`, `pnpm lint:types`, `pnpm build`).

### Rollback Notes
If regressions appear, revert these units in order:
1. Revert UI wiring (`heroMappers`, `PrimaryPageHero`, `StageContent`, `StageMedia`, `ImgsCarousel`, `ImageLightbox`, POI/Region pages).
2. Revert helper changes in `sanity/lib/image.ts`.
3. Revert domain adapters/types and shared image type.
4. Revert GROQ projections and regenerate `sanity.types.ts` back to URL-only asset shape.

### Deviations from Design
None — implementation matches design intent. One pragmatic detail: URL fallback for Sanity documents now comes from explicit legacy `DomainImage.url` data (e.g., mocks), not from dereferenced asset URL fields.

### Issues Found
- Initial typecheck failed because Sanity `asset` projection now returns references without `url`; adapters were adjusted accordingly.
- Follow-up correction found that fill-mode Sanity URLs were using `fit('crop')` without target sizing, making hotspot/crop resolution unpredictable for fixed frames.
- During correction, TypeScript narrowing for `targetWidth/targetHeight` in union options required switching from `'fill' in options` to `options.fill` checks in `sanity/lib/image.ts`.

### Workload / PR Boundary
- Mode: single implementation slice (ask-always approved)
- Current work unit: full change scope (all phases)
- Boundary: image metadata contract → render boundary wiring → validation
- Estimated review budget impact: medium, under 400 lines forecast bucket

### Status
17/17 tasks complete. Ready for verify.
