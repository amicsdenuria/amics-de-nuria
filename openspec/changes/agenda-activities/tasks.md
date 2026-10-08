# Tasks: Agenda Activities

## Delivery controls

| Item | Decision |
| --- | --- |
| Branch | `codex/agenda-activities` |
| Review budget | At most 400 changed lines per implementation slice |
| PR strategy | One branch; ask before chained PRs |
| Test runner | None; use lint, types, build, schema and manual scenarios |
| Remote writes | Exact dataset and explicit approval required |
| Commit approval | Agent validation, then explicit user manual approval |

## Phase 0: branch and specification

- [x] Create the feature branch from clean `main`.
- [x] Record repository exploration and confirmed product decisions.
- [x] Write proposal, decision-complete design, RFC 2119 scenarios, and
  agent-focused runbook.
- [x] Add conditional OpenSpec discovery and phase-execution routing to the
  repository `AGENTS.md` without affecting ordinary tasks.
- [x] Define review gates, Sanity safety rules, rollback, and verification.

## Phase 1: English domain and local data

- [x] Replace Catalan activity properties with the documented domain contract.
- [x] Add reusable local activity types and replacement fixtures, including the
  stable “Sortides amb l’Esperit” activity.
- [x] Implement local adapters, services, selectors, and local featured choice.
- [x] Migrate every existing activity consumer and set Agenda sources to local.
- [x] Gate: lint/types plus selector review; commit before UI work.

## Phase 2: local public UI

Slice 2A and its card/preview refinements were manually accepted and closed by
the user on 2026-10-08, including the user's final cancellation styling.
The original slice and the visual amendment were reviewed separately.
Commit is explicitly approved; subsequent slices remain unimplemented.
Work in individually reviewable slices of at most 400 changed lines, validating
and obtaining manual approval before committing each slice or proceeding.

- [x] Update the plan for automatic spirit editions, Madrid calendar-day archive,
  optional external registration, defensive reads, and reproducible scenarios.
- [x] Remove the accidental local-testing Sanity GET endpoint and unused delete action.
- [x] Validate planning/cleanup: lint, types, build, diff check, and removed GET returns 404.
- [x] Fetch Agenda through domain services and implement next, featured,
  archive, empty behavior, and a deduplicated preview of at most six upcoming
  activities (archive rules and preview are completed in 2A below).
- [x] Slice 2A: revise domain/local fixtures for `isSpiritActivity`, implement
  latest-edition selection and calendar-day selectors, and simplify registration
  to its optional URL. Derive completion/display status without storing finished;
  show start date/time and optional end date/time. Update consumers without broken detail links.
  Manual verification was accepted; its completed checklist was removed.
- [x] 2A refinement: separate date/time/duration stacks, cap archive at six after
  deduplication, and prepare both period-filtered browser buttons (disabled until 2C).
  Additional archive verification fixtures cover 0/1/6/8 entries and featured exclusion.
  Keep type right of title; status replaces capacity. Cancelled cards use a muted
  grey card background and original red status pill while retaining future detail navigation.
- [x] 2A agent gate: lint/types/build, domain/card assertions, preview scenarios,
  and diff review. Preserve the user's final styling and remove the unused CSS token.
  Passed: 157 assertions, 17 page-render scenarios and 2 prepared-filter-link checks.
- [x] 2A user gate: manual acceptance and commit explicitly approved on 2026-10-08.
- [x] Slice 2B: add the
  `/agenda/activity/[slug]` detail page with metadata, 404, image, and optional
  field rendering, including the simple external registration CTA.
- [x] 2B agent gate: lint/types/build, 72 assertions over 14 fixture renders,
  and 50 browser assertions over the six local details, metadata, keyboard
  navigation, decorative icons and 360/768/1280 px layouts. Local images load; no real Sanity
  image was available on the inspected routes. After user formatting, review
  public UI separately from fixtures/specification, each below 400 changed lines.
- [x] 2B user gate: all manual checks, final visual adjustments and hero copy
  accepted; closing commits explicitly authorized on 2026-10-08. Stop before 2C.
- [x] 2B visual amendment: preserve the user's final order of location,
  description clamped to three lines, then the growing schedule panel; title
  is clamped to one line. Preserve cancellation styling.
  Gate passed: lint/types/build, browser order/clamp checks, responsive widths
  360/768/1280 px and keyboard detail navigation. User manually accepted all
  functional checks and visual adjustments on 2026-10-08.
- [x] At the user's request, finish Agenda hero copy in 2B with the subtitle
  `Trobem-nos i fem comunitat` and no hero description. Final copy and closure
  were explicitly approved on 2026-10-08.
  Gate passed: lint/types/build and browser checks for subtitle, omitted
  description, preserved introduction/card order and 360/768/1280 px layouts.
- [ ] Slice 2C: add the primary `/agenda/activitats` CTA and complete activity
  page with immediate text search, reusable-type filter, derived-display-status filter,
  URL-initialized upcoming/archived period filter, clear action, result count,
  and no-results state. Activate the two prepared preview buttons in this slice.
- [ ] Slice 2D: unhide Agenda navigation and reconnect
  the routes page to the automatically selected latest spirit edition's detail.
- [ ] Verify 0–6 preview behavior, search accents/case, dynamic type options,
  filters, clear action, responsive keyboard use, statuses, empty states, 404,
  and local images, using the fixed-clock matrix in the runbook.
- [ ] Agent gate: lint/types/build plus documented manual route checklist; stop
  with the phase uncommitted.
- [ ] User gate: receive explicit approval after the user's manual verification.
- [ ] Commit the approved phase before beginning Sanity work.

## Phase 3: Sanity editorial model

Review slices: 3A types/singleton/seed; 3B activity schema and registration.
Split further if needed to keep each reviewed diff within 400 changed lines.

- [ ] Add `activityType`, `activity`, and `featuredActivity` schemas with
  Catalan UI, conditional fields, validations, previews, and orderings.
- [ ] Register schema types and Agenda Studio structure; protect the singleton.
  Use exact ID `featuredActivity`, strong references, and an optional spirit checkbox/URL.
- [ ] Add deterministic predefined-type NDJSON without executing a remote write.
- [ ] Run schema validation and type generation.
- [ ] Agent gate: Studio checklist plus lint/types; stop with the phase
  uncommitted.
- [ ] User gate: receive explicit approval after the user's manual verification.
- [ ] Commit the approved phase before beginning data integration.

## Phase 4: Sanity reads and cutover

Review slices: 4A queries/typegen; 4B adapters/services/errors; 4C cutover/content.
Each slice requires validation and manual approval before its commit.

- [ ] Add list, detail, and featured GROQ functions with complete type and image
  projections; regenerate types.
- [ ] Add defensive Sanity adapters and source-parity/latest-spirit service wiring;
  distinguish successful empty results from infrastructure failures with retry UI.
- [ ] Switch Agenda sources to Sanity and validate the empty dataset.
- [ ] With approval, back up the target dataset and import missing type seeds.
- [ ] Validate documents, populate content in Studio, and verify Sanity Live.
- [ ] Agent gate: all quality commands, direct-CDN image checklist,
  verification report, and rollback readiness; stop uncommitted.
- [ ] User gate: receive explicit approval after manual acceptance.
- [ ] Commit only the manually approved final integration.
