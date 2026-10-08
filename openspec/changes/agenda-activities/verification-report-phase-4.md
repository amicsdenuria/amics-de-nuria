# Phase 4 verification — Sanity reads and cutover

Implemented 2026-10-08 on `codex/agenda-activities`; manually accepted by the user
after their corrections and verification, with explicit authorization for the
phase 4 commits and merge into local `preview`. Phase 3 was already closed in
`7f76cea`, `b86b78c` and `6046de0`. Phase 5 is not started.

## Final preview release state

After accepting the integration, the user requested `preview` without the 35
demo activities while retaining the five types they created: Celebració, Sortida,
Taller, Concert and Xerrada. No new dataset or `.env.local` change was authorized.
The local Studio shares `preview` and therefore also has an empty Agenda.

The latest 35 complete activity documents are preserved in ignored
`.sanity/local-agenda-content/activities.ndjson`. A fresh full export including
all assets is `.sanity/backups/preview-before-local-separation-2026-10-08.tar.gz`.
The original local draft catalog/importer remain on disk but are ignored; none
is included in the Git merge. The tracked `activity-types-preview.ndjson`
contains only the five editor-created type documents and their existing IDs.
No seed is automatically imported by the application.

An atomic revision-guarded transaction removed only the 35 reviewed activity
IDs and cleared the two references. Both singleton documents were retained;
the five types and every unrelated document/asset remained unchanged. The
automatic approval review rejected deleting the singletons, so cleanup used
reference removal instead. Ignored cleanup manifest/result files record the
exact target, revisions, preserved payloads and completed transaction.

Fresh public reads return zero activities and null featured/current-spirit
targets; raw reads also confirm no activity drafts or documents remain. The
actual production website passed 22 empty-browser checks at 360/768/1280 px,
including usable contact links and absent mock details. Full validation checks
33 editorial documents: 31 valid, two empty singletons with three required
selection errors. Their schema validators still require a real selection;
public empty behavior passes and no unrelated validation errors remain.
Fresh closing checks also pass: 168 schema and 82 domain/render assertions.

The integration is merged into local Git `preview`; no push or deployment is
included. No Vercel deployment URL/configuration is available in this checkout,
so the deployed website was not independently inspected. The shared Sanity
`preview` content and the next deployed branch contain none of the 35 mocks.

## Result and remote scope

The public Agenda now reads published Sanity content through `sanityFetch` and
the existing Sanity Live integration. Four typed GROQ queries provide lists,
details, featured and current-spirit reads. Both selectors use their exact
shared singleton IDs and strong references. The routes page uses the selected
spirit edition's real slug; later dates never replace it automatically.

The adapter rejects invalid required records, logs only ID/field names, and
normalizes malformed/hidden optional fields. Successful empty reads render
empty UI; infrastructure failures reach a retry boundary, including details.
Missing/invalid/unmarked spirit targets retain the contact fallback.

The user authorized this target and order: `l7cbpkut/preview`, empty-state
verification first, publication afterwards. Real published count was zero with
35 draft activities and five published types. Before publication, the actual
website passed empty Agenda/browser/routes checks at 360, 768 and 1280 px.

The following publication evidence is historical, before the final cleanup.
Publication consumed only the 35 reviewed demo drafts using Sanity publish
actions with draft revision guards. At that point there were seven per type:
Celebració, Sortida, Taller, Concert and Xerrada. The historical nine-type seed
was not imported. Two existing empty selector drafts were completed/published:

| Singleton | Published selection | Detail slug |
| --- | --- | --- |
| `currentSpiritActivity` | `agenda-demo-sortida-04` | `prova-sortida-amb-l-esperit-segona-edicio` |
| `featuredActivity` | `agenda-demo-concert-04` | `prova-recital-de-musica-religiosa` |

All three spirit editions were published; the selected second edition preceded
the later third edition. The selected outing uses two existing Montserrat assets
for image verification, with crop/hotspot and Catalan alt. Its title/description
remain explicitly fictitious; the images are illustrative test assets.

Backups are ignored local artifacts and include drafts and all five assets:

- `.sanity/backups/preview-before-agenda-demo-2026-10-08.tar.gz`
- `.sanity/backups/preview-before-agenda-publication-2026-10-08.tar.gz`

The latter contains 76 editorial documents plus assets. Raw API snapshots also
include system and asset documents (92 total), so these counts differ by design.
All 39 unrelated exported documents compare unchanged after normalizing the
export's `_sanityAsset` file representation. The five types are unchanged.
No deployment, push, asset upload or unrelated content edit was performed during
that publication verification. The final local merge is recorded above.

## Automated results before cleanup

| Gate | Result |
| --- | --- |
| Schema validation | PASS, zero schema errors |
| Type generation | PASS, 23 schema types and 19 GROQ queries; existing definitions unchanged |
| Lint / TypeScript / production build | PASS |
| Existing schema/Studio/generated checks | PASS, 164 assertions |
| Real GROQ projections, adapter/service and failure contracts | PASS, 99 assertions |
| Local domain/render regressions with explicit spirit selection | PASS, 82 assertions |
| Prepared seed validation | PASS, all 35 documents against installed validators |
| Actual empty published website | PASS, 22 browser assertions before publication |
| Populated production website | PASS, 50 browser assertions at 360/768/1280 px |
| Production read failures and retry | PASS, 24 assertions across Agenda, browser, detail and routes |
| Actual Sanity Live changes | PASS, 10 assertions; selector, title and slug updates without manual reload; restored |
| Actual published Agenda documents | PASS, all 42 documents, zero errors |
| Direct CDN | PASS, real main/gallery assets HTTP 200; responsive widths and `auto=format`, no nested Next image URL |
| Diff and remote preservation review | PASS |

The initial full-dataset validation reported five pre-existing stage drafts with
130 errors (missing descriptions, URLs, regions, trail locations and technical
details). All five existed in the pre-publication backup. None belongs to Agenda
or was changed by this phase. Agenda's 35 activities, five types and two selectors
validate separately against the real installed schemas with zero errors.

Before cleanup, closure revalidation after the user's Studio corrections passed:
68 valid documents, zero errors. Schema/typegen, lint/types/build and the 164
schema, 99 integration and 82 local regression assertions also pass; all 35
prepared seed documents validate. No implementation fix follows acceptance.

The existing baseline-browser-mapping/Browserslist age notices remain non-blocking.
The error browser used an isolated production process on port 3101 with a
deliberately invalid viewer token; no environment file or normal server was
changed. The normal production smoke used port 3102. Temporary test processes
were stopped afterwards. The final cleanup smoke also used port 3102 and was
stopped after passing; no user development process was changed.

Local evidence is under `.sanity/verification/phase-4/`: empty/populated viewport
screenshots, publication ledger, final read-only snapshot and restored Live ledger.
Private snapshots/backups are ignored and are not part of the reviewable commit.

## Reproduce the agent checks

No new test framework was added. From the repository root:

```powershell
node openspec/changes/agenda-activities/verification/integration-checks.mjs
node openspec/changes/agenda-activities/verification/domain-checks.mjs
node openspec/changes/agenda-activities/verification/seed-checks.mjs
pnpm exec sanity schema validate --level error
pnpm typegen
pnpm lint
pnpm lint:types
pnpm build
git diff --check
```

The integration/seed/browser/remote/Live helpers and demo catalog are local-only
artifacts preserved in the author's workspace, excluded from the release branch.
On a fresh clone, use the tracked `schema-checks.mjs` and `domain-checks.mjs`,
plus the quality commands above. The tracked `error-browser-checks.mjs` needs
an isolated production process with an intentionally invalid viewer token.

`sanity-browser-checks.mjs empty` checks the final shared dataset state; the
historical `populated` scenario requires a separately authorized test dataset.
Set `AGENDA_VERIFY_URL` for a different local port. It uses the existing bundled
Playwright runtime (override with `AGENDA_PLAYWRIGHT_DIR` if needed).
`remote-document-checks.mjs` validates the ignored read-only snapshot.
Do not rerun the publication helper against the cleaned shared dataset. The
Live verification script makes
temporary remote edits and requires separate explicit authorization to rerun;
its previous authorized run has already restored the original values.

## Exact manual acceptance checklist

This is the populated-state checklist accepted before the user requested mock
cleanup. It records the completed integration verification, not the current
dataset. The final empty state is verified in the release section above.

Keep `AGENDA_VERIFY` and `AGENDA_VERIFY_NOW` unset for the real-data review.
Use the configured `preview` dataset and your existing Studio login. All entries
are fictitious `[PROVA]` content. `example.org/inscripcio/...` links demonstrate
the CTA only; they are not working booking forms. Dates are in 2026, so archive
and completion change naturally with the current Madrid day. At the fixed
8 October noon clock, the catalog has 25 non-archived and 10 archived activities.
Do not change the system clock or delete published content to reproduce empty.

1. `/admin`: Agenda > Activitats shows the 35 published activities; Tipus
   d'activitat contains the same five types, with seven activities per type.
   Destacats shows the second spirit edition and the recital selected above.
2. `/agenda`: next and featured cards are distinct, upcoming/archive each show
   at most six additional cards, and every card opens its matching detail.
   The featured card is `[PROVA] Recital de música religiosa`.
3. `/agenda/activitats`: total is 35 with 12 initially visible. Use `Veure'n més`
   twice: 24, then 35, with focus moving to the first added card and no final
   button. Select each type (seven results), try text/status/period combinations,
   zero matches and clear. Upcoming/archived links initialize their period.
4. `/agenda/activity/prova-sortida-amb-l-esperit-segona-edicio`: verify the
   Montserrat main image and gallery, full status, 17 October 2026 at 11:00–13:00,
   120 minutes, EUR 18, requirements and external CTA. Check one free, online,
   cancelled and archived activity from the catalog: hidden fields and optional
   sections stay absent; cancelled/finished activities have no registration CTA.
   `/agenda/activity/does-not-exist` shows the normal not-found page.
5. `/rutes-itineraris`: the spirit card and both information CTAs open the
   second edition above even though a later third edition is published. In
   Studio change the current spirit reference to the third edition and publish:
   the open routes page updates and both CTAs use its detail. Restore the second
   edition afterwards. Likewise select another featured activity, publish,
   confirm the Agenda update, then restore the recital.
6. At 360, 768 and 1280 px inspect Agenda, browser, the selected detail and routes:
   no overflow, readable cards/fields, correct image framing and keyboard focus.
   Inspect the selected detail's image `src/srcSet`: direct `cdn.sanity.io/images`
   URLs with widths/`auto=format`, never nested within `/_next/image`.

The pre-publication empty state is already recorded in screenshots; no remote
deletion is needed for acceptance. Automated failure tests also passed without
changing your credentials. The user confirmed these checks on 2026-10-08 and
authorized commit and merge into `preview`. The checklist remains as a record
and for future regression review; it is no longer a pending acceptance gate.

## Review slices and rollback

4A: query/read functions plus generated declarations; 4B: adapter, service,
explicit local selection, routes call and retry boundaries; 4C: source cutover,
five-type bootstrap, evidence and documentation. The demo catalog/manifest and
its one-time tooling are local-only. Review retained scripts and documentation
as separate blocks. Every block is
below 400 changed lines; the generated type additions are 292 lines.

For production rollback, deploy the last approved working release. Local source
selection is only a development fallback. Preserve all schemas, documents and
assets; do not delete Content Lake data or import with `--replace` as rollback.
