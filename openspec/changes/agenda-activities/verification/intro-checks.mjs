// Exercise real GROQ and Sanity adapters with in-memory content only.
import './schema-checks.mjs';
import assert from 'node:assert/strict';
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
const root = process.cwd();
const { parse, evaluate } = createRequire(require.resolve('sanity'))('groq-js');
const queries = require(path.join(root, 'sanity/lib/agenda/queries.ts'));
const type = { _id: 'type-nature', _type: 'activityType', name: 'Natura', slug: { current: 'nature' } };
const activity = {
  _id: 'intro-activity', _type: 'activity', title: 'Activitat de prova',
  intro: ' Una introducció breu. ', description: 'Una descripció completa i independent.',
  slug: { current: 'intro-activity' }, type: { _ref: type._id },
  status: 'scheduled', isSpiritActivity: true,
  schedule: { startDate: '2027-05-09T09:00:00+02:00' },
  location: { name: 'Núria', isOnline: false }, organizer: { name: 'Amics de Núria' },
  price: { isFree: true },
};
const documents = [type, activity,
  { _id: 'featuredActivity', _type: 'featuredActivity', featuredActivity: { _ref: activity._id } },
  { _id: 'currentSpiritActivity', _type: 'currentSpiritActivity', currentSpiritActivity: { _ref: activity._id } },
];
const run = async (query, params = {}) => (await evaluate(parse(query), { dataset: documents, params })).get();
const livePath = path.join(root, 'sanity/lib/live.ts');
require.cache[livePath] = { id: livePath, filename: livePath, loaded: true, exports: {
  sanityFetch: async ({ query, params }) => ({ data: await run(query, params) }),
} };
const { dataSource } = require(path.join(root, 'config/site.config.ts'));
Object.assign(dataSource.agenda, { activities: 'sanity', featuredActivity: 'sanity', currentSpiritActivity: 'sanity' });
const service = require(path.join(root, 'domain/activity/activity.service.ts'));
const { activityFromSanity, activitiesFromSanity } = require(path.join(root, 'domain/activity/activity.sanity-adapter.ts'));
let passed = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); passed++; };
for (const read of [
  async () => (await service.getActivities())[0],
  () => service.getActivityBySlug(activity.slug.current),
  service.getFeaturedActivity, service.getCurrentSpiritActivity,
]) {
  const result = await read();
  check('Every public read projects and trims intro', result.intro, activity.intro.trim());
  check('Every public read preserves description separately', result.description, activity.description);
}
const raw = (await run(queries.activitiesQuery))[0];
const selectors = require(path.join(root, 'domain/activity/activity.selectors.ts'));
const model = require(path.join(root, 'app/(site)/(public)/agenda/components/activityBrowserModel.ts'));
const { ActivityScheduleDates } = require(path.join(root, 'app/(site)/(public)/agenda/components/ActivityScheduleDates.tsx'));
const { renderToStaticMarkup } = require('react-dom/server');
const { createElement } = require('react');
const renderSchedule = (schedule) => renderToStaticMarkup(createElement(ActivityScheduleDates, { schedule }));
for (const [mode, caption] of [['allDay', 'Tot el dia'], ['pending', 'Horari pendent de confirmar']]) {
  activity.schedule = { mode, startDate: '2027-03-27', endDate: '2027-03-28', durationMinutes: 90 };
  const detail = await service.getActivityBySlug(activity.slug.current);
  const now = new Date('2027-03-28T23:59:59+02:00');
  const listing = model.toActivityBrowserItems(await service.getActivities(), now);
  const card = model.toActivityCardData(JSON.parse(JSON.stringify(listing[0])));
  for (const item of [detail, card]) {
    const html = renderSchedule(item.schedule);
    check('Date range includes schedule caption', html.includes(caption), true);
    check('Date-only schedules omit clock times', /\d\d:\d\d/.test(html), false);
    check('Duration only shown for pending time', item.schedule.durationMinutes, mode === 'pending' ? 90 : undefined);
    check('Active throughout the inclusive last Madrid day', selectors.isActivityFinished(item, now), false);
    check('Archives at next Madrid midnight', selectors.isActivityArchived(item, new Date('2027-03-29T00:00:00+02:00')), true);
  }
}
activity.schedule = { mode: 'pending', startDate: '2027-10-31', durationMinutes: 90 };
let scheduled = await service.getActivityBySlug(activity.slug.current);
check('Single pending day uses singular caption', renderSchedule(scheduled.schedule).includes('Hora pendent de confirmar'), true);
check('Autumn 25-hour day lasts through local evening', selectors.isActivityFinished(scheduled, new Date('2027-10-31T23:59:59+01:00')), false);
activity.schedule = { mode: 'timed', startDate: '2027-10-31T10:30', durationMinutes: 90 };
scheduled = await service.getActivityBySlug(activity.slug.current);
check('Confirming a time enables duration cutoff', selectors.getActivityEndDate(scheduled).toISOString(), '2027-10-31T11:00:00.000Z');
check('Confirmed hour replaces pending caption', renderSchedule(scheduled.schedule).includes('10:30 h'), true);
activity.schedule = { startDate: '2027-06-11T22:00:00Z' };
check('Existing confirmed midnight is displayed', renderSchedule((await service.getActivityBySlug(activity.slug.current)).schedule).includes('00:00 h'), true);
const links = [
  { url: 'https://example.org/mapa', text: 'Mapa del recorregut' },
  { url: 'https://example.org/programa', text: 'Programa' },
];
activity.relatedLinks = [links[0], { url: 'ftp://example.org', text: 'Invàlid' }, { url: links[0].url, text: ' ' }, links[1]];
check('Detail returns valid links in editorial order', (await service.getActivityBySlug(activity.slug.current)).relatedLinks, links);
check('List query omits detail links', 'relatedLinks' in (await run(queries.activitiesQuery))[0], false);
const logs = [];
const originalWarn = console.warn;
console.warn = (...args) => logs.push(args);
try {
  for (const intro of [undefined, null, '', ' \n ', 123]) {
    const invalid = { ...raw, intro };
    check('Sanity adapter rejects missing or malformed intro', activityFromSanity(invalid), null);
    check('Only the invalid activity is discarded', activitiesFromSanity([raw, invalid]).length, 1);
  }
} finally { console.warn = originalWarn; }
check('Intro rejection logs only ID and field names', logs.every(([, data]) =>
  data.id === activity._id && data.fields.join(',') === 'intro'), true);
console.log(`PASS: ${passed} intro GROQ/adapter/service assertions; no remote requests or writes.`);
