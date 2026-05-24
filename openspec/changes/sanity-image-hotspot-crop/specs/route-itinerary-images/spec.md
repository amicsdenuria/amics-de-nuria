# Route Itinerary Images Specification

## Purpose

Defines metadata-first Sanity image behavior for route itinerary content while preserving URL-only legacy and mock image compatibility.

## Requirements

### Requirement: Sanity Image Metadata Preservation

The system MUST preserve Sanity image `asset`, `crop`, `hotspot`, and `alt` data from query results through generated types, domain models, adapters, and UI props.

#### Scenario: Complete Sanity image reaches UI

- GIVEN route itinerary content contains an image with `asset`, `crop`, `hotspot`, and `alt`
- WHEN the content is queried, adapted, and passed to a UI image renderer
- THEN the renderer receives the same image metadata and alt text

#### Scenario: Partial Sanity image remains valid

- GIVEN route itinerary content contains an image with an asset but no crop or hotspot
- WHEN the content is adapted for UI rendering
- THEN the image remains renderable and missing metadata uses Sanity defaults

### Requirement: Legacy Image Compatibility

The system MUST support URL-only legacy and mock image data, and MUST NOT pass empty or invalid sources to image renderers.

#### Scenario: URL-only image renders

- GIVEN route itinerary image data contains a valid URL and alt text but no Sanity asset
- WHEN the UI renders the image
- THEN the URL is used as the image source and alt text is preserved

#### Scenario: Missing usable source is skipped

- GIVEN route itinerary image data has neither a Sanity asset nor a valid URL
- WHEN the UI attempts to render the image
- THEN no image component is rendered for that item

### Requirement: Hotspot And Crop Aware Rendering

The system MUST generate final image URLs at render boundaries using a shared Sanity image builder when a Sanity asset is available.

#### Scenario: Editorial crop is honored

- GIVEN a Sanity image includes crop and hotspot metadata
- WHEN it appears in POI, region, stage, carousel, lightbox, or hero contexts
- THEN the rendered image source reflects the editorial crop and hotspot for that context

#### Scenario: Context sizing remains explicit

- GIVEN an image is rendered in a fixed UI context
- WHEN a final source URL is requested
- THEN the requested dimensions or fit behavior match that context without requiring upstream data flattening

### Requirement: Validation Commands

The completed change MUST pass the existing project validation commands: `pnpm lint`, `pnpm lint:types`, and `pnpm build`.

#### Scenario: Quality gates pass

- GIVEN implementation of this capability is complete
- WHEN `pnpm lint`, `pnpm lint:types`, and `pnpm build` run
- THEN all commands complete successfully
