---
name: sanity-images
description: >
  Project-specific Sanity image handling for metadata-first DomainImage contracts,
  adapters, and Next/Image rendering. Trigger: when creating components or
  entities that render Sanity images, use Sanity image fields, or pass images
  through domain adapters.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating UI components that render images coming from Sanity.
- Adding Sanity-backed entities with image fields and domain adapters.
- Updating GROQ projections for image fields.
- Refactoring image rendering around `next/image`, hotspot, crop, or fallbacks.

## Critical Patterns

| Situation | Rule |
| --- | --- |
| Sanity query | Request `asset`, `crop`, `hotspot`, and `alt`. |
| Domain model | Store images as `DomainImage`, not plain URL strings. |
| Adapter | Preserve Sanity metadata under `image.sanity`. |
| UI rendering | Generate render props with `getImageProps`. |
| Invalid/partial data | Treat `getImageProps(...) === null` as “do not render image”. |
| Local/static image | Use `DomainImage.url` or existing component-local static props. |
| Fill images | Pass target dimensions/aspect ratio so Sanity can apply hotspot/crop predictably. |

Do not flatten Sanity images to `img.asset->url` unless the feature explicitly does
not need hotspot/crop.

## Code Examples

### GROQ projection

```ts
img {
  asset,
  crop,
  hotspot,
  alt
}
```

Avoid this for hotspot/crop-aware images:

```ts
// ❌ Loses Sanity crop/hotspot metadata
"imageUrl": img.asset->url
```

### Adapter mapping

```ts
image: {
  sanity: data.img
    ? {
        asset: data.img.asset,
        crop: data.img.crop,
        hotspot: data.img.hotspot,
      }
    : null,
  alt: data.img?.alt ?? '',
}
```

For local or legacy data:

```ts
image: {
  url: '/local-image.webp',
  alt: 'Description',
}
```

### Fixed-size component

```tsx
const imageProps = getImageProps(entity.image, {
  width: 800,
  height: 600,
  sizes: '(min-width: 768px) 50vw, 100vw',
});

if (!imageProps) return null;

return <Image {...imageProps} />;
```

### Fill component

```tsx
const imageProps = getImageProps(entity.image, {
  fill: true,
  sizes: '100vw',
  targetWidth: 1920,
  targetHeight: 1080,
});

if (!imageProps) return null;

return (
  <div className="relative aspect-video">
    <Image {...imageProps} className="object-cover" />
  </div>
);
```

### Hero mapping

Local/manual image:

```ts
img: {
  src: '/hero.webp',
  alt: 'Hero',
  className: 'object-top',
}
```

Sanity/editorial image:

```ts
img: getImageProps(entity.image, {
  fill: true,
  sizes: '100vw',
  targetWidth: 1920,
  targetHeight: 1080,
}) ?? undefined
```

For Sanity images, avoid forcing `object-top` or `object-center` unless there is
a clear design reason. Let Sanity crop/hotspot drive the editorial framing.

## Commands

```bash
pnpm lint
pnpm lint:types
pnpm build
```

## Resources

- `domain/shared/image.types.ts` — `DomainImage` contract.
- `sanity/lib/image.ts` — `getImageProps` and `urlFor` helpers.
- `app/(site)/(public)/rutes-itineraris/heroMappers.ts` — hero mapping examples.
