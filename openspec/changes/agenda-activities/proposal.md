# Proposal: Agenda Activities

## Intent

Deliver a public activity agenda and detail experience backed first by local
fixtures and then by editorially managed Sanity documents. Editors must be able
to reuse, rename, and add activity types without code changes while status and
level remain controlled vocabularies.

## In scope

- English domain contracts and local fixtures for activities and types.
- Today/upcoming, next, featured, and archived activity selection by Madrid day.
- Domain-derived completion; editorial status stores only scheduled/full/cancelled.
- Public agenda preview, complete searchable/filterable activity browser,
  detail route, navigation, empty states, and the existing “Sortides amb
  l’Esperit” consumer, selecting a separate edition through an editorial singleton.
- Browser results shown in batches of 12 through a `Veure'n més` button,
  added to slice 2C at the user's request on 2026-10-08.
- A simple optional external registration link without booking synchronization.
- `activity`, `activityType`, `featuredActivity`, and `currentSpiritActivity` Sanity schemas and Studio
  structure.
- GROQ reads, generated types, adapters, source switching, and image metadata.
- A reviewed bootstrap file for the nine predefined activity types.

## Out of scope

- Public REST endpoints, activity mutations from the website, internal registrations,
  payments, attendance counts, and advanced faceted filtering.
- Server-side search/filtering and pagination in the current delivery. These are
  tracked as the optional, highly recommended follow-up phase 5, not a prerequisite
  for completing phases 2–4.
- Automated creation, replacement, or deletion of remote Sanity documents.
- A new test framework or unrelated redesigns.

## Delivery approach

1. Establish contracts and a complete local UI.
2. Add editorial schemas and source adapters without changing the UI contract.
3. Switch Agenda to Sanity and verify the empty dataset.
4. Bootstrap reusable types only after the target dataset is confirmed.

After this path is complete, optional phase 5 can migrate browsing to filtered
Sanity queries and cursor-based batches. Start measuring around 200 published
activities, including archived entries; consider the migration around 300–500,
or earlier if payload size or mobile responsiveness warrants it. These numbers
are project planning estimates, not Sanity limits. Phase 5 does not block the
current implementation, manual acceptance, commits, or Sanity cutover.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Domain rename breaks the existing routes page | Migrate all activity consumers in the local slice. |
| Dangling or unresolved type reference | Use a required strong reference and discard invalid published data safely. |
| Conflicting end date and duration | Cross-field validation; end date is authoritative for display. |
| Sanity image regression | Preserve metadata end-to-end and verify direct Sanity CDN delivery. |
| Remote seed affects existing content | Deterministic IDs, backup, `--missing`, exact dataset, explicit approval. |
| Review exceeds 400 lines | Deliver phase commits/slices and stop at each gate. |

## Rollback

For production, redeploy the last approved working release; do not publish demo
fixtures as a fallback. Switching Agenda sources to `local` is a development
fallback only. Schemas and documents are additive; never remove remote documents
as part of rollback.

## Success criteria

- Local and Sanity sources produce the same `DomainActivity` contract.
- Editors can select exactly one existing type or create a new one.
- Agenda and details handle populated, partial, and empty datasets safely.
- Featured and spirit activities resolve through their agreed mechanisms.
- Lint, types, schema validation, type generation, build, and documented manual
  checks pass in an environment with required network access.
