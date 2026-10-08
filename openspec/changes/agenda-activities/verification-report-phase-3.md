# Phase 3 verification — Agenda editorial model

Date: 2026-10-08. Branch: `codex/agenda-activities`.
Status: agent gate passed; user explicitly accepted manual verification and
requested phase 3 closing commits on 2026-10-08. Integration belongs to phase 4.

## Delivered scope

- `activityType`: reusable Catalan name and unique slug; nine deterministic seed
  documents matching local type IDs/names/slugs. Seed file only, no import.
- `activity`: English fields matching the domain, seven Catalan groups, required
  strong type reference with inline creation, date/duration/bounds/price rules,
  optional external HTTP(S) registration, conditional fields, images with
  asset/alt/hotspot, distinct gallery assets capped at ten, previews and orderings.
- Protected `featuredActivity` and `currentSpiritActivity` singletons with exact
  IDs, required strong references, no inline/global creation, deletion or
  duplication. Spirit picker filters marked editions; its validator prefers
  the selected activity's draft when checking the marker.
- Studio's Destacats uses a star icon and groups the route, current spirit and featured singletons;
  Agenda contains only activities and editable types. Generated schema/types and
  `currentRoute-3` are preserved.
- Specification amended to manual spirit selection at the user's request.

## Agent results

| Check | Result |
| --- | --- |
| Initial lint and TypeScript baseline | PASS |
| `pnpm exec sanity schema validate --level error` | PASS, 0 schema errors |
| `pnpm typegen` | PASS, 23 schema types / 15 existing GROQ queries |
| `pnpm lint` | PASS |
| `pnpm lint:types` | PASS |
| `pnpm build` | PASS, including embedded `/admin` |
| `node openspec/changes/agenda-activities/verification/schema-checks.mjs` | PASS, 156 assertions |
| `git diff --check` and scoped diff review | PASS |

The verification script runs actual Sanity validators against in-memory documents
and evaluates validation queries with `groq-js`; it never requests Content Lake.
It covers required/blank fields, closed status/level values, missing references,
equal/earlier/invalid ends, matching elapsed duration across Madrid DST, bounds,
conditional paid amount (including Infinity), free stale amount, optional URLs,
image asset/alt, gallery limits/duplicates, slug uniqueness, seed parity, exact
singleton IDs, marker removal in a draft, serialized Studio panes and creation
templates/actions. Existing generated schemas and type/query declarations are
compared with HEAD and are semantically unchanged (apart from the expected
addition to the schema-type union).

Review handwritten schemas/Studio, verification, and specification/report as
separate blocks below 400 changed lines. Generated JSON has more than 400 lines;
review its new singleton/type definitions and the activity's general,
schedule/location, and optional content definitions as separate bounded blocks.
Generated TypeScript is a separate block below 400 changed lines. Existing
generated definitions are protected by the semantic comparisons above.

## Limits and prerequisites

Studio interaction/publication requires your authenticated editor session in
`/admin` and the intended Sanity dataset. No authenticated browser verification,
remote import, document publication or deletion was performed by the agent.
Schema rules protect Studio publication; arbitrary API writes are not validated
by these rules. Phase 4 must still defend against invalid published reads.

The nine seed types do not appear in Content Lake until the separately approved
phase 4 bootstrap. For this manual check, use an existing activity type or create
and publish one through Studio's type picker. Publish referenced types and
activities before publishing their singleton references.

Agenda public pages still use approved local fixtures. Changing these Studio
selectors is **not expected to change the public routes CTA yet**. Phase 4 will
replace `getLatestSpiritActivity` and automatic date selection with
`getCurrentSpiritActivity`, exact-ID queries and local explicit-reference fixtures.
Missing, unpublished, invalid or unmarked selections will retain the contact
fallback without automatically choosing another edition. Real Sanity CDN image
verification likewise belongs to that integration phase.

Build emitted the existing stale Browserslist/baseline-data notices; no dependency
updates were introduced. The Windows sandbox could not initialize; local quality
commands ran through approved escalation. The approved delivery is closed in
separate implementation, generated-contract and verification/documentation commits.

## Exact manual checklist

1. Open `/admin` as an editor. Under **Seccions**, confirm **Destacats** has a star
   icon and contains
   **Ruta d'Enguany**, **Sortida amb l’Esperit actual**, and **Activitat destacada**
   in that order. Confirm **Ruta d'Enguany** still opens the existing route document
   and selection, and is absent from the top level. **Agenda** must contain only
   **Activitats** and editable **Tipus d'activitat**.
   Root order must be **Rutes i itineraris**, **Agenda**, a separator,
   **Destacats**, another separator, and **Subscripcions** last with a users icon.
   Confirm stage-tag configuration remains
   accessible in **Rutes i itineraris > Config [NO TOCAR]**.
   **Rutes i itineraris** must have a route icon and contain **Rutes**, **Etapes**,
   **Llocs d'interès**, **Comarca**, a separator, then **Config [NO TOCAR]** with a
   settings icon. Confirm the Etapes submenu still offers all stages and tags.
   **Agenda** must have a calendar icon and contain **Activitats**, a separator,
   then **Tipus d'activitat** with a settings icon. The three Destacats entries
   must show route, heart and star icons respectively.
2. Create a type from the activity reference picker, or select an existing one.
   Generate its slug, publish it, and check that its Catalan name appears in the
   activity picker. Editing the name should retain the same reference.
3. Prepare two separate activities A/B with the same spirit title, different
   generated slugs and start dates (A earlier than B), both marked **Sortida amb
   l’Esperit**. Fill required description, type, status, start, location/online,
   organizer and free-price flag; publish both. Confirm both remain in Activitats
   and their previews show their own Madrid date/time, status and type.
4. In **Destacats > Sortida amb l’Esperit actual**, select A and publish the singleton. Inspect
   its document ID: exactly `currentSpiritActivity`. Reopen it: A must remain
   selected although B has a later date. Switch to B and publish; A must remain
   published as a separate activity. An ordinary unmarked activity must not appear
   in this picker. No inline create button should appear in either singleton picker.
5. Select either edition in **Destacats > Activitat destacada** and publish. Inspect its ID:
   exactly `featuredActivity`. Confirm the two selectors can point to different
   activities. Singleton action menus must omit **duplicate** and **delete**, and
   the global create menu must offer activities/types but neither singleton.
6. On the currently selected spirit activity, temporarily unmark **Sortida amb
   l’Esperit**, leaving the edit in its draft. Reload/edit the spirit singleton:
   validation must reject that target. Restore the marker on the activity before
   completing the check. The validator runs when the singleton is validated;
   the later public adapter will additionally reject unmarked published targets.
7. On a disposable draft, check equal/earlier end dates block publication; start
   09:00/end 10:00 with duration 59 blocks, and duration 60 passes. Clearing optional
   end/duration should pass. Participant min 10/max 2 and age min 20/max 10 block;
   equal bounds pass. Status offers only Agendada/Completa/Cancel·lada and level
   only Iniciació/Intermedi/Avançat/Qualsevol.
8. Check non-free requires a nonnegative EUR amount; free hides the amount and
   passes without one. Online hides address/city/province; physical shows them
   without making them required. Cancel·lada reveals optional date/reason. Empty
   registration URL is valid; `https://example.org` passes, `ftp://example.org`
   fails. Optional organizer URL obeys the same HTTP(S) restriction.
9. Add an image: asset and nonblank Catalan alt must be required; crop/hotspot
   controls must be available. Gallery accepts ten distinct images, rejects eleven
   or a duplicate asset even with different alt/crop. Removing optional image/
   gallery fields entirely must pass. Duplicate activity/type slugs must fail.
10. Confirm activity start/title orderings and type-name ordering are available;
    check the layout in `/admin` at 360/768/1280 px. Public `/agenda`,
    `/agenda/activitats` and `/rutes-itineraris` must retain their local behavior;
    public response to the new selectors is verified only in phase 4.

Explicit manual acceptance is required by `AGENTS.md` and this change's runbook
before any commit, including documentation. Report adjustments before acceptance;
any later fix repeats the agent gate and needs fresh acceptance.
The user confirmed that verification passed and requested closure on 2026-10-08.
