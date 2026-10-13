# Intro and slug ID amendment verification (2026-10-13)

Implemented on `codex/agenda-activities`; all changes remain unstaged and
uncommitted. No push, deployment or remote content mutation was performed.
Phase 5 remains unstarted.

## Result

`intro` is a required plain-text field in DomainActivity and Studio General,
labelled Introducció with three input rows. Missing, malformed or whitespace-only
intro is rejected by Studio validation and both adapters. All four public Agenda
queries project intro. Cards display intro with the existing three-line clamp;
the detail header shows intro beneath the title and Sobre l’activitat keeps the
complete description. Search matches both fields with existing accent/case
normalization. Existing detail metadata still uses description.

Activity slug generation appends the complete canonical document ID to the
normalized title, preserving draft/published/release parity. Only the title is
normalized and capped at 200 characters; the ID is preserved exactly. Generated
slugs are deterministic and repeated generation adds the suffix once. Existing
slugs remain until explicitly regenerated. This follows Sanity's documented
[`source` and `slugify` hooks](https://www.sanity.io/docs/studio/slug-type).

## Automated gate

| Check | Result |
| --- | --- |
| Sanity schema validation | PASS: 0 errors |
| Schema extraction and typegen | PASS: 23 schema types, 19 queries |
| TypeScript without incremental cache | PASS |
| Production build | PASS |
| Schema/slug gate | PASS: 183 assertions |
| Intro GROQ/adapter/service gate | PASS: 19 assertions |
| Local domain/card/detail/search gate | PASS: 95 assertions |
| Generated artifacts and complete diff inspection | PASS: only scoped changes |
| `git diff --check` | PASS |
| Lint excluding local `.sanity/**` artifacts | PASS |

Baseline full lint failed before implementation: the ignored downloaded file
`.sanity/verification/phase-4/deployed-2ffe57ee0237e97c.js` has one
`@typescript-eslint/no-this-alias` error and 66 warnings. It was preserved.
The package runner fallback hit sandbox EPERM, so validation used installed
project binaries with host permission. No dependency update was made.

Reproduction from the repository root (PowerShell):

```powershell
.\node_modules\.bin\sanity.cmd schema validate --level error
.\node_modules\.bin\sanity.cmd schema extract
.\node_modules\.bin\sanity.cmd typegen generate
.\node_modules\.bin\eslint.cmd . --ignore-pattern '.sanity/**'
.\node_modules\.bin\tsc.cmd --noEmit --incremental false
node openspec/changes/agenda-activities/verification/intro-checks.mjs
node openspec/changes/agenda-activities/verification/domain-checks.mjs
.\node_modules\.bin\next.cmd build
git diff --check
```

The script gates use in-memory data and do not access Content Lake. Browser
visual review and authenticated Studio acceptance remain for the user.

## Existing content audit

All six active local activities now have meaningful intros and pass adaptation.
Development verification fixtures inherit the required intro.

The initial intro audit of `l7cbpkut/preview` found one logical activity, in two
versions, with no intro:

| Title / slug | Document ID |
| --- | --- |
| Festa del Pelegrí / `festa-del-pelegri` | `3d4c743a-cbfc-41b2-b512-a0f41078784c` |
| Festa del Pelegrí / `festa-del-pelegri` (draft) | `drafts.3d4c743a-cbfc-41b2-b512-a0f41078784c` |

The new adapter omits that activity and its detail returns 404 until a meaningful
intro is published. Fill/publish it through Studio or remove it at the user's
discretion. Neither version was changed. The audit script and raw JSON report
are local ignored files under `.sanity/verification/intro-audit.*`.

## Manual acceptance checklist

Prerequisite: use an authenticated editor in the configured testing dataset.
Festa del Pelegrí needs a valid intro published before public verification.
Choose distinct wording in intro and description, with a unique searchable word
in each field. A long intro is useful for checking the card's three-line clamp.

1. In `/admin` > Agenda > Activitats > General, verify Introducció appears before
   Descripció and their help explains their purpose. Empty or whitespace-only intro
   must block publication. Fill a meaningful intro and publish for public checks.
2. At `/agenda` and `/agenda/activitats`, verify cards show intro rather than
   description. Retain location → intro → schedule order, three-line clamp,
   status styling and keyboard links.
3. In the same Studio activity, press Generate next to Slug and check the
   normalized title followed by the complete document ID, without `drafts.`.
   Repeat generation: the suffix must appear once. Publish the activity and
   open its card; the link must use `/agenda/activity/<generated slug>`.
   For the audited ID, Festa del Pelegrí generates
   `festa-del-pelegri-3d4c743a-cbfc-41b2-b512-a0f41078784c`.
4. Open `/agenda/activity/<generated slug>`: intro appears below the title;
   Sobre l’activitat shows the complete description. Check 360, 768 and 1280 px
   for readable wrapping and no overlap/overflow; retain working back navigation.
5. On `/agenda/activitats`, search each unique word separately and repeat with
   uppercase/unaccented variants. Both fields must match the same activity.

Slug generation does not update saved slugs automatically; regenerating and
publishing changes the detail URL and does not create redirects for the old URL.

Wait for explicit user manual acceptance before any commit or push.
