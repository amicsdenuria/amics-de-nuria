# Proposal: Sanity Image Hotspot Crop

## Intent

Route itinerary images allow Sanity hotspot/crop editing, but rendering ignores it because queries and domain models flatten images to URL strings. Users should see Sanity editorial crops across POI, region, stage, carousel, lightbox, and hero contexts.

## Scope

### In Scope
- Preserve image metadata (`asset`, `crop`, `hotspot`, `alt`) through GROQ, generated types, domain adapters, and UI props.
- Centralize final URL generation through `sanity/lib/image.ts` and `urlFor` at render boundaries.
- Support backward-compatible URL-only image data and partial Sanity image data.
- Validate with `pnpm lint`, `pnpm lint:types`, and `pnpm build`.

### Out of Scope
- Sanity schema changes; hotspot is already enabled.
- Visual redesign of route itinerary pages.
- New automated test framework setup.

## Capabilities

### New Capabilities
- `route-itinerary-images`: Preserves Sanity image crop/hotspot metadata and rendering fallbacks.

### Modified Capabilities
- None

## Approach

Use a metadata-first migration. Update Sanity projections to return image objects instead of only `asset->url`; regenerate query types; migrate domain image contracts from `url + alt` to a metadata-first shape with legacy URL fallback; adapt UI components to request URLs from a shared builder. Missing `crop`/`hotspot` falls back to Sanity defaults. Missing metadata with a valid raw URL renders that URL. Missing asset and URL skips rendering instead of passing an empty `src` to `next/image`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `sanity/lib/rutes-itineraris/**` | Modified | Preserve image metadata in GROQ projections. |
| `sanity.types.ts` | Modified | Reflect regenerated metadata-preserving query results. |
| `domain/{poi,region,stage}/**` | Modified | Migrate image contracts and adapters. |
| `sanity/lib/image.ts` | Modified | Centralize image URL generation rules. |
| `app/(site)/(public)/rutes-itineraris/**`, `components/ImageLightbox.tsx` | Modified | Render metadata-aware sources. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Type ripple through strict TS | Med | Keep a single image shape and regenerate types before UI migration. |
| Broken rendering for partial data | Med | Explicit URL-only and no-asset fallbacks. |
| Review size growth | Low | Forecast 9-13 files, 180-320 lines; under 400-line budget, no chained PR. |

## Rollback Plan

Revert query, type, domain, and UI changes to the URL-only image contract. Schemas and content are unchanged, so rollback is code-only.

## Dependencies

- Existing Sanity hotspot-enabled schemas.
- Existing `sanity/lib/image.ts` `urlFor` helper.

## Success Criteria

- [ ] Sanity hotspot/crop metadata reaches UI image rendering paths.
- [ ] URL-only images still render when metadata is unavailable.
- [ ] Partial image data never produces empty `next/image` sources.
- [ ] `pnpm lint`, `pnpm lint:types`, and `pnpm build` pass.
