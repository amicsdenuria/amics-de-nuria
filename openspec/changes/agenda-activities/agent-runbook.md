# Agent Runbook: Agenda Activities

## Operating rules

1. Read repository `AGENTS.md`; before any activity image work, read
   `.agents/skills/sanity-images/SKILL.md` fully.
2. Work only on `codex/agenda-activities`; preserve unrelated user changes.
3. Complete one phase gate before beginning the next. Keep each review slice
   at or below 400 changed lines; gate each slice before the next. Ask before
   creating chained PRs. Agent validation does not authorize a commit: wait for
   the user's manual approval.
4. Never run remote Sanity create/import/migration/delete/deploy commands
   without the exact dataset and explicit user approval.
5. Use `apply_patch` for edits and update `tasks.md` as work completes.

## Manual verification before every commit

This approval gate applies to every future commit in this change, including
documentation-only commits. A request to implement a phase is not by itself
permission to commit it.

1. Finish the scoped work and run every automated validation required by the
   phase.
2. Run `git diff --check` and inspect the complete diff. Keep all phase changes
   uncommitted and preferably unstaged.
3. Report the automated results, known limitations, affected routes, and an
   exact manual checklist to the user. Include only important or non-obvious
   setup instructions needed to reproduce the verification, such as required
   fixtures, a special application state, credentials, unusual commands, or
   environment constraints. Do not pad the checklist with routine steps such as
   starting the development server with `pnpm dev`. Leave the actual acceptance
   decision to the user.
4. Stop and wait for an explicit user confirmation that manual verification has
   passed.
5. Only after approval, recheck `git status` and `git diff --check`, stage only
   the approved scope, and create the phase commit.
6. If any code or documentation changes after approval, repeat validation and
   request a fresh manual approval before committing.

## Start and baseline

```bash
git status --short --branch
git branch --show-current
pnpm lint
pnpm exec tsc --noEmit --incremental false
```

The branch already exists; do not recreate it. A production build may require
network access because current `next/font` configuration downloads Google
Fonts. If sandbox DNS blocks it, request network permission and rerun rather
than changing fonts as part of this feature.

## shadcn workflow for the empty state

Before adding or using a registry component, inspect project-aware docs:

```bash
pnpm dlx shadcn@latest docs input select field empty card badge button
pnpm dlx shadcn@latest add <missing-component> --dry-run
pnpm dlx shadcn@latest add <missing-component>
```

Inspect installed components first; `empty` already exists. The final add is a
code mutation and may require network approval. Review the added source and
imports; never use `--overwrite` without approval.

## Slices 2C and 2D manual verification

Both slices are implemented in the user's explicitly requested sequential delivery
of 2026-10-08. Slice 2C passed its agent gate before 2D started. The user then
accepted the delivery and explicitly authorized closing commits, a merge to
`preview` and pushes of both branches on 2026-10-08. Include the user's additional
Agenda card in the home page. Closure revalidation passed lint/types/build,
diff review and 591 fresh assertions; no implementation fix followed acceptance.

Use `verification-report-2c-2d.md` together with `verification-report-load-more.md`
as the complete manual checklist. The former records the initial 480 passing
assertions; the load-more amendment records a fresh 851 with the button boundaries
and regressions. Both give fixture/clock prerequisites, production verification,
local environment constraints and the recorded manual acceptance.
The development scenarios additionally include `browser` for reproducible search,
dynamic types, every display status and combined period filters.
The amendment adds `load-more-0/1/12/13/24/25/60` for repeatable button checks.
The older 2B checklist below remains useful for the detail regression matrix.

## Slice 2B manual verification

The detail page and Agenda card links are implemented. Review this slice only;
the complete browser, navigation rollout and Sanity integration remain pending.

First, with `AGENDA_VERIFY` unset, check `/agenda`: every next, featured,
upcoming and archived card opens its own detail. A cancelled card keeps its
muted styling, red badge and working keyboard link. Back returns to `/agenda`.
Check the user's final card order: location, description capped at three lines,
then the schedule panel. Opening the detail reveals the complete description.
Functional checks and final copy were manually accepted on 2026-10-08, with
explicit authorization to close 2B. The final Agenda hero
subtitle is `Trobem-nos i fem comunitat`; no hero description
renders, and the introduction below remains. Check the subtitle at all three widths.
Open `/agenda/activity/sortida-familiar-a-nuria`: full status, local image,
5 July 2027 at 09:00 and 17:00, 480 minutes, EUR 12.00, location, organizer,
participant bounds and requirements. No registration link is expected.

Then enable the development-only fixture set before restarting the server:

```powershell
$env:AGENDA_VERIFY = 'detail'
$env:AGENDA_VERIFY_NOW = '2026-10-08T12:00:00+02:00'
```

All paths below start with `/agenda/activity/`. `example.org/inscripcio` is
a demonstration destination: verify the link address, not a working booking form.

| Slug | Expected result |
| --- | --- |
| `verify-1` | Required fields, online location, free price; no image, requirements, gallery, end, duration, participant bounds or registration CTA. |
| `verify-2` | Agendada; main image and exactly two gallery images; 9 October 2026 at 09:00/11:00, 120 minutes; physical address, organizer link, EUR 12.00, 5–25 participants, age 6–80, Iniciació, two materials and notes; external CTA. |
| `detail-full` | Completa; external CTA remains visible. |
| `detail-cancelled` | Cancel·lada, muted struck-through title, red badge, 7 October 2026 at 10:00 cancellation date and rain reason; no CTA. |
| `detail-finished` | Finalitzada today; no CTA. Still in today's Agenda rather than archive. |
| `detail-archived` | Finalitzada and archived; detail remains addressable, no CTA, end or duration. |
| `detail-empty` | Empty image URL, gallery, materials and notes produce no image, optional sections or placeholders. |
| `does-not-exist` | Existing public not-found page; no activity content. |

With `AGENDA_VERIFY='calendar'` and the same fixed clock, verify `verify-1`
through `verify-7`: registration appears only on 3 (multi-day), 4 (duration
through tomorrow) and 6 (full), never on 1 (no URL), 2 (finished), 5
(cancelled) or 7 (archived). Verify 4 has Inici and Durada, with no invented Fi.
Set `AGENDA_VERIFY_NOW='2026-10-09T01:00:00+02:00'` and restart: 4 is finished
exactly at its derived end and loses its CTA; 1 finishes after Madrid midnight;
3 remains unfinished with its CTA. This requires no system-clock change.

For the populated, minimal and cancelled details, check 360, 768 and 1280 px:
no horizontal overflow or overlap; image framing, readable text and separated
date/time stacks; practical information moves below content on small screens.
Practical labels have small muted icons; requirements has a discrete backpack.
Tab/Shift+Tab must show focus on card, back, organizer and registration links;
Enter activates each. Icons are decorative (`aria-hidden`) and labels remain
readable. Inspect one h1, named sections and nonempty alt text on real images.
Check title, description and Open Graph title/description match each activity.
Local image requests use `/_next/image`, load successfully and never use an
empty source. Check browser console for render/hydration errors.

Clear the fixture variables and restart after verification:

```powershell
Remove-Item Env:AGENDA_VERIFY, Env:AGENDA_VERIFY_NOW -ErrorAction SilentlyContinue
```

Production ignores both variables. The 2B gate leaves changes unstaged and
uncommitted until the user explicitly accepts this checklist or requests fixes.

## Sanity schema and type generation

### Phase 4 closure (2026-10-08)

The user confirmed corrections and successful manual verification, then explicitly
authorized phase 4 commits and merge into `preview`. Closure revalidation passes
schema/typegen, lint/types/build, 164 schema, 99 integration and 82 domain checks,
plus all 35 seed validators. Before cleanup, read-only remote validation passed
all 68 documents with zero errors after the user's Studio corrections.
Record acceptance and close the already-approved scope in reviewable commits;
merge the feature branch into local `preview`. No new implementation fix follows
acceptance. This authorization does not include a push or starting phase 5.

The user's final release amendment requires no mock activities in Git `preview`
or the Sanity content used by Vercel. Keep the existing datasets/environment,
retain the exact five editor-created types, and exclude the demo catalog and
one-time import tooling from Git. Preserve the latest 35 full documents locally
and a complete export with assets before removing only their reviewed IDs from
`l7cbpkut/preview`. Use revision guards and clear the two references without
deleting either singleton. All other documents/assets must remain unchanged.
The local Studio shares this dataset and therefore also shows no activities.
Cleanup passed 22 fresh empty-browser assertions and exact public/raw reads.
Full validation now checks 33 editorial documents: 31 valid, plus the two
retained empty selectors with three required-selection errors. These expected
errors are resolved by choosing real activities; do not weaken their validators.
The full pre-cleanup export and ignored local documents preserve the originals.

### Phase 3 editorial selection amendment (2026-10-08)

The user replaced automatic spirit selection with a protected
`currentSpiritActivity` singleton. Phase 3 defines that schema alongside
`featuredActivity`; phase 4 connects the public reads and removes the automatic
selector. Use the exact IDs from `sanity/agenda.constants.ts` for both new
singletons and preserve `currentRoute-3`.
All three singletons are edited under Seccions > Destacats, in route/spirit/featured
order. Agenda contains only general activity and editable type management.
Root order: Rutes i itineraris, Agenda, divider, Destacats, divider, Subscripcions
with a users icon. Existing
stage-tag configuration is nested under Rutes i itineraris.

Phase 3 review blocks: 3A reusable type/seed; 3B activity/singletons/Studio.
Generated `schema.json` and `sanity.types.ts` are reviewed separately as generated
artifacts; compare the existing schema definitions semantically to exclude
unrelated changes. No import, document creation or dataset mutation is authorized.
Manual Studio verification requires an authenticated editor and test documents
in the user's chosen dataset. The agent uses in-memory documents for validation;
manual creation/publication is left to the user.

Run `node openspec/changes/agenda-activities/verification/schema-checks.mjs`
for the in-memory schema/Studio gate. It uses the installed Sanity validators,
an in-memory GROQ client, the real structure builder and generated-file comparisons.
See `verification-report-phase-3.md` for prerequisites and the user checklist.

### Optional later migration

The optional phase 5 in `tasks.md` and `design.md` tracks future server-side
search/filtering and cursor batches. It is highly recommended as the dataset
grows, not a blocker for the required phases 2–4 or their acceptance/commit gates.
Documenting it does not authorize starting it. Measure around 200 published
activities; consider it around 300–500 including archives, based on payload and
mobile behavior. Preserve search/date/status parity before any future cutover.

### Required schema commands

Run after schema or GROQ changes:

```bash
pnpm exec sanity schema validate --level error
pnpm typegen
git diff -- schema.json sanity.types.ts
pnpm lint
pnpm lint:types
```

`pnpm typegen` runs schema extraction and type generation, updating tracked
`schema.json` and `sanity.types.ts`. It does not mutate Content Lake.

If the managed environment rejects writes under the user config directory:

```bash
mkdir -p /tmp/amics-sanity-cli/sanity
env XDG_CONFIG_HOME=/tmp/amics-sanity-cli pnpm typegen
```

Use the same `XDG_CONFIG_HOME` prefix for other local Sanity CLI commands.

PowerShell equivalent for the same local workaround:

```powershell
$agendaSanityConfig = Join-Path $env:TEMP 'amics-sanity-cli'
New-Item -ItemType Directory -Force -Path (Join-Path $agendaSanityConfig 'sanity') | Out-Null
$env:XDG_CONFIG_HOME = $agendaSanityConfig
pnpm typegen
```

## Empty-state gate and content bootstrap

User-authorized exception (2026-10-08): after accepting phase 3, the user requested
35 generated activities and then direct upload to Studio's configured `preview`
dataset, project `l7cbpkut`. Prepare `sanity/seed/agenda-preview-activities.ndjson`
with only `drafts.agenda-demo-*` activities referencing the five existing published
types. The full backup is `.sanity/backups/preview-before-agenda-demo-2026-10-08.tar.gz`.
Validate with `node openspec/changes/agenda-activities/verification/seed-checks.mjs`,
then import with `--missing`; never replace existing documents. Confirm the exact
remote payload and zero published activities afterwards. No singleton mutation or
publication is part of this upload; the empty published cutover gate is preserved.
This explicit user request authorizes this draft-only content preparation before
the read integration. Keep preparation changes uncommitted pending phase 4 review.

Subsequent user authorization (2026-10-08): implement phase 4 reads/cutover,
verify the empty published state first, then publish the 35 prepared activities
in the same configured `l7cbpkut/preview` target and inspect the visible changes.
Reuse the five editor-created types; do not import the historical nine-type seed.
Export a fresh full backup before publication. Publish only the reviewed demo
draft IDs using Sanity's publish action with draft revision guards. For the
phase 4 selector/image checks, complete the two existing empty singleton drafts
with the manifest's selections and reuse existing Montserrat image assets on
the selected demo outing; preserve any populated editor selection. Record every
mutation and restore temporary Live-check edits. This scoped content bootstrap
is authorized; phase 4 commits still require new manual acceptance.

Switch to Sanity before creating Agenda content. Verify `/agenda` and
`/rutes-itineraris` against the empty dataset first. Do not treat an empty
result as an infrastructure error.

The type seed is remote content. After the user confirms `<dataset>`, back up
and import only missing deterministic IDs:

```bash
pnpm exec sanity dataset export <dataset> <backup-path>
pnpm exec sanity dataset import sanity/seed/activity-types.ndjson <dataset> --missing
```

Never substitute `--replace`. Activities, featured singleton, and image assets
are created through `/admin` unless a separate approved migration is specified.
Include drafts in the backup; confirm the project ID as well as dataset.

## Remote validation

```bash
pnpm exec sanity documents validate --yes --level error --dataset <dataset>
pnpm exec sanity documents query '*[_type == "activityType"] | order(name asc){_id,name,"slug":slug.current}' --dataset <dataset> --pretty
pnpm exec sanity documents query '*[_type == "activity"] | order(schedule.startDate asc){_id,title,"slug":slug.current,status,type->{_id,name,"slug":slug.current}}' --dataset <dataset> --pretty
pnpm exec sanity documents query '*[_type == "featuredActivity" && _id == "featuredActivity"][0]{featuredActivity->{_id,title,"slug":slug.current}}' --dataset <dataset> --pretty
```

`sanity schema deploy --workspace default` is experimental and optional. Run it
only if the user explicitly adopts deployed schemas for this project.

## Final verification and rollback

Use reversible fixtures and fixed `now = 2026-10-08T12:00:00+02:00` by default.
Pass the clock into selectors and the browser; never change the system clock.

| Scenario | Expected result |
| --- | --- |
| 0, 1, 6, >6 remaining preview candidates | All available up to six; no placeholders |
| Eight non-archived activities, two different highlights | Six preview cards, no duplicates |
| Same next and featured | One highlight; no duplicate card |
| Today at 10:30, now today 23:59:59 then next midnight | Upcoming then archive |
| Ends tomorrow / ends today before now | Unfinished through end / finished today, archive next day |
| Madrid DST on 2026-03-29 and 2026-10-25 | Archive changes at local midnight |
| Several marked spirit editions, renamed title, later date | Exact singleton target remains selected; all editions remain published |
| Selected spirit target is unmarked, invalid, unpublished or absent | Contact fallback; no automatic replacement |
| Manually change current spirit reference | Both routes CTAs use the newly selected edition's current slug |
| No URL / URL + unfinished scheduled or full / cancelled or completed | No CTA / CTA / no CTA |
| Empty read / invalid record / network error / unpublished | Empty / discard / retry UI / omitted |

Prepare these repeatable fixtures in slice 2A without a new test framework.
Development fixtures use `AGENDA_VERIFY` (calendar, spirit, preview-0/1/6/8,
archive-0/1/6/8, archive-featured, same-highlight, empty) and optional
`AGENDA_VERIFY_NOW`. Production ignores both keys. Slice 2A acceptance is
recorded in `tasks.md`; its completed manual checklist was removed.

```bash
pnpm lint
pnpm lint:types
pnpm build
git status --short --branch
git diff --check
```

Give the following checks to the user and wait for their explicit result before
committing: inspect `/agenda`, `/agenda/activitats`, a known and unknown activity
detail, `/rutes-itineraris`, and `/admin` at 360, 768, and 1280 px. On the
complete browser, verify case- and accent-insensitive search, every type/status
filter, clear, result count, and zero matches using only local interactions. For
Sanity images, inspect `src/srcSet`: they must point directly to `cdn.sanity.io`
with responsive width and `auto=format`, never a nested `/_next/image` URL.

Rollback production to the last approved working release, not demo fixtures.
Local sources are a development fallback. Do not delete schemas, seed types,
activities, or assets during rollback.
