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

## Sanity schema and type generation

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
| Ends tomorrow; status finished today | Outside archive through tomorrow |
| Madrid DST on 2026-03-29 and 2026-10-25 | Archive changes at local midnight |
| Spirit editions, renamed title, tied dates, invalid latest | Latest valid marked edition; ID tie-break |
| Latest spirit edition is future or cancelled | That edition remains the routes selection |
| No URL / URL + scheduled or full / cancelled, finished, archive | No CTA / CTA / no CTA |
| Empty read / invalid record / network error / unpublished | Empty / discard / retry UI / omitted |

Prepare these repeatable fixtures in slice 2A without a new test framework.

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
