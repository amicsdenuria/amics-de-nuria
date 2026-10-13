// No test framework: execute from the repository root with node.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire, registerHooks } from 'node:module';
const require = createRequire(import.meta.url);
registerHooks({ resolve(specifier, context, nextResolve) {
  try { return nextResolve(specifier, context); }
  catch (error) {
    if (specifier.startsWith('next/') && !specifier.endsWith('.js')) return nextResolve(`${specifier}.js`, context);
    throw error;
  }
} });
const ts = require('typescript');
const Module = require('node:module');
const root = process.cwd();
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (specifier, ...args) {
  return originalResolve.call(this, specifier.startsWith('@/') ? path.join(root, specifier.slice(2)) : specifier, ...args);
};
for (const extension of ['.ts', '.tsx']) {
  Module._extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: filename,
  }).outputText, filename);
}
process.env.NODE_ENV = 'development';
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'localtest';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'localtest';
process.env.AGENDA_VERIFY_NOW = '2026-10-08T12:00:00+02:00';
// Compile the installed Sanity Image source with the same Next/CJS interop as the app.
const sanityImagePath = require.resolve('next-sanity/image');
const sanityImageSource = path.resolve(path.dirname(sanityImagePath), '../../src/image/Image.tsx');
require.cache[sanityImagePath] = { id: sanityImagePath, filename: sanityImagePath, loaded: true,
  exports: require(sanityImageSource) };
// This regression matrix exercises the explicit local source, independent of cutover.
const { dataSource } = require(path.join(root, 'config/site.config.ts'));
Object.assign(dataSource.agenda, { activities: 'local', featuredActivity: 'local', currentSpiritActivity: 'local' });
const livePath = path.join(root, 'sanity/lib/live.ts');
require.cache[livePath] = { id: livePath, filename: livePath, loaded: true,
  exports: { sanityFetch: async () => { throw new Error('Local fixtures must not fetch Sanity'); } } };
const service = require(path.join(root, 'domain/activity/activity.service.ts'));
const selectors = require(path.join(root, 'domain/activity/activity.selectors.ts'));
const model = require(path.join(root, 'app/(site)/(public)/agenda/components/activityBrowserModel.ts'));
const { renderToStaticMarkup } = require('react-dom/server');
const nextServer = require.resolve('next/server');
require.cache[nextServer] = { id: nextServer, filename: nextServer, loaded: true, exports: { connection: async () => {} } };
const AgendaPage = require(path.join(root, 'app/(site)/(public)/agenda/page.tsx')).default;
let passed = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); passed++; };
for (const preset of [undefined, '', 'invalid', ['upcoming', 'archived']]) check('Unknown period restores all', model.parseActivityPeriod(preset), 'all');
for (const preset of ['upcoming', 'archived']) check('URL preset', model.parseActivityPeriod(preset), preset);
process.env.AGENDA_VERIFY = 'browser';
const now = service.getAgendaNow();
const activities = await service.getActivities();
const items = model.toActivityBrowserItems(activities, now);
check('Complete order, including today-finished and multi-day', items.map(({ slug }) => slug), ['verify-7', 'verify-3', 'verify-2', 'verify-4', 'verify-5', 'verify-6', 'verify-1', 'verify-8']);
check('Period counts', [items.filter((item) => item.period === 'upcoming').length, items.filter((item) => item.period === 'archived').length], [6, 2]);
for (const [status, count] of [['scheduled', 3], ['full', 1], ['cancelled', 2], ['finished', 2]])
  check(`Derived status ${status}`, items.filter((item) => item.displayStatus === status).length, count);
for (const [text, slugs] of [
  ['MUSICA A NURIA', ['verify-1']], ['constellacions', ['verify-3']], ['CONSTEL·LACIONS', ['verify-3']],
  ['REFUGI DEL BOSC', ['verify-2']], ['ribes de freser', ['verify-2']], ['ASSOCIACIO CAMINS', ['verify-5']],
  ['astronomia', ['verify-6']], ['Online', ['verify-6']], ['   musIca   ', ['verify-1']],
]) check(`Search ${text}`, items.filter((item) => model.activitySearchText(item).includes(model.normalizeActivitySearch(text))).map(({ slug }) => slug), slugs);
check('Payload does not include gallery, requirements or metadata', items.every((item) =>
  !('images' in (item.content ?? {})) && !('requirements' in item) && !('metadata' in item)), true);
check('Dates are strings at the boundary', items.every((item) => typeof item.schedule.startDate === 'string'), true);
const roundTrip = JSON.parse(JSON.stringify(items));
check('Serialization preserves derived card statuses', roundTrip.map((item) => selectors.getActivityDisplayStatus(model.toActivityCardData(item), now)), items.map((item) => item.displayStatus));
const { activityFromLocal } = require(path.join(root, 'domain/activity/activity.adapter.ts'));
const { ActivityCard } = require(path.join(root, 'app/(site)/(public)/agenda/components/ActivityCard.tsx'));
const { createElement } = require('react');
const introActivity = { ...activities[0], intro: 'Una introducció exclusiva.', description: 'Descripció completa exclusiva.' };
const introItem = model.toActivityBrowserItems([introActivity], now)[0];
check('Intro survives browser serialization', model.toActivityCardData(JSON.parse(JSON.stringify(introItem))).intro, introActivity.intro);
for (const query of ['INTRODUCCIO EXCLUSIVA', 'DESCRIPCIO COMPLETA'])
  check(`Search includes ${query}`, model.activitySearchText(introItem).includes(model.normalizeActivitySearch(query)), true);
const cardHtml = renderToStaticMarkup(createElement(ActivityCard, { activity: introActivity, now }));
check('Card shows intro', cardHtml.includes(introActivity.intro), true);
check('Card omits full description', cardHtml.includes(introActivity.description), false);
check('Card image precedes header', cardHtml.indexOf('<img ') < cardHtml.indexOf('data-slot="card-header"'), true);
check('Local card image uses Next optimizer', cardHtml.match(/<img\b[^>]*>/)?.[0].includes('/_next/image?url=%2Fmonestir-montserrat.webp'), true);
for (const content of [undefined, { mainImage: { url: '', alt: '' } }]) {
  const html = renderToStaticMarkup(createElement(ActivityCard, { activity: { ...introActivity, content }, now }));
  const img = html.match(/<img\b[^>]*>/)?.[0] ?? '';
  check('Missing/unusable image uses local placeholder', img.includes('/_next/image?url=%2Factivity-default.webp'), true);
  check('Placeholder is decorative', img.includes('alt=""'), true);
}
const sanityMainImage = { alt: 'Monestir de Montserrat', sanity: {
  asset: { _ref: 'image-2ae1e4a7fba553be8d8ffe13c3fa13f96c056642-1920x864-webp' },
  crop: { top: 0.05, bottom: 0.05, left: 0.1, right: 0.1 },
  hotspot: { x: 0.75, y: 0.5, width: 0.25, height: 0.5 },
} };
const imageActivity = { ...introActivity, content: { mainImage: sanityMainImage, images: [sanityMainImage] } };
const imageItem = JSON.parse(JSON.stringify(model.toActivityBrowserItems([imageActivity], now)[0]));
const imageCard = model.toActivityCardData(imageItem);
check('Browser preserves all main image metadata without gallery', imageCard.content, { mainImage: sanityMainImage });
const sanityHtml = renderToStaticMarkup(createElement(ActivityCard, { activity: imageCard, now }));
const sanityImg = sanityHtml.match(/<img\b[^>]*>/)?.[0] ?? '';
check('Sanity card uses direct CDN', sanityImg.includes('src="https://cdn.sanity.io/images/'), true);
check('Sanity card bypasses Next/Vercel image optimizer', sanityImg.includes('/_next/image'), false);
check('Sanity responsive variants request automatic format', sanityImg.includes('srcSet="') && sanityImg.includes('auto=format'), true);
check('Sanity image applies crop/hotspot', sanityImg.includes('rect='), true);
check('Card keeps editorial image alt', sanityImg.includes('alt="Monestir de Montserrat"'), true);
for (const intro of [undefined, null, '', ' \n ', 123])
  check('Local adapter requires meaningful intro', activityFromLocal({ ...introActivity, intro }), null);
check('Local adapter trims intro', activityFromLocal({ ...introActivity, intro: ' Breu. ' }).intro, 'Breu.');
process.env.AGENDA_VERIFY = 'detail';
const ActivityPage = require(path.join(root, 'app/(site)/(public)/agenda/activity/[slug]/page.tsx')).default;
const detailActivity = await service.getActivityBySlug('verify-2');
const detailHtml = renderToStaticMarkup(await ActivityPage({ params: Promise.resolve({ slug: detailActivity.slug }) }));
check('Detail header shows intro', detailHtml.match(/<header[^>]*>(.*?)<\/header>/s)?.[1].includes(detailActivity.intro), true);
check('Detail retains complete description', detailHtml.includes(detailActivity.description), true);
for (const url of ['https://amicsdenuria.com/', 'https://example.org/inscripcio']) {
  const anchor = [...detailHtml.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag).find((tag) => tag.includes(`href="${url}"`));
  check('Activity external website opens separate tab', anchor?.includes('target="_blank"'), true);
  check('Activity external website isolates opener', anchor?.includes('rel="noopener noreferrer"'), true);
}
check('Internal back link stays in current tab', detailHtml.match(/<a\b[^>]*href="\/agenda"[^>]*>/)?.[0].includes('target="_blank"'), false);
for (const family of ['preview', 'archive']) {
  for (const count of [0, 1, 6, 8]) {
    process.env.AGENDA_VERIFY = `${family}-${count}`;
    const html = renderToStaticMarkup(await AgendaPage());
    const id = family === 'preview' ? 'activities' : 'archive';
    const section = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>(.*?)</section>`))?.[1] ?? '';
    check(`${family}-${count} cap`, (section.match(/href="\/agenda\/activity\//g) ?? []).length, Math.min(count, 6));
    check(`${family}-${count} period CTA`, section.includes(`period=${family === 'preview' ? 'upcoming' : 'archived'}`), count > 0);
    const links = [...html.matchAll(/href="(\/agenda\/activity\/[^"]+)"/g)].map((match) => match[1]);
    check(`${family}-${count} deduplication`, new Set(links).size, links.length);
    const all = model.toActivityBrowserItems(await service.getActivities(), service.getAgendaNow());
    check(`${family}-${count} full listing`, all.length, family === 'preview' ? count + 2 : count);
  }
}
for (const [scenario, count] of [['same-highlight', 1], ['archive-featured', 7], ['empty', 0]]) {
  process.env.AGENDA_VERIFY = scenario;
  const html = renderToStaticMarkup(await AgendaPage());
  const links = [...html.matchAll(/href="(\/agenda\/activity\/[^"]+)"/g)].map((match) => match[1]);
  check(`${scenario} visible cards`, links.length, count);
  check(`${scenario} no duplicates`, new Set(links).size, links.length);
  check(`${scenario} primary CTA`, html.includes('href="/agenda/activitats"'), true);
}
process.env.AGENDA_VERIFY = 'calendar';
const calendar = await service.getActivities();
for (const [clock, archived, finished] of [
  ['2026-10-08T23:59:59+02:00', ['verify-7'], ['verify-2', 'verify-6', 'verify-7']],
  ['2026-10-09T00:00:00+02:00', ['verify-1', 'verify-2', 'verify-6', 'verify-7'], ['verify-1', 'verify-2', 'verify-6', 'verify-7']],
  ['2026-10-09T01:00:00+02:00', ['verify-1', 'verify-2', 'verify-6', 'verify-7'], ['verify-1', 'verify-2', 'verify-4', 'verify-6', 'verify-7']],
]) {
  check(`Archive ${clock}`, calendar.filter((activity) => selectors.isActivityArchived(activity, new Date(clock))).map(({ slug }) => slug), archived);
  check(`Completion ${clock}`, calendar.filter((activity) => selectors.getActivityDisplayStatus(activity, new Date(clock)) === 'finished').map(({ slug }) => slug), finished);
}
for (const [start, before, after] of [
  ['2026-03-29T10:00:00+02:00', '2026-03-29T23:59:59+02:00', '2026-03-30T00:00:00+02:00'],
  ['2026-10-25T10:00:00+01:00', '2026-10-25T23:59:59+01:00', '2026-10-26T00:00:00+01:00'],
]) {
  const activity = { ...calendar[0], schedule: { startDate: new Date(start) } };
  check('DST before midnight', selectors.isActivityArchived(activity, new Date(before)), false);
  check('DST after midnight', selectors.isActivityArchived(activity, new Date(after)), true);
}
process.env.AGENDA_VERIFY = 'spirit';
const spirit = await service.getCurrentSpiritActivity();
check('Exact selected edition survives later dates', [spirit.id, spirit.slug, spirit.status], ['verify-1', 'verify-1', 'scheduled']);
for (const scenario of ['spirit-missing', 'spirit-unmarked', 'spirit-invalid']) {
  process.env.AGENDA_VERIFY = scenario;
  check(`${scenario} has no automatic fallback`, await service.getCurrentSpiritActivity(), null);
}
process.env.AGENDA_VERIFY = 'empty';
check('Missing spirit edition', await service.getCurrentSpiritActivity(), null);
process.env.NODE_ENV = 'production';
check('Production ignores fixture clock', service.getAgendaNow().getTime() === new Date(process.env.AGENDA_VERIFY_NOW).getTime(), false);
check('Production ignores empty fixtures', (await service.getActivities()).length, 6);
console.log(`PASS ${passed} domain/render assertions; FAIL 0`);
