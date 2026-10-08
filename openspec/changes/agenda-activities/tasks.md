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
Slices 2B, 2C and 2D are now complete as recorded below; Sanity remains pending.
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
- [x] Slice 2C: add the primary `/agenda/activitats` CTA and complete activity
  page with immediate text search, reusable-type filter, derived-display-status filter,
  URL-initialized upcoming/archived period filter, clear action, result count,
  and no-results state. Activate the two prepared preview buttons in this slice.
- [x] 2C agent gate: lint/types/build, 79 domain/render assertions and 141 browser
  assertions passed before starting 2D. The user explicitly requested sequential
  implementation of both slices in one uncommitted delivery on 2026-10-08.
- [x] Slice 2D: unhide Agenda navigation and reconnect
  the routes page to the automatically selected latest spirit edition's detail.
  Restore the Agenda footer links as well; both information CTAs use the selected
  detail or retain contact when no marked activity exists.
- [x] Verify 0–6 preview behavior, search accents/case, dynamic type options,
  filters, clear action, responsive keyboard use, statuses, empty states, 404,
  and local images, using the fixed-clock matrix in the runbook.
- [x] Agent gate: lint/types/build plus documented manual route checklist; stop
  with the phase uncommitted.
  Initial 2C/2D results: 480 assertions passed (79 domain/render, 401 browser), including
  production, empty data, spirit selection, detail regressions and calendar clocks.
  See `verification-report-2c-2d.md` for exact PASS/FAIL results, limitations,
  reproduction commands and the complete manual checklist. Each review block is
  below 400 changed lines. The final uncommitted delivery was then accepted below.
- [x] User gate: the user accepted the delivery and explicitly authorized staging,
  commits, merge to `preview`, and pushes of both branches on 2026-10-08.
- [x] Close the approved phase in reviewable commits before Sanity work. Include
  the user's additional Agenda home card. Final closure gate passed lint/types/build,
  diff review and 591 fresh assertions (79 domain, 473 load-more, 23 production,
  16 home-to-Agenda); no implementation fix was needed after acceptance.

### Slice 2C amendment: manual load more (2026-10-08)

- [x] At the user's request, show the first 12 matching activities and append
  at most 12 per `Veure'n més` activation. Search/filter the complete dataset,
  reset the visible limit on every control/clear, hide the button at the end,
  announce visible counts and focus the first newly added card.
- [x] Amendment agent gate: lint/types/build and diff review passed; 851 assertions
  passed, 0 failed (588 load-more, 79 domain, 161 browser/rollout, 23 production).
  Boundary datasets 0/1/12/13/24/25/60, every reset, keyboard, responsive and no
  automatic loading passed. See `verification-report-load-more.md` for results
  and the supplementary manual checklist. Review this amendment's implementation,
  verification script, and documentation as separate blocks below 400 lines.
- [x] Amendment user gate: delivery accepted and closing commits/merge/push
  explicitly authorized on 2026-10-08; the optional phase 5 remains unimplemented.

## Phase 3: Sanity editorial model

Revised 2026-10-08 at the user's request: manually select the current spirit
edition through `currentSpiritActivity`, preserving separately published editions.
The phase 2 automatic selector is superseded at phase 4 integration, not here.
Review slices: 3A types/seed; 3B activity, both singletons and Studio registration.
Validate 3A independently before 3B to avoid unresolved schema references.
Split further if needed to keep each reviewed diff within 400 changed lines.

- [x] Add `activityType`, `activity`, `featuredActivity`, and `currentSpiritActivity` schemas with
  Catalan UI, conditional fields, validations, previews, and orderings.
- [x] Register schema types and Agenda Studio structure; protect both singletons.
  Use exact IDs `featuredActivity` and `currentSpiritActivity`, strong references,
  a filtered spirit picker and an optional spirit checkbox/URL; retain `currentRoute-3`.
- [x] At the user's request, group all three singletons under Seccions > Destacats:
  Ruta d'Enguany, Sortida amb l’Esperit actual, Activitat destacada. Use a star
  icon for Destacats. Keep Agenda
  limited to Activitats and editable Tipus d'activitat. Revalidate before acceptance.
  Root order: Rutes i itineraris, Agenda, divider, Destacats, divider,
  Subscripcions with a users icon;
  retain stage-tag configuration nested under Rutes i itineraris.
  Route/calendar section icons, settings icons for Config/types, route/heart/star
  singleton icons; routes list Rutes/Etapes/Llocs d'interès/Comarca then divider/Config,
  and Agenda separates Activitats from Tipus d'activitat with a divider.
- [x] Add deterministic predefined-type NDJSON without executing a remote write.
- [x] Run schema validation and type generation.
- [x] Agent gate: Studio checklist plus lint/types; stop with the phase
  uncommitted.
  Passed schema validation (0 errors), typegen, lint/types/build, diff review and
  156 in-memory schema/Studio/generated-artifact assertions. No remote content
  was created or imported. See `verification-report-phase-3.md` for the exact
  manual checklist and phase 4 integration boundary. The user accepted manual
  verification and explicitly requested phase 3 closure on 2026-10-08.
- [x] User gate: receive explicit approval after the user's manual verification.
- [x] Commit the approved phase before beginning data integration.
  Close the approved implementation, generated contracts and verification records
  in separate reviewable commits. No merge, push or remote content write is included.

## Phase 4: Sanity reads and cutover

Content preparation requested separately by the user after phase 3 closure on
2026-10-08: generate 35 fictitious activities using the five published types already
created in Studio (Celebració, Sortida, Taller, Concert, Xerrada). The user then
explicitly authorized uploading them directly to the configured project `l7cbpkut`,
dataset `preview`. Upload only drafts after a full backup; preserve all existing
documents and the empty published activity state needed for cutover verification.
This content preparation does not start the queries/services/cutover slices below.

- [x] Prepare 35 local draft documents, seven per existing type, and their manifest.
- [x] Export the full target dataset before uploading, including drafts and assets.
- [x] Validate all 35 drafts against the installed schemas and selectors.
- [x] Import the draft fixtures with `--missing`, then verify exact remote contents,
  references and unchanged published counts. Keep this preparation uncommitted.
  Imported 35 drafts into `l7cbpkut/preview`; remote contents exactly match the
  local NDJSON, seven per existing type. All five types remain unchanged and
  published activity count remains zero. See `verification-report-activity-seed.md`.

Review slices: 4A queries/typegen; 4B adapters/services/errors; 4C cutover/content.
Each slice requires validation and manual approval before its commit.

- [x] Add list, detail, featured and current-spirit GROQ functions with complete type and image
  projections; regenerate types.
- [x] Add defensive Sanity adapters and source-parity/current-spirit service wiring;
  distinguish successful empty results from infrastructure failures with retry UI.
- [x] Replace `getLatestSpiritActivity`/automatic selection and its fixtures with
  `getCurrentSpiritActivity`/explicit ID selection; connect both routes CTAs to the
  exact singleton reference, retaining contact for missing/invalid/unmarked targets.
  4A gate: schema validation, typegen (19 queries), lint/types passed.
  4B gate: lint/types, 164 schema, 97 GROQ/adapter/service and 82 local
  domain/render assertions passed before switching sources. No remote mutations.
- [x] Switch Agenda sources to Sanity and validate the empty dataset.
  Passed 22 actual browser assertions at 360/768/1280 px before publication;
  only published reads, zero activities, browser counter zero, both contact CTAs.
- [x] Review bootstrap against the five editor-created types; reuse them and do not
  automatically import the historical nine-type seed. Any further import needs approval.
- [x] Validate documents, populate content in Studio, and verify Sanity Live.
  At the user's explicit request, published all 35 demo activities after the
  empty gate and a fresh full backup. Seven per existing type, two selector
  drafts completed, selected outing enriched with two existing image assets.
  All 42 published Agenda documents validate. Ten actual Live assertions passed
  with selector/title/slug edits restored; no manual reload or rebuild.
- [x] Agent gate: all quality commands, direct-CDN image checklist,
  verification report, and rollback readiness; stop uncommitted.
  Final lint/types/build, schema validation/typegen and diff review passed.
  164 schema, 99 GROQ/adapter/service, 82 local regression, 22 empty-browser,
  50 populated-production, 24 retry and 10 real Live assertions passed.
  All 42 published Agenda documents validate; initial full-dataset validation
  reported 130 pre-existing errors in five unrelated stage drafts, unchanged by this phase.
  Real images load with HTTP 200 directly from Sanity CDN, retaining framing.
  See `verification-report-phase-4.md` for exact manual checks and backup/rollback.
  Phase 5 remains unstarted. Closure revalidation passed schema/typegen,
  lint/types/build, 164 schema, 99 integration and 82 domain assertions plus
  all 35 seed validators. After the user's Studio corrections, pre-cleanup
  full-dataset validation passed: 68 valid documents, zero errors.
- [x] User gate: receive explicit approval after manual acceptance.
  The user confirmed their corrections and successful manual verification on
  2026-10-08, and explicitly authorized the phase 4 commits and merge into `preview`.
- [x] Commit only the manually approved final integration.
  Close in separately reviewable commits, then merge into local `preview`.
  No new implementation fix follows acceptance; no push or phase 5 work is included.

### Final release amendment: exclude demo activities (2026-10-08)

- [x] Preserve the latest 35 full mock documents and a full dataset/assets backup
  under ignored local paths; retain the original local seed/import tooling.
- [x] Exclude the 35-document catalog, importer and fixture-specific helpers from
  Git; add a preview bootstrap containing only the exact five editor-created types.
- [x] Remove only the 35 reviewed mock IDs from `l7cbpkut/preview` with revision
  guards and clear their two singleton references, retaining both singletons.
  The five types and every unrelated document/asset remain unchanged.
- [x] Verify raw/published activity counts are zero, selectors resolve to null,
  all five types match the tracked seed, and local originals/assets are preserved.
  Passed 22 fresh empty-browser assertions at 360/768/1280 px. Full validation:
  33 editorial documents checked, 31 valid; three required-selection errors on
  the two intentionally empty singletons. No unrelated validation errors.
- [x] Keep existing datasets and `.env.local`; the local Studio also sees the
  empty shared Agenda. Close the user's approved integration and local merge;
  do not push, deploy, or begin phase 5.

## Phase 5: optional server-filtered browsing

Highly recommended future improvement, explicitly requested for documentation
on 2026-10-08. It does not block phases 2–4, their gates, commits, acceptance or
Sanity rollout. No implementation of this phase is authorized by documenting it.
Measure around 200 published activities and consider it around 300–500 (including
archives), or earlier if payload/mobile performance warrants it; these are
planning estimates, not Sanity limits.

- [ ] Measure current list payload, initial loading and filter response on mobile;
  decide when the migration is justified.
- [ ] Design parameterized GROQ queries for search, type, derived status and Madrid
  period; preserve text normalization and existing order through source parity.
- [ ] Add stable date/ID cursors with the upcoming/archive boundary accounted for,
  12-item batches, complete dynamic type options, total matches and `hasMore`.
- [ ] Connect the existing button and controls to server reads; debounce text,
  reset pagination on filter/clear, and cancel or discard stale responses.
- [ ] Add loading/retry behavior, preserve visible counts, keyboard focus, URL
  presets and responsive layouts, and keep private credentials server-side.
- [ ] Validate query performance, payload improvement, equal dates, all filters,
  empty/partial pages, no duplicates/omissions, slow/error/stale responses and
  published read/cache/Live behavior. Run lint/types/build and document results.
- [ ] Future user gate: accept the specific manual checklist before committing
  this optional migration. Until then, retain the validated client-filtered browser.
