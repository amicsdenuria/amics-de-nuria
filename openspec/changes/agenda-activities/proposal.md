# Proposal: Agenda Activities

## Intent

Deliver a public activity agenda and detail experience backed first by local
fixtures and then by editorially managed Sanity documents. Editors must be able
to reuse, rename, and add activity types without code changes while status and
level remain controlled vocabularies.

## In scope

- English domain contracts and local fixtures for activities and types.
- Upcoming, next, featured, and archived activity selection.
- Public agenda, detail route, navigation, empty states, and the existing
  “Sortides amb l’Esperit” consumer.
- `activity`, `activityType`, and `featuredActivity` Sanity schemas and Studio
  structure.
- GROQ reads, generated types, adapters, source switching, and image metadata.
- A reviewed bootstrap file for the nine predefined activity types.

## Out of scope

- Public REST endpoints, activity mutations from the website, registrations,
  payments, attendance counts, and interactive type filters.
- Automated creation, replacement, or deletion of remote Sanity documents.
- A new test framework or unrelated redesigns.

## Delivery approach

1. Establish contracts and a complete local UI.
2. Add editorial schemas and source adapters without changing the UI contract.
3. Switch Agenda to Sanity and verify the empty dataset.
4. Bootstrap reusable types only after the target dataset is confirmed.

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

Set `dataSource.agenda.activities` and `featuredActivity` back to `local` and
redeploy. Schemas and documents are additive and do not need deletion. Never
remove remote documents as part of rollback.

## Success criteria

- Local and Sanity sources produce the same `DomainActivity` contract.
- Editors can select exactly one existing type or create a new one.
- Agenda and details handle populated, partial, and empty datasets safely.
- Featured and spirit activities resolve through their agreed mechanisms.
- Lint, types, schema validation, type generation, build, and documented manual
  checks pass in an environment with required network access.
