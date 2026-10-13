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
