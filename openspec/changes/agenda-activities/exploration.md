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
- Archive placement follows completed Madrid calendar days, not elapsed start
  times or editorial status. Registration is an optional external URL only.

## Implementation checkpoint (2026-10-08)

Phase 1 and the initial agenda preview exist with English contracts and local
sources. Detail/browser routes and Sanity integration remain pending. Current
selectors still use timestamps and routes still resolves the original fixed slug;
Phase 2A must migrate both to the revised rules before continuing UI work.

## Baseline verification

- `pnpm lint`: passing on 2026-08-31.
- `pnpm exec tsc --noEmit --incremental false`: passing on 2026-08-31.
- `pnpm build`: code compilation could not be established in the sandbox
  because `next/font` could not reach Google Fonts. This is a known environment
  prerequisite, not an Agenda failure.
