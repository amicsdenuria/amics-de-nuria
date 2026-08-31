# Tasks: Agenda Activities

## Delivery controls

| Item | Decision |
| --- | --- |
| Branch | `codex/agenda-activities` |
| Review budget | At most 400 changed lines per implementation slice |
| PR strategy | One branch; ask before chained PRs |
| Test runner | None; use lint, types, build, schema and manual scenarios |
| Remote writes | Exact dataset and explicit approval required |

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

- [ ] Fetch Agenda through domain services and implement next/featured/upcoming,
  archive, and empty behavior.
- [ ] Redesign activity cards and add detail, metadata, 404, image, and optional
  field rendering.
- [ ] Unhide Agenda navigation, replace placeholder copy, and reconnect the
  routes page by slug.
- [ ] Verify responsive, keyboard, status, empty, and local image scenarios.
- [ ] Gate: lint/types/build/manual routes; commit before Sanity work.

## Phase 3: Sanity editorial model

- [ ] Add `activityType`, `activity`, and `featuredActivity` schemas with
  Catalan UI, conditional fields, validations, previews, and orderings.
- [ ] Register schema types and Agenda Studio structure; protect the singleton.
- [ ] Add deterministic predefined-type NDJSON without executing a remote write.
- [ ] Run schema validation and type generation.
- [ ] Gate: Studio walkthrough plus lint/types; commit before data integration.

## Phase 4: Sanity reads and cutover

- [ ] Add list, detail, and featured GROQ functions with complete type and image
  projections; regenerate types.
- [ ] Add Sanity adapters and source-parity service wiring.
- [ ] Switch Agenda sources to Sanity and validate the empty dataset.
- [ ] With approval, back up the target dataset and import missing type seeds.
- [ ] Validate documents, populate content in Studio, and verify Sanity Live.
- [ ] Gate: all quality commands, direct-CDN image checks, manual acceptance,
  verification report, and rollback readiness.
