# Design: Agenda Activities

## Architecture and public contracts

```text
local fixtures -----------┐
                          ├-> activity adapters -> domain services -> RSC pages
Sanity GROQ + typegen -----┘                                  └-> UI components
```

```ts
interface ActivityType {
  id: string;
  slug: string;
  name: string;
}

type ActivityStatus = 'scheduled' | 'full' | 'cancelled' | 'finished';
type ActivityLevel = 'beginner' | 'intermediate' | 'advanced' | 'any';

interface DomainActivity {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ActivityType;
  status: ActivityStatus;
  schedule: { startDate: Date; endDate?: Date; durationMinutes?: number };
  location: {
    name: string;
    address?: string;
    city?: string;
    province?: string;
    isOnline: boolean;
  };
  organizer: { name: string; organizerUrl?: string };
  participants: { minParticipants?: number; maxParticipants?: number };
  registration: {
    requiresRegistration: boolean;
    registrationDeadline?: Date;
    registrationUrl?: string;
  };
  price: { isFree: boolean; amount?: number };
  requirements?: {
    minAge?: number;
    maxAge?: number;
    level?: ActivityLevel;
    requiredMaterials?: string[];
    notes?: string;
  };
  content?: { mainImage?: DomainImage; images?: DomainImage[] };
  metadata?: { cancelledAt?: Date; cancellationReason?: string };
}
```

The domain service exposes `getActivities`, `getActivityBySlug`, and
`getFeaturedActivity`. A pure selector accepts activities plus `now` and
returns `nextActivity`, `upcomingActivities`, and `archivedActivities`.

## Selection rules

- Next is the earliest future `scheduled` or `full` activity.
- Upcoming contains future activities except `finished`; future cancelled
  activities remain visible with a destructive status.
- Archive contains activities in the past or explicitly `finished`, newest
  first.
- A rendered next or featured activity is removed from the remaining list.
- If featured equals next, only next renders. Missing featured data hides its
  section.
- Detail remains addressable for every valid slug regardless of status.

## Sanity model

### `activityType`

- `name`: required Catalan editorial name.
- `slug`: required unique slug generated from the name.
- Documents sort by `name asc`; activity uses one required strong reference.
- The reference input permits inline creation. Referenced types cannot be
  deleted, but unused types can be edited or removed.
- Initial documents: sport/Esport, gastronomy/Gastronomia, culture/Cultura,
  music/Música, nature/Natura, games/Jocs, celebration/Festa,
  workshop/Taller, and other/Altre.

### `activity`

- Required: title, description, slug, type, status, schedule.startDate,
  location.name/isOnline, organizer.name, registration.requiresRegistration,
  and price.isFree.
- Studio groups: General; Horari; Ubicació i organització; Inscripció i preu;
  Requisits; Contingut; Cancel·lació.
- Status options: Agendada, Completa, Cancel·lada, Finalitzada.
- Level options: Iniciació, Intermedi, Avançat, Qualsevol.
- End MUST follow start. If end and duration exist, their minute difference
  MUST match. Participant and age minima MUST NOT exceed maxima.
- Amount is visible and required only when not free. Physical address fields,
  registration details, and cancellation metadata use conditional visibility.
- Images are optional; every supplied image requires an asset and Catalan alt.
  Hotspot is enabled and gallery is unique with at most ten entries.
- Preview uses title, start date, status, type, and main image; orderings include
  start date and title.

### `featuredActivity`

A protected singleton contains one required strong reference named
`featuredActivity`. It follows the existing `currentRoute` structure and is
shown under the Agenda Studio section.

## Queries and adapters

- List query projects card fields, main image, and
  `type->{_id,name,"slug":slug.current}` ordered by start date.
- Detail query adds requirements, metadata, and gallery.
- Featured query resolves the singleton reference with the detail projection.
- Every image projection requests `asset`, `crop`, `hotspot`, and `alt`.
- Adapters map `_id` to `id`, `slug.current` to `slug`, strings to `Date`, the
  dereferenced type to `ActivityType`, and image metadata to `DomainImage`.
- An invalid document missing a resolved type returns `null`; collection
  adapters filter nulls instead of crashing the page.

## UI and server boundaries

- `/agenda` is an async Server Component and starts activities and featured
  fetches together. It renders hero, next, featured, remaining upcoming,
  archive, and an accessible empty state.
- `/agenda/activity/[slug]` is a Server Component with dynamic metadata and
  `notFound()` for an unknown slug.
- Cards use a calendar-editorial visual direction within existing fonts,
  semantic tokens, shadcn composition, responsive grids, and visible focus.
- `/rutes-itineraris` calls `getActivityBySlug` with a shared constant for
  `sortides-amb-esperit`; missing data leaves the placeholder section intact.
- Dates render with `ca-ES` and `Europe/Madrid`; prices use EUR.

## Image delivery

Local fixtures store `{url, alt}`. Sanity adapters retain metadata under
`DomainImage.sanity`. UI calls `getImageProps`; `null` means no render.
`OptimizedImage` keeps local images on Next optimization and routes Sanity
images directly through `next-sanity/image`. Sanity MUST NOT be added to
`next.config.ts` remote patterns.

## Migration and rollout

Schemas are additive; Content Lake has no schema migration. After the empty
state passes, import only predefined type documents, then let editors create
activities and the singleton in Studio. Finally validate remote documents and
live publication behavior.
