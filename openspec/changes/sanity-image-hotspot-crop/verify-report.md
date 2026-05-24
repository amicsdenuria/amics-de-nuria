## Verification Report

**Change**: sanity-image-hotspot-crop
**Version**: N/A
**Mode**: Standard

### Completeness

| Metric | Value |
|--------|-------|
| Tasks total | 17 |
| Tasks complete | 17 |
| Tasks incomplete | 0 |
| Post-review corrections | 6/6 complete |

### Build & Tests Execution

**Build**: Passed

```text
pnpm build
Next.js 16.0.10 (Turbopack)
Compiled successfully in 18.4s
Running TypeScript ...
Generating static pages using 21 workers (4/4)
Finalizing page optimization ...
Exit code: 0
```

**Tests**: No automated test runner configured for this change scope

```text
Strict TDD is false. No test runner is configured, so verification used source audit plus the requested validation commands.
pnpm lint: exit code 0
pnpm lint:types: exit code 0
pnpm build: exit code 0
```

**Coverage**: Not available

### Spec Compliance Matrix

| Requirement | Scenario | Test | Result |
|-------------|----------|------|--------|
| Sanity Image Metadata Preservation | Complete Sanity image reaches UI | Source audit: GROQ projections, `sanity.types.ts`, adapters, UI render boundaries; `pnpm lint:types`; `pnpm build` | Partial: implemented and build-verified, no runtime scenario test |
| Sanity Image Metadata Preservation | Partial Sanity image remains valid | Source audit: `getImageProps` accepts asset with missing crop/hotspot and delegates defaults to Sanity builder; `pnpm lint:types`; `pnpm build` | Partial: implemented and build-verified, no runtime scenario test |
| Legacy Image Compatibility | URL-only image renders | Source audit: mock data keeps `url` + `alt`; `getImageProps` falls back to trimmed `image.url`; `pnpm build` | Partial: implemented and build-verified, no runtime scenario test |
| Legacy Image Compatibility | Missing usable source is skipped | Source audit: `getImageProps` returns `null`; callers conditionally skip `Image`/`ImageLightbox`; `pnpm build` | Partial: implemented and build-verified, no runtime scenario test |
| Hotspot And Crop Aware Rendering | Editorial crop is honored | Source audit: Sanity source object with `asset`, `crop`, `hotspot` reaches `urlFor`; POI/region heroes and stage cards provide target dimensions for fill rendering | Partial: implemented and build-verified, no runtime visual test |
| Hotspot And Crop Aware Rendering | Context sizing remains explicit | Source audit: fixed dimensions for carousel/lightbox; fill contexts pass `sizes` and hero/card target dimensions | Partial: implemented and build-verified, no runtime visual test |
| Validation Commands | Quality gates pass | `pnpm lint`, `pnpm lint:types`, `pnpm build` | Compliant |

**Compliance summary**: 7/7 scenarios implemented by source audit; 1/7 has direct command coverage; 0/7 have dedicated behavioral runtime tests because no runner is configured.

### Correctness (Static Evidence)

| Requirement | Status | Notes |
|------------|--------|-------|
| Preserve `asset`, `crop`, `hotspot`, `alt` through query and types | Implemented | `sanity/lib/rutes-itineraris/{poi,region,stage}/*.ts` project metadata; `sanity.types.ts` includes `SanityImageCrop` and `SanityImageHotspot` in affected query result types. |
| Preserve metadata through domain adapters | Implemented | POI, region, and stage adapters map Sanity `asset`, `crop`, and `hotspot` into `DomainImage.sanity`; `alt` is preserved with empty-string fallback. |
| Centralize URL generation | Implemented | `sanity/lib/image.ts` owns `getImageProps`, prefers Sanity source, falls back to Sanity asset URL or legacy URL, and returns `null` without a usable source. |
| Respect fill-mode crop dimensions | Implemented | Fill-mode Sanity URLs can use `targetWidth`/`targetHeight` or target aspect ratio; POI/region heroes pass `1920x1080`; stage cards pass `768x432`. |
| Avoid object-position conflict for Sanity heroes | Implemented | `PrimaryPageHero` no longer hard-codes `object-top`; local route/stage heroes keep `object-top` via mapper className. |
| Skip invalid `next/image` sources | Implemented | `ImageLightbox`, POI/region pages, stage cards, and carousel skip when `getImageProps` returns `null`; no empty `src` path found. |

### Coherence (Design)

| Decision | Followed? | Notes |
|----------|-----------|-------|
| Metadata-first `DomainImage` contract | Yes | `domain/shared/image.types.ts` defines optional `sanity`, optional `url`, required `alt`. |
| URL generation at render boundary | Yes | UI render paths call `getImageProps`; adapters do not flatten Sanity image metadata to URLs. |
| Helper returns `null` for no usable source | Yes | `getImageProps` validates non-empty strings before returning props. |
| Serializable props across server/client boundaries | Yes | Components pass plain `src`, `alt`, dimensions/fill, sizes, and className; no builder/client instances cross boundaries. |

### Git / Worktree Evidence

```text
git status --short includes expected implementation files plus unrelated-looking .atl/.skill-registry.cache.json and .atl/skill-registry.md modifications.
git diff --stat reports 23 tracked files changed, 419 insertions, 155 deletions, excluding untracked OpenSpec/domain/shared additions.
```

### Issues Found

**CRITICAL**: None

**WARNING**:
- No automated behavioral/runtime tests exist for hotspot/crop visual behavior; verification is source audit plus lint/types/build only.
- `.atl/.skill-registry.cache.json` and `.atl/skill-registry.md` are dirty and appear unrelated to the feature implementation.
- The tracked diff is already 574 changed lines before untracked additions, above the 400-line review budget even though chained PRs were not used.

**SUGGESTION**:
- Add focused tests or visual fixtures later for `getImageProps` fallback branches and Sanity hotspot/crop URL generation once a test runner or visual test path exists.
- Consider constraining `ImageLightbox` props to width/height image props only, since it renders numeric dimensions and does not support `fill` props semantically.

### Verdict

PASS WITH WARNINGS

The implementation matches the proposal, spec, design, and completed tasks by static audit, and all required validation commands pass. Residual risk is limited to missing behavioral/visual test coverage and unrelated dirty `.atl/*` files.
