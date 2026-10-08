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

type ActivityStatus = 'scheduled' | 'full' | 'cancelled';
type ActivityDisplayStatus = ActivityStatus | 'finished';
type ActivityLevel = 'beginner' | 'intermediate' | 'advanced' | 'any';

interface DomainActivity {
  id: string;
  slug: string;
  title: string;
  description: string;
  isSpiritActivity: boolean;
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

The domain service exposes `getActivities`, `getActivityBySlug`,
`getFeaturedActivity`, and (after phase 4) `getCurrentSpiritActivity`. The agenda selector accepts
activities plus `now` and returns next, upcoming, and archived activities;
the current spirit read resolves a fixed editorial reference. Phase 3 adds only
the Studio model; the approved local phase 2 service remains until phase 4.

## Selection rules

- Calendar comparisons use date keys in `Europe/Madrid`, never the host timezone
  or a fixed 24-hour offset. The last activity day comes from `endDate`, otherwise
  start plus duration when present, otherwise `startDate`.
- Archive contains activities whose last Madrid calendar day is before today,
  newest start date first. Today's activities remain outside the archive until
  the following midnight, including those already finished by the domain clock.
- Upcoming contains every non-archived activity, including today and all statuses,
  in ascending start order. Next is its earliest `scheduled` or `full` activity,
  that has not finished, including one that started today. Status does not override archive placement.
- A rendered next or featured activity is removed from the remaining list.
- If featured equals next, only next renders. Missing featured data hides its
  section.
- Detail remains addressable for every valid slug regardless of status.
- All date sorts break ties by `id` ascending. Compute `now` once per server render
  and pass its ISO value to interactive consumers; recalculate on a new render.

Completion is derived at `now >= endDate`, otherwise start plus a supplied
duration; with neither, at the next Madrid calendar day. Cancellation remains
the visible label after completion; other completed activities display `finished`.
Never persist `finished`, completion/archive flags, or registration eligibility.
Cards show separate Inici, optional Fi, and optional Durada stacks. Each date
stack separates the calendar date from its Madrid time (24-hour clock).
Card headers keep the title left and type pill right.
Card content orders location, description clamped to three lines, then the
schedule panel; the detail page retains the complete description.
A non-scheduled display status replaces capacity in the footer. Cancelled cards use the existing muted
theme tokens, faded text and a struck-through title, keeping the red status pill. They retain
their detail link and keyboard focus; never disable navigation.

## Spirit editions and registration

Each spirit outing is a separate activity with its own ID and slug, marked
`isSpiritActivity: true` (default false). Do not match mutable titles, type names,
or slug prefixes. Revised by the user on 2026-10-08 for phase 3: the protected
`currentSpiritActivity` singleton selects the edition manually, like `currentRoute`
and `featuredActivity`. Its required strong reference has the same field name.
Editors may keep multiple editions published and choose any marked edition,
independent of date/status. A later date never changes the pointer automatically.
There is no date-based fallback when the singleton/reference is missing or invalid.
Retain the marker to filter the picker and validate membership; changing title/type
does not change membership. Phase 4 replaces `getLatestSpiritActivity` and its local
automatic selector with the reference-based service and a local selected ID fixture.

Registration stores only an optional HTTP(S) `registrationUrl`. With no URL,
render no registration CTA or mandatory contact step. With a URL, show the CTA
unless the activity is archived, cancelled, or finished. `full` keeps the link:
the external service owns availability. Remove `requiresRegistration` and
`registrationDeadline`; there are no internal bookings, deadlines, or counters.

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

- Required: title, description, unique slug, type, status, schedule.startDate,
  location.name/isOnline, organizer.name, and price.isFree. The spirit checkbox
  defaults to false and registration URL is optional.
- Studio groups: General; Horari; Ubicació i organització; Inscripció i preu;
  Requisits; Contingut; Cancel·lació.
- Editorial status options: Agendada (default), Completa, Cancel·lada.
- Level options: Iniciació, Intermedi, Avançat, Qualsevol.
- End MUST follow start. If end and duration exist, their minute difference
  MUST match. Participant and age minima MUST NOT exceed maxima.
- Amount is visible and required only when not free. Physical address fields
  and cancellation metadata use conditional visibility. Registration URL remains
  directly editable without a prerequisite registration toggle.
- Images are optional; every supplied image requires an asset and Catalan alt.
  Hotspot is enabled and gallery is unique with at most ten entries.
- Preview uses title, start date, status, type, and main image; orderings include
  start date and title.

### `featuredActivity`

A protected singleton with exact document ID `featuredActivity` contains one
required strong reference named `featuredActivity`, selected by the editor in
Studio's Destacats section. Sanity stores the activity's `_id` in `_ref`, not its slug;
dereferencing returns the activity and its current slug. Share the singleton ID
between Studio and query, and query that ID instead of the first document of its
type. Preserve existing `currentRoute` behavior and its `currentRoute-3` ID.
Any valid referenced activity may be featured, including an archived one.

### `currentSpiritActivity`

Use exact document ID `currentSpiritActivity`, shared with the future query through
`sanity/agenda.constants.ts`. The picker offers only activities marked
`isSpiritActivity == true`, with inline creation disabled. Validation also checks
the referenced activity (preferring its draft when present), so a removed marker
cannot silently pass validation when the singleton is edited. The reference is
strong and stores `_id`, never a copied slug. The selected activity's real slug
will drive the routes CTA in phase 4; published reads must reject unresolved,
unpublished, invalid or unmarked targets. Missing selection retains contact fallback.
Both Agenda singletons are excluded from creation templates and all creation
contexts; delete/duplicate actions are disabled. `currentRoute-3` stays unchanged.

Studio's Seccions contains a Destacats folder with a star icon and, in order, Ruta d'Enguany,
Sortida amb l’Esperit actual and Activitat destacada. No singleton appears directly
under Seccions or inside Agenda. Agenda contains only Activitats and the editable
Tipus d'activitat list for general activity management.
Top-level order is Rutes i itineraris, Agenda, divider, Destacats, divider,
Subscripcions. Subscripcions uses a users icon.
The existing stage-tag Config [NO TOCAR] is nested under Rutes i itineraris.
Rutes i itineraris uses a route icon and contains Rutes, Etapes, Llocs d'interès,
Comarca, divider, Config [NO TOCAR] (gear icon). Agenda uses a calendar icon and
contains Activitats, divider, Tipus d'activitat (gear icon). Destacats entries
use route, heart and star icons respectively. The stages submenu stays intact.

## Queries and adapters

- List query projects every required domain field (including description and
  organizer for search), spirit marker, registration URL, main image, and
  `type->{_id,name,"slug":slug.current}` ordered by start date.
- Detail query adds requirements, metadata, and gallery.
- Featured query resolves the singleton reference with the detail projection.
- Current spirit query resolves the exact singleton ID and its reference using
  the detail projection. Local and Sanity services use explicit selection;
  never choose a different edition automatically when the selected target is invalid.
- Every image projection requests `asset`, `crop`, `hotspot`, and `alt`.
- Adapters map `_id` to `id`, `slug.current` to `slug`, strings to `Date`, the
  dereferenced type to `ActivityType`, and image metadata to `DomainImage`.
- Reject invalid ID/slug/title/description, unresolved type, unknown status,
  invalid start date, or missing required location/organizer/price data. Log only
  document IDs and invalid field names, and filter rejected documents safely.
- Normalize absent optional objects/arrays; omit invalid optional dates, URLs,
  numbers, levels, and images. Require finite nonnegative paid amounts; normalize
  fields hidden by free/online conditions instead of displaying stale values.
- Use existing `sanityFetch`/Sanity Live for published reads. Network/auth/query
  failures propagate to an Agenda error boundary with retry, not an empty result.
  Only a successful empty read renders empty UI; absent/invalid details use 404.

## UI and server boundaries

- `/agenda` is an async Server Component and starts activities and featured
  fetches together. It renders hero, next, featured, an upcoming preview,
  archive, and an accessible empty state.
- Both `/agenda` previews exclude rendered highlights before limiting to six
  cards: upcoming is chronological, archive newest first. Fewer entries render
  without placeholders. Each nonempty section has a button below its cards.
  Destinations are `/agenda/activitats?period=upcoming` and `?period=archived`.
  Until 2C implements that route, show disabled buttons with Disponible properament;
  activate the prepared links together with the browser, never send visitors to a 404.
- `/agenda/activitats` is an async Server Component that fetches all activities
  once and delegates only interactive filtering to a focused Client Component.
  It displays upcoming activities first in ascending order followed by the
  newest archived activities.
- The complete browser supports a case- and accent-insensitive text search over
  title, description, type, location, city, and organizer plus optional
  single-value filters for the reusable type and derived display status, including finished.
  Type options are derived from the received activities so editorial additions
  require no UI code change. Changing a control filters immediately, a clear
  action restores all results, and zero matches render an accessible state.
  The period filter initializes from upcoming/archived URL presets using the
  same Madrid archive rule; absent/unknown values and clear restore all periods.
- Initially render at most 12 matching cards. If more matches remain, show
  `Veure'n més`; each activation appends at most 12, preserving order and existing
  cards. Hide the button once all matches are visible; scrolling alone never loads
  cards. Filter the complete received dataset before slicing, and reset the limit
  to 12 on any search/filter change or clear action. Keep the total match counter
  and announce visible/total counts when there are more than 12 matches. Move focus
  to the first newly appended card, including the last partial batch. No additional
  fetch, navigation, or server pagination is needed.
- `/agenda/activity/[slug]` is a Server Component with dynamic metadata and
  `notFound()` for an unknown slug.
- Server data passed to the browser Client Component is reduced to the fields
  required by search, filters, and cards; dates cross the boundary as ISO
  strings and are converted only where required for display.
- Pages use a simple calendar-editorial direction within existing fonts,
  semantic tokens, shadcn composition, responsive grids, and visible focus.
- After phase 4, `/rutes-itineraris` calls `getCurrentSpiritActivity` and links to the selected
  edition's actual slug; missing data leaves the placeholder section intact.
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
activities and both singletons in Studio. Finally validate remote documents and
live publication behavior.

User amendment (2026-10-08): the actual `preview` dataset already has five
published editor-created types (Celebració, Sortida, Taller, Concert, Xerrada).
Reuse these exact IDs rather than importing the historical nine-type file.
The user authorized upload of 35 demo drafts and subsequent publication after
empty-state verification. The scoped bootstrap completes the two existing empty
selector drafts and reuses existing images on the selected demo outing; it does
not overwrite populated editor selections. Export the full dataset first and
publish the reviewed drafts using guarded Sanity publish actions. Keep the
application read-only and the integration uncommitted until manual acceptance.

Final release amendment (2026-10-08): the user requires `preview` without demo
activities. Back up the latest editor content/assets, delete only the 35 reviewed
demo IDs with revision guards and clear their references while retaining both
singleton documents. Keep all five types unchanged; record their real IDs in
`sanity/seed/activity-types-preview.ndjson`. Exclude the demo catalog/importer
from Git and preserve local copies under ignored paths. No new dataset or
environment change is authorized: the local Studio also sees the empty Agenda
because it shares `preview`. Empty singleton selectors resolve to the existing
public fallback; their required-selection validators remain unchanged.

## Optional follow-up: server-filtered browsing (phase 5)

This improvement is highly recommended as the archive grows, but is outside
the mandatory phases 2–4 and their acceptance gates. The current button limits
rendered cards; the browser still receives the entire minimal dataset. Measure
initial payload and mobile interaction around 200 published activities and
consider migration around 300–500, including archives, or sooner for large data.
Use measurements to decide; there is no fixed document-count limit.

- Keep `/agenda/activitats`, existing filter labels and `Veure'n més`, initially
  requesting 12 matches and fetching at most 12 more per activation.
- Execute parameterized GROQ filtering, ordering and projection through the
  server/Sanity read layer. Send only the fields needed for the returned cards.
- Prefer cursor pagination with a stable date/ID tie-break. Preserve upcoming
  first and archive newest first; define the cursor across the period boundary.
- Preserve Madrid-day archive placement, derived finished/cancelled status and
  case/diacritic-insensitive search. GROQ text matching is not automatically
  equivalent to the current normalized substring search: establish and test
  parity before cutover, including middle dots and description/location fields.
- Fetch complete type options independently of the current result page. Define
  matching totals and `hasMore` without transferring the entire activity list.
- Debounce text requests, reset cursor/results on filter changes, and reject
  stale responses so rapid edits cannot append cards from another query.
- Add accessible loading/retry states while retaining successful cards, clear
  behavior, URL presets, visible counts, keyboard focus and responsive layouts.
- Keep public published reads, cache/Sanity Live behavior and server credentials
  consistent with phase 4; never expose a private token in browser requests.

Before switching, compare filtered pages with the current complete-dataset
reference, exercise equal dates, the upcoming/archive boundary and every status,
and verify no omissions/duplicates across cursor batches. Measure payload and
mobile response before/after, including slow requests, errors and fast filter
changes. Official references: [pagination with GROQ](https://www.sanity.io/docs/developer-guides/paginating-with-groq)
and [high-performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq).
