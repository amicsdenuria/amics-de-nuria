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
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText, filename);
}
process.env.NODE_ENV = 'development';
process.env.AGENDA_VERIFY_NOW = '2026-10-08T12:00:00+02:00';
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
check('Payload does not include content, requirements or metadata', items.every((item) => !('content' in item) && !('requirements' in item) && !('metadata' in item)), true);
check('Dates are strings at the boundary', items.every((item) => typeof item.schedule.startDate === 'string'), true);
const roundTrip = JSON.parse(JSON.stringify(items));
check('Serialization preserves derived card statuses', roundTrip.map((item) => selectors.getActivityDisplayStatus(model.toActivityCardData(item), now)), items.map((item) => item.displayStatus));
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
