# Exploration: Agenda Activities

## Initial snapshot (2026-08-31; historical, not current state)

- The repository is on Next.js 16 App Router, React 19, TypeScript, Tailwind,
  shadcn/ui, and an embedded Sanity Studio at `/admin`.
- `/agenda` and `ActivityCard` exist but read Catalan-shaped mocks directly.
- Card links target `/agenda/activity/[slug]`, but the detail route does not
  exist.
- Agenda is hidden in `content/navigation.ts` but remains linked in the footer.
- `domain/activity` contains incomplete types, adapter, and service code. The
  configured source is `sanity`, while the service returns `null` for Sanity.
- `/rutes-itineraris` consumes one placeholder activity through
  `getSpiritActivity`; no Sanity selection rule exists.
- No `activity`, `activityType`, or `featuredActivity` schema/query exists.

## Existing patterns to preserve

- Data flow MUST remain `Sanity/local -> domain -> app -> components`.
- Reads from Server Components SHOULD call domain services directly; no
  internal REST route is needed.
- `featuredActivity` MUST follow the singleton-reference approach used by
  `currentRoute`.
- Sanity image queries MUST preserve `asset`, `crop`, `hotspot`, and `alt`;
  adapters MUST map to `DomainImage`, and UI MUST use `getImageProps` followed
  by `OptimizedImage`.
- Schema property names are English while Studio titles, help, and validation
  messages are Catalan.

## Product decisions

- The public UI includes agenda listing and activity detail.
- Agenda shows upcoming activities plus a separate archive.
- `activityType` is reusable editorial content: one strong reference per
  activity, with predefined types and permission to create more.
- Status and level remain closed code-defined enums.
- Internal properties and enum values are English.
- The final integration switches immediately to Sanity so the empty-dataset UI
  can be verified before editorial content is created.
- Revised 2026-10-08: each spirit outing is a separate marked activity; routes
  automatically selects the greatest start date, preserving all earlier editions.
- Superseded for phase 3 by the user on 2026-10-08: add a protected
  `currentSpiritActivity` singleton to choose the current edition manually.
  Multiple editions stay published; later dates do not replace the selection.
  Phase 3 provides Studio schemas; phase 4 replaces the automatic public read.
- Archive placement follows completed Madrid calendar days, not elapsed start
  times or editorial status. Registration is an optional external URL only.
- Persist only scheduled/full/cancelled; derive completion and display status
  from end/duration/last Madrid day. Cancellation keeps its visible label.

## Implementation checkpoint (2026-10-08)

Phase 1 and the initial agenda preview exist with English contracts and local
sources. Detail/browser routes and Sanity integration remain pending. Current
slice 2A derives completion and Madrid archive placement, selects spirit editions
by marker/date, and shows start/end dates and times. Slice 2A and its card/preview
refinements were manually accepted and closed on 2026-10-08; commit is approved.

## Baseline verification

- `pnpm lint`: passing on 2026-08-31.
- `pnpm exec tsc --noEmit --incremental false`: passing on 2026-08-31.
- `pnpm build`: code compilation could not be established in the sandbox
  because `next/font` could not reach Google Fonts. This is a known environment
  prerequisite, not an Agenda failure.
