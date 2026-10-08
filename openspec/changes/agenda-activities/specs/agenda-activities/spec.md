# Agenda Activities Specification

## Requirement: reusable editorial activity types

The system MUST model an activity type as an `activityType` document and an
activity MUST contain exactly one required strong reference to it.

### Scenario: select a predefined type

- **Given** the predefined type documents exist
- **When** an editor edits an activity
- **Then** Studio MUST allow one existing type to be selected
- **And** the published website MUST display the referenced Catalan name

### Scenario: create and rename a type

- **Given** an editor needs a type not in the predefined list
- **When** they create it from Studio and select it
- **Then** no code deployment MUST be required
- **And** later name edits MUST flow to referencing activities by document ID

### Scenario: prevent a dangling reference

- **Given** a type is referenced by an activity
- **When** an editor attempts to delete that type
- **Then** the strong reference MUST prevent deletion

## Requirement: closed status and level vocabularies

Persisted status MUST be one of `scheduled`, `full`, or `cancelled`. Level,
when present, MUST be one of `beginner`, `intermediate`, `advanced`, or `any`.
Studio MUST show their labels in Catalan and MUST NOT permit arbitrary values.

Completion MUST be derived from `now >= endDate`, else start plus duration,
else the next Madrid day. It MUST NOT require database updates. Display status
MUST preserve cancelled; otherwise completed activities display finished.
Archive placement and registration eligibility MUST also be computed, not stored.
Cards MUST show startDate/time and optional endDate/time, even on the same day,
using ca-ES, a 24-hour clock and Europe/Madrid. Current dates are datetime values.
Inici, optional Fi and optional Durada MUST occupy separate stacks; each date
stack MUST place the time on a separate line from the date.
Card headers MUST retain the title left and type pill right.
Card content MUST show location first, then description clamped to three lines,
then the schedule panel. The detail page MUST retain the full description.
A cancelled/full/finished pill MUST replace capacity in the footer. Cancelled cards MUST look muted while
retaining their detail link and keyboard accessibility when details are implemented.

## Requirement: agenda selection

### Scenario: choose the next activity

- **Given** today's and future activities with editorial status and computed completion
- **When** the agenda is rendered
- **Then** next MUST be the earliest non-archived, unfinished scheduled or full activity
- **And** an activity that started today MUST remain eligible until completion
- **And** a cancelled or finished activity MUST NOT become next

### Scenario: render archive

- **Given** activities with different last calendar days in Europe/Madrid
- **When** the agenda is rendered
- **Then** only activities whose last day is before today MUST enter the archive
- **And** today's activities MUST remain outside it until the next Madrid midnight
  even when already completed, including across daylight-saving transitions
- **And** multi-day activities MUST remain outside it through their final day
- **And** non-archived cancelled activities MUST remain visible with their status

## Requirement: editorial featured activity

### Scenario: resolve or omit the singleton

- **Given** `featuredActivity` references a published activity
- **When** the agenda is rendered
- **Then** that activity MUST be displayed as featured
- **But** if it is also next, it MUST NOT be duplicated
- **And** a missing singleton or reference MUST hide the featured section
- **And** Studio and the query MUST use the same fixed singleton document ID
- **And** selection MUST resolve the strong document reference, not a copied slug

## Requirement: simple external registration

- An HTTP(S) registration URL MUST be optional; no URL MUST produce no CTA or
  required contact step. Local fixtures MUST use the same rule.
- A valid URL MUST show a CTA for non-archived scheduled/full activities.
- Archived, cancelled, or finished activities MUST hide the registration CTA.
- Availability MUST belong to the external service; editorial status changes
  MUST NOT imply synchronized seats. Registration flags/deadlines are out of scope.

## Requirement: public activity details

### Scenario: render optional data safely

- **Given** a valid activity slug with only required fields
- **When** its detail page renders
- **Then** required information MUST be visible
- **And** absent optional sections and unusable images MUST NOT render empty UI

### Scenario: unknown activity

- **Given** no activity matches the requested slug
- **When** the detail route is requested
- **Then** the nearest Next.js not-found page MUST render

## Requirement: agenda preview and complete browser

### Scenario: preview no more than six upcoming activities

- **Given** next and featured activities have already been rendered on
  `/agenda`
- **When** the remaining upcoming preview is rendered
- **Then** it MUST exclude those rendered activities
- **And** it MUST show the earliest six remaining activities at most
- **And** it MUST render every available activity when fewer than six remain
- **And** a button below the cards MUST open `/agenda/activitats?period=upcoming`
  once the complete browser is implemented

### Scenario: preview no more than six archived activities

- **Given** archived activities, including a rendered featured activity
- **When** the archive preview on `/agenda` is rendered
- **Then** it MUST exclude rendered highlights before selecting the six newest at most
- **And** fewer remaining activities MUST render without placeholders
- **And** a button below the cards MUST open `/agenda/activitats?period=archived`
  once the browser is implemented; pending buttons MUST be visibly unavailable
  and MUST NOT navigate to an unimplemented route

### Scenario: browse all activities

- **Given** upcoming and archived activities exist
- **When** `/agenda/activitats` is rendered
- **Then** it MUST make every activity reachable through its detail link
- **And** upcoming activities MUST precede the newest-first archive
- **And** valid period URL presets MUST initialize the corresponding filter;
  absent/unknown values and clearing MUST restore all periods

### Scenario: search and filter activities

- **Given** the complete activity browser has received activities
- **When** a visitor searches by text or selects a type or status
- **Then** results MUST update without a navigation or network request
- **And** text matching MUST ignore case and diacritics
- **And** type options MUST be derived from the received reusable types
- **And** clearing controls MUST restore the complete matching set and its first 12 cards at most
- **And** status filtering MUST use derived display status, including finished
- **And** zero matches MUST render an accessible no-results state

### Scenario: reveal more matching activities

- **Given** `/agenda/activitats` has more than 12 matching activities
- **When** it first renders or any search/filter changes or clears
- **Then** only the first 12 matching cards MUST render
- **And** a `Veure'n més` button MUST append the next 12 cards at most per activation
- **And** order and existing cards MUST be preserved without duplicates or omissions
- **And** the button MUST disappear when no more matches remain; 12 or fewer matches MUST have no button
- **And** scrolling alone MUST NOT append cards
- **And** searching/filtering MUST include activities that have not yet been revealed
- **And** revealing cards MUST NOT navigate or request data
- **And** visible/total counts MUST be announced and focus MUST reach the first newly added card

## Requirement: editorial current spirit edition

### Scenario: preserve history and select an edition manually

- **Given** separate valid activities marked `isSpiritActivity` with unique slugs
- **And** the fixed `currentSpiritActivity` singleton references one of them
- **When** `/rutes-itineraris` renders after phase 4 cutover
- **Then** it MUST use `getCurrentSpiritActivity` and link to the selected edition's current slug
- **And** a later published edition MUST NOT change the selection automatically
- **And** Studio and query MUST share the exact `currentSpiritActivity` document ID
- **And** selection MUST use a required strong reference, not a copied slug
- **And** title/type renames MUST NOT change membership or erase previous editions
- **And** the editor MUST be able to change the selected edition without deleting any activity

### Scenario: constrain selection and omit invalid targets

- **When** an editor selects a current spirit activity
- **Then** the picker MUST offer only activities marked `isSpiritActivity`
- **And** singleton validation MUST reject an unmarked target, including a draft with the marker removed
- **And** global/inline creation, duplication and deletion of Agenda singletons MUST be unavailable in Studio
- **And** the existing `currentRoute-3` document ID MUST remain unchanged
- **And** Seccions MUST group Ruta d'Enguany, Sortida amb l’Esperit actual and
  Activitat destacada in that order under Destacats, with a star icon
- **And** Agenda MUST contain only general activities and editable activity types
- **And** Agenda MUST use a calendar icon and separate Activitats from
  Tipus d'activitat with a divider; the type list MUST use a settings icon
- **And** Rutes i itineraris MUST use a route icon and contain Rutes, Etapes,
  Llocs d'interès, Comarca, a divider, and Config [NO TOCAR] with a settings icon
- **And** the three Destacats entries MUST use route, heart and star icons respectively
- **And** Seccions MUST order Rutes i itineraris, Agenda, a divider, Destacats,
  a divider, and Subscripcions with a users icon; stage-tag configuration MUST
  remain accessible under Rutes i itineraris
- **When** a published read finds no singleton or an unresolved, unpublished, invalid or unmarked target
- **Then** the routes section MUST retain its usable contact fallback
- **And** it MUST NOT select another edition automatically

Phase 3 MUST provide the editorial schemas only. Phase 4 MUST implement the new
queries/services and replace the approved phase 2 local automatic selection.

## Requirement: source parity and empty data

### Scenario: switch sources

- **Given** equivalent local and Sanity records
- **When** `dataSource.agenda` changes
- **Then** the page and components MUST receive the same domain contract

### Scenario: empty Sanity dataset

- **Given** no activity, type, or featured documents exist
- **When** the Sanity-backed agenda renders
- **Then** it MUST show the hero, introduction, and accessible empty state
- **And** it MUST NOT throw or render broken links

### Scenario: invalid records and infrastructure failures

- **Given** a successful read containing invalid required fields
- **Then** invalid activities MUST be discarded and optional malformed data omitted
- **But** a network/auth/query failure MUST render an error with retry, not an
  empty agenda or a false 404; unpublished activities MUST NOT appear publicly

## Requirement: image metadata and delivery

### Scenario: render a Sanity image

- **Given** an image has asset, crop, hotspot, and alt metadata
- **When** a card, hero, or gallery renders it
- **Then** all metadata MUST reach `getImageProps`
- **And** `OptimizedImage` MUST produce direct responsive Sanity CDN URLs

### Scenario: invalid image

- **Given** neither a valid Sanity asset nor local URL exists
- **When** `getImageProps` returns `null`
- **Then** the UI MUST omit the image without passing an empty source
