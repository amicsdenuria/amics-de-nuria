# Agent Runbook: Agenda Activities

## Operating rules

1. Read repository `AGENTS.md`; before any activity image work, read
   `.agents/skills/sanity-images/SKILL.md` fully.
2. Work only on `codex/agenda-activities`; preserve unrelated user changes.
3. Complete one phase gate before beginning the next. Keep each review slice
   at or below 400 changed lines; ask before creating chained PRs.
4. Never run remote Sanity create/import/migration/delete/deploy commands
   without the exact dataset and explicit user approval.
5. Use `apply_patch` for edits and update `tasks.md` as work completes.

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
pnpm dlx shadcn@latest add empty --dry-run
pnpm dlx shadcn@latest add empty
```

The final add is a code mutation and may require network approval. Review the
added source and imports; never use `--overwrite` without approval.

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

## Empty-state gate and content bootstrap

Switch to Sanity before creating Agenda content. Verify `/agenda` and
`/rutes-itineraris` against the empty dataset first. Do not treat an empty
result as an infrastructure error.

The type seed is remote content. After the user confirms `<dataset>`, back up
and import only missing deterministic IDs:

```bash
pnpm exec sanity dataset export <dataset> /tmp/<dataset>-pre-activity-types.tar.gz --no-drafts
pnpm exec sanity dataset import sanity/seed/activity-types.ndjson <dataset> --missing
```

Never substitute `--replace`. Activities, featured singleton, and image assets
are created through `/admin` unless a separate approved migration is specified.

## Remote validation

```bash
pnpm exec sanity documents validate --yes --level error --dataset <dataset>
pnpm exec sanity documents query '*[_type == "activityType"] | order(name asc){_id,name,"slug":slug.current}' --dataset <dataset> --pretty
pnpm exec sanity documents query '*[_type == "activity"] | order(schedule.startDate asc){_id,title,"slug":slug.current,status,type->{_id,name,"slug":slug.current}}' --dataset <dataset> --pretty
pnpm exec sanity documents query '*[_type == "featuredActivity"][0]{featuredActivity->{_id,title,"slug":slug.current}}' --dataset <dataset> --pretty
```

`sanity schema deploy --workspace default` is experimental and optional. Run it
only if the user explicitly adopts deployed schemas for this project.

## Final verification and rollback

```bash
pnpm lint
pnpm lint:types
pnpm build
git status --short --branch
git diff --check
```

Manually inspect `/agenda`, `/agenda/activitats`, a known and unknown activity
detail, `/rutes-itineraris`, and `/admin` at 360, 768, and 1280 px. On the
complete browser, verify case- and accent-insensitive search, every type/status
filter, clear, result count, and zero matches using only local interactions. For
Sanity images, inspect `src/srcSet`: they must point directly to `cdn.sanity.io`
with responsive width and `auto=format`, never a nested `/_next/image` URL.

Rollback is code-only: return Agenda data sources to `local` and redeploy. Do
not delete schemas, seed types, activities, or assets during rollback.
