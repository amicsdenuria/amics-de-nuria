# 🌍 Region Example

## Structure

- domain/
  - region/
  - region.types.ts
  - region.adapter.ts
  - region.service.ts

- sanity/
  - lib/region/getRegionBySlug.ts
  - lib/queries/region.ts

- content/
  - pelegrinatges/region/regions.mock.ts

---

## 🧠 1. Domain Model

### `domain/region/region.types.ts`

```
export type Region = {
  id: string
  name: string
  slug: string
  province: string
  imageUrl: string
  alt: string
  text: string[]
}
```

---

## 🔁 2. Adapter Layer

### `domain/region/region.adapter.ts`

```
SANITY → DOMAIN

export function regionFromSanity(data): Region | null {
  if (!data || !data.name || !data.slug) return null

  return {
    id: data.slug,
    name: data.name,
    slug: data.slug,
    province: data.province ?? '',
    imageUrl: data.img?.asset?.url ?? '',
    alt: data.img?.alt ?? '',
    text: data.text ?? [],
  }
}

LOCAL → DOMAIN

export function regionFromLocal(data) {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    province: data.province,
    imageUrl: data.imageUrl,
    alt: data.alt,
    text: data.text,
  }
}
```

---

## ⚙️ 3. Service Layer (PUBLIC API)

### `domain/region/region.service.ts`

```
import { regionFromSanity, regionFromLocal } from './region.adapter'
import { getRegionBySlug as getSanityRegion } from '@/sanity/lib/region/getRegionBySlug'
import { regionsMock } from '@/content/pelegrinatges/region/regions.mock'

const DATA_SOURCE: 'sanity' | 'local' = 'sanity'

export async function getRegionBySlug(slug: string) {
  if (DATA_SOURCE === 'local') {
    const region = regionsMock.find(r => r.slug === slug)
    return region ? regionFromLocal(region) : null
  }

  const data = await getSanityRegion({ slug })
  return regionFromSanity(data)
}
```

---

## 📃 4. Sanity Layer

### `sanity/lib/pelegrinatges/region/getRegionBySlug.ts`

```
QUERY

export const regionBySlugQuery = defineQuery(`
  *[_type == "region" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    province,
    img{
      asset->{ url },
      alt
    },
    text
  }
`)

FETCH FUNCTION

export async function getRegionBySlug({ slug }) {
  const res = await sanityFetch({
    query: regionBySlugQuery,
    params: { slug },
  })

  return res.data
}
```

---

## 🧪 5. Local Mock Data

### `content/pelegrinatges/region/region.mock.ts`

```
export const regionsMock = [
  {
    id: 'region-1',
    slug: 'garrotxa',
    name: 'Garrotxa',
    province: 'Girona',
    imageUrl: '/images/garrotxa.webp',
    alt: 'Volcanic region',
    text: ['Text 1', 'Text 2'],
  }
]
```

---

## 🌐 6. Usage in Next.js Page

### `app/(site)/(public)/pelegrinatges/region/[id]/page.ts`

```
import { getRegionBySlug } from '@/domain/region/region.service'

interface RegionPageParams {
  params: Promise<{ id: string }>
}

export default async funcion RegionPage({ params }) {
  const { id } = await params
  const region = await getRegionBySlug(slug)

  if (!region) return notFount()

  return (
    <div>
      <h1>{region.name}</h1>
      <p>{region.province}</p>
    </div>
  )
}
```

---

## 🔁 Switching Data Source

### `domain/region/region.service.ts`

```
const DATA_SOURCE: 'local' | 'sanity' = 'sanity' <--
```

---

## 🧠 Key Idea

- UI never knows the source
- Domain normalizes everything
- Sanity is just infrastructure
- Local is just fallback/mock
