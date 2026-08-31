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

Status MUST be one of `scheduled`, `full`, `cancelled`, or `finished`. Level,
when present, MUST be one of `beginner`, `intermediate`, `advanced`, or `any`.
Studio MUST show their labels in Catalan and MUST NOT permit arbitrary values.

## Requirement: agenda selection

### Scenario: choose the next activity

- **Given** future scheduled, full, cancelled, and finished activities
- **When** the agenda is rendered
- **Then** next MUST be the earliest scheduled or full activity
- **And** a cancelled or finished activity MUST NOT become next

### Scenario: render archive

- **Given** activities before and after the current instant
- **When** the agenda is rendered
- **Then** past or finished activities MUST appear in a separate newest-first
  archive
- **And** future cancelled activities MUST remain upcoming with their status

## Requirement: editorial featured activity

### Scenario: resolve or omit the singleton

- **Given** `featuredActivity` references a published activity
- **When** the agenda is rendered
- **Then** that activity MUST be displayed as featured
- **But** if it is also next, it MUST NOT be duplicated
- **And** a missing singleton or reference MUST hide the featured section

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
- **And** a primary-action link MUST navigate to `/agenda/activitats`

### Scenario: browse all activities

- **Given** upcoming and archived activities exist
- **When** `/agenda/activitats` is rendered
- **Then** it MUST make every activity reachable through its detail link
- **And** upcoming activities MUST precede the newest-first archive

### Scenario: search and filter activities

- **Given** the complete activity browser has received activities
- **When** a visitor searches by text or selects a type or status
- **Then** results MUST update without a navigation or network request
- **And** text matching MUST ignore case and diacritics
- **And** type options MUST be derived from the received reusable types
- **And** clearing controls MUST restore the complete result set
- **And** zero matches MUST render an accessible no-results state

## Requirement: persistent spirit activity

### Scenario: find by stable slug

- **Given** the persistent activity has the configured spirit slug
- **When** `/rutes-itineraris` renders
- **Then** it MUST use `getActivityBySlug` and link to its detail
- **And** missing data MUST leave the placeholder section usable

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
