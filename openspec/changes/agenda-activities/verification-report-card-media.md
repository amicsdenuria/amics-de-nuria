# Card images and external links verification (2026-10-13)

Implemented on `codex/agenda-activities`, preserving earlier uncommitted
intro/slug amendments and the user-supplied `public/activity-default.webp`.
No commit, push, deployment or remote content mutation was performed.

## Delivered behavior

Organizer websites and external registration links use `target="_blank"` with
`rel="noopener noreferrer"`. Internal card and back links retain normal navigation.

Cards place a full-width 16:9 cover before CardHeader, following the
[shadcn image composition](https://ui.shadcn.com/docs/components/radix/card#image).
The existing header/content/footer styling remains. Cancelled cards also mute
the image. Responsive sizes cover the preview/browser grids and wider highlights.

`getImageProps` preserves Sanity asset/crop/hotspot/alt, then `OptimizedImage`
routes those images directly through `next-sanity/image` to Sanity CDN. The
complete browser carries only `content.mainImage`, excluding gallery and other
detail-only data. Missing/unusable images use `/activity-default.webp` through
Next image optimization; its empty alt identifies it as a decorative placeholder.

## Validation

| Gate | Result |
| --- | --- |
| Lint excluding local `.sanity/**` artifacts | PASS |
| TypeScript without incremental cache | PASS |
| Production build | PASS |
| Schema and slug assertions | PASS: 183 |
| Intro/GROQ/adapter/service assertions | PASS: 19 |
| Domain/card/detail/image/link assertions | PASS: 112 |
| Real Chrome browser assertions | PASS: 69 |
| Scoped diff review and `git diff --check` | PASS |

The pre-existing full-lint failure in a downloaded `.sanity` JS file remains
unchanged, as recorded in `verification-report-intro.md`. The shadcn docs CLI
hit a missing `ajv` dependency in its temporary package store; the official
documentation above was inspected directly without changing project dependencies.
The Node render script compiles the installed next-sanity Image source using
the app's CJS interop; real-browser validation also covers the unmodified
production dependency implementation.

Browser checks used a temporary production server on `localhost:3170`, then
closed it. The initial `127.0.0.1` hostname triggered the known local proxy
failure; repeating with documented `localhost` resolved it. The user's existing
development server on port 3000 was retained.

Real `/agenda` and `/agenda/activitats` cards were inspected at 360, 768 and
1280 px. Twelve observed Sanity cover renders loaded successfully, with
responsive direct-CDN `src/srcSet`, width parameters, `rect` crop and
`auto=format`; none used nested `/_next/image` URLs. Covers precede the header,
retain 16:9 geometry and produce no horizontal overflow. Screenshots were
visually inspected. Two real external detail links have the new-tab/security
attributes and the back link retains normal navigation. No browser render errors.

The placeholder path was exercised by the render gate for missing and empty
main images. A read of the optimized placeholder on the user's port 3000 returned
HTTP 200. No published activity was edited to manufacture a no-image case.

Local ignored browser script, JSON evidence and six screenshots are under
`.sanity/verification/card-media*`. Main-image rendering is visually verified;
final human acceptance and a published no-image example remain in the checklist.

## Manual acceptance on the user's port 3000

Prerequisites: published activities with a valid main image and no main image,
and one activity with organizer/registration URLs. Use existing testing content
or prepare these states through Studio. For the Sanity case, review crop/hotspot
framing and editorial alt. The placeholder applies only to cards; the detail
continues to omit its main image when none is supplied.

1. Inspect `http://localhost:3000/agenda` and `/agenda/activitats` at 360, 768 and
   1280 px. Images must fill the top of the cards above the header, retain 16:9,
   rounded top corners and the accepted card content. Check wider highlights,
   cancelled cards, filtering and load more where applicable.
2. Check a card without main image: it must show the supplied placeholder in
   both pages. No empty image source or broken-image icon should appear.
3. Open a detail and activate the organizer and external registration links:
   each must open another tab. Card/back navigation remains in the current tab.
4. In DevTools, inspect card image `src/srcSet`: real Sanity images point directly
   to `cdn.sanity.io` with widths and `auto=format`, never wrapped by `/_next/image`.
   The local placeholder uses `/_next/image`.

Wait for explicit manual acceptance before any commit or push.
