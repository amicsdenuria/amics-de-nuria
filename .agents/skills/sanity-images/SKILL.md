---
name: sanity-images
description: >
  Project-specific Sanity image handling for metadata-first DomainImage contracts,
  adapters, and provider-aware Next/Image rendering that bypasses Vercel for
  Sanity assets. Trigger: when creating components or entities that render
  images, use Sanity image fields, pass images through domain adapters, or
  change image optimization.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.1"
---

## When to Use

- Creating UI components that render images coming from Sanity.
- Adding Sanity-backed entities with image fields and domain adapters.
- Updating GROQ projections for image fields.
- Refactoring image rendering around `OptimizedImage`, `next/image`,
  `next-sanity/image`, hotspot, crop, optimization, or fallbacks.

## Critical Patterns

| Situation | Rule |
| --- | --- |
| Sanity query | Request `asset`, `crop`, `hotspot`, and `alt`. |
| Domain model | Store images as `DomainImage`, not plain URL strings. |
| Adapter | Preserve Sanity metadata under `image.sanity`. |
| UI rendering | Generate render props with `getImageProps`, then render with `OptimizedImage`. |
| Sanity delivery | Let `OptimizedImage` route `cdn.sanity.io/images/**` through `next-sanity/image` directly to Sanity's CDN. |
| Local delivery | Keep local/static images on Next's default `next/image` optimizer. |
| Invalid/partial data | Treat `getImageProps(...) === null` as “do not render image”. |
| Local/static image | Use `DomainImage.url` or existing component-local static props. |
| Fill images | Pass target dimensions/aspect ratio so Sanity can apply hotspot/crop predictably. |
| Next config | Do not add Sanity back to `images.remotePatterns`; the Sanity loader intentionally bypasses Vercel Image Optimization. |

Do not flatten Sanity images to `img.asset->url` unless the feature explicitly does
not need hotspot/crop.

Do not spread direct imports of `next-sanity/image` across the application.
Keep provider selection isolated in `components/OptimizedImage.tsx`. Do not
replace this routing with native `<img>`, global `images.unoptimized`, or
per-image `unoptimized` unless the feature has an explicit reason to give up
responsive Sanity `srcSet` generation.

## Delivery Flow

```text
Sanity image metadata
  -> getImageProps (crop, hotspot, target aspect ratio)
  -> OptimizedImage
  -> next-sanity/image loader
  -> direct cdn.sanity.io src/srcSet with auto=format

Local/static image
  -> OptimizedImage or an existing local-only next/image component
  -> Next.js/Vercel image optimizer
```

Seeing `/_next/image?url=%2F...` for a local asset such as the site logo is
expected. Seeing a Sanity CDN URL nested inside `/_next/image?url=...` is a
regression and consumes Vercel Image Optimization transformations.

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
import OptimizedImage from '@/components/OptimizedImage';

const imageProps = getImageProps(entity.image, {
  width: 800,
  height: 600,
  sizes: '(min-width: 768px) 50vw, 100vw',
});

if (!imageProps) return null;

return <OptimizedImage {...imageProps} />;
```

### Fill component

```tsx
import OptimizedImage from '@/components/OptimizedImage';

const imageProps = getImageProps(entity.image, {
  fill: true,
  sizes: '100vw',
  targetWidth: 1920,
  targetHeight: 1080,
});

if (!imageProps) return null;

return (
  <div className="relative aspect-video">
    <OptimizedImage {...imageProps} className="object-cover" />
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

After implementation, inspect at least one real Sanity-backed page:

- Sanity image `src` and `srcSet` values must point directly to
  `https://cdn.sanity.io/images/...`.
- Responsive variants must include width parameters and `auto=format`.
- There must be no
  `/_next/image?url=https...cdn.sanity.io...` requests.
- Local images may and normally should continue using `/_next/image`.
- Verify hero, card, carousel, and lightbox crop/aspect ratio where the dataset
  provides those cases. If visual verification is delegated to the user, give
  exact routes, viewports, actions, and expected results.

## Resources

- `domain/shared/image.types.ts` — `DomainImage` contract.
- `sanity/lib/image.ts` — `getImageProps` and `urlFor` helpers.
- `components/OptimizedImage.tsx` — single provider-routing boundary.
- `next.config.ts` — intentionally has no Sanity `remotePatterns` entry.
- `app/(site)/(public)/rutes-itineraris/heroMappers.ts` — hero mapping examples.
