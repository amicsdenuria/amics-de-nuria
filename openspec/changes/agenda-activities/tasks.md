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

- [ ] Fetch Agenda through domain services and implement next, featured,
  archive, empty behavior, and a deduplicated preview of at most six upcoming
  activities.
- [ ] Add the primary `/agenda/activitats` CTA and build that complete activity
  page with immediate text search, reusable-type filter, closed-status filter,
  clear action, result count, and no-results state.
- [ ] Redesign activity cards with a simple responsive treatment and add the
  `/agenda/activity/[slug]` detail page with metadata, 404, image, and optional
  field rendering.
- [ ] Unhide Agenda navigation, replace placeholder copy, and reconnect the
  routes page to the persistent activity detail by slug.
- [ ] Verify 0–6 preview behavior, search accents/case, dynamic type options,
  filters, clear action, responsive keyboard use, statuses, empty states, 404,
  and local images.
- [ ] Agent gate: lint/types/build plus documented manual route checklist; stop
  with the phase uncommitted.
- [ ] User gate: receive explicit approval after the user's manual verification.
- [ ] Commit the approved phase before beginning Sanity work.

## Phase 3: Sanity editorial model

- [ ] Add `activityType`, `activity`, and `featuredActivity` schemas with
  Catalan UI, conditional fields, validations, previews, and orderings.
- [ ] Register schema types and Agenda Studio structure; protect the singleton.
- [ ] Add deterministic predefined-type NDJSON without executing a remote write.
- [ ] Run schema validation and type generation.
- [ ] Agent gate: Studio checklist plus lint/types; stop with the phase
  uncommitted.
- [ ] User gate: receive explicit approval after the user's manual verification.
- [ ] Commit the approved phase before beginning data integration.

## Phase 4: Sanity reads and cutover

- [ ] Add list, detail, and featured GROQ functions with complete type and image
  projections; regenerate types.
- [ ] Add Sanity adapters and source-parity service wiring.
- [ ] Switch Agenda sources to Sanity and validate the empty dataset.
- [ ] With approval, back up the target dataset and import missing type seeds.
- [ ] Validate documents, populate content in Studio, and verify Sanity Live.
- [ ] Agent gate: all quality commands, direct-CDN image checklist,
  verification report, and rollback readiness; stop uncommitted.
- [ ] User gate: receive explicit approval after manual acceptance.
- [ ] Commit only the manually approved final integration.
