// Real Sanity validators, in-memory GROQ and documents; no Content Lake writes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
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
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'localtest';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'localtest';
const sanityRequire = createRequire(require.resolve('sanity'));
const { parse, evaluate } = sanityRequire('groq-js');
const { createSchema, defaultTemplatesForSchema, validateDocument } = require('sanity');
// Sanity 4's validation scheduler calls a window timer even in a Node process.
globalThis.window = { setTimeout, clearTimeout };
const { activity } = require(path.join(root, 'sanity/schemaTypes/agenda/activity.ts'));
const { activityType } = require(path.join(root, 'sanity/schemaTypes/agenda/activityType.ts'));
const { featuredActivity, currentSpiritActivity } = require(path.join(root, 'sanity/schemaTypes/agenda/activitySingletons.ts'));
const { AGENDA_SINGLETON_IDS } = require(path.join(root, 'sanity/agenda.constants.ts'));
const schema = createSchema({ name: 'agenda-verification', types: [activityType, activity, featuredActivity, currentSpiritActivity] });
let documents = [];
const client = {
  config: () => ({ projectId: 'localtest', dataset: 'localtest', apiVersion: '2025-11-29' }),
  withConfig: () => client,
  fetch: async (query, params) => (await evaluate(parse(query), { dataset: documents, params })).get(),
};
const workspace = { schema, getClient: () => client };
const errors = async (document) => (await validateDocument({ document, workspace,
  getDocumentExists: async ({ id }) => documents.some((item) => item._id === id),
})).filter((marker) => marker.level === 'error');
let passed = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); passed++; };
const type = { _id: 'activity-type-nature', _type: 'activityType', name: 'Natura', slug: { _type: 'slug', current: 'nature' } };
const base = {
  _id: 'spirit-a', _type: 'activity', title: 'Sortida amb l’Esperit', description: 'Una edició.',
  slug: { _type: 'slug', current: 'spirit-a' }, type: { _type: 'reference', _ref: type._id },
  isSpiritActivity: true, status: 'scheduled', schedule: { startDate: '2027-01-10T09:00:00+01:00' },
  location: { name: 'Núria', isOnline: false }, organizer: { name: 'Amics de Núria' }, price: { isFree: true },
};
const later = { ...base, _id: 'spirit-z', slug: { _type: 'slug', current: 'spirit-z' }, schedule: { startDate: '2028-01-10T09:00:00+01:00' } };
documents = [type, base, later];
check('Minimal activity', await errors(base), []);
check('Separate later edition with same title', await errors(later), []);
for (const key of ['title', 'description', 'slug', 'type', 'status', 'schedule', 'location', 'organizer', 'price']) {
  const incomplete = structuredClone(base); delete incomplete[key];
  check(`Required ${key}`, (await errors(incomplete)).length > 0, true);
}
for (const [name, change] of [
  ['Blank title', { title: '  ' }], ['Blank description', { description: '  ' }],
  ['Unknown status', { status: 'finished' }], ['Unresolved type', { type: { _type: 'reference', _ref: 'missing' } }],
  ['Missing start', { schedule: {} }], ['Invalid start', { schedule: { startDate: 'bad' } }],
  ['Equal end', { schedule: { ...base.schedule, endDate: base.schedule.startDate } }],
  ['Earlier end', { schedule: { ...base.schedule, endDate: '2026-01-10T09:00:00+01:00' } }],
  ['Invalid end', { schedule: { ...base.schedule, endDate: 'bad' } }],
  ['Wrong duration', { schedule: { ...base.schedule, endDate: '2027-01-10T10:00:00+01:00', durationMinutes: 59 } }],
  ['Zero duration', { schedule: { ...base.schedule, durationMinutes: 0 } }],
  ['Fractional duration', { schedule: { ...base.schedule, durationMinutes: 1.5 } }],
  ['Participant bounds', { participants: { minParticipants: 10, maxParticipants: 2 } }],
  ['Negative participants', { participants: { minParticipants: -1 } }],
  ['Fractional participants', { participants: { maxParticipants: 1.5 } }],
  ['Age bounds', { requirements: { minAge: 20, maxAge: 10 } }],
  ['Negative age', { requirements: { minAge: -1 } }],
  ['Unknown level', { requirements: { level: 'expert' } }],
  ['Paid missing amount', { price: { isFree: false } }],
  ['Paid negative', { price: { isFree: false, amount: -1 } }],
  ['Paid infinite', { price: { isFree: false, amount: Infinity } }],
  ['Missing online flag', { location: { name: 'Núria' } }],
  ['Blank location', { location: { name: ' ', isOnline: true } }],
  ['Blank organizer', { organizer: { name: ' ' } }],
  ['Missing free flag', { price: {} }],
  ['Invalid registration', { registration: { registrationUrl: 'ftp://example.org' } }],
  ['Invalid organizer URL', { organizer: { name: 'Amics', organizerUrl: 'javascript:alert(1)' } }],
]) check(name, (await errors({ ...base, ...change })).length > 0, true);
for (const [name, change] of [
  ['Matching end/duration', { schedule: { ...base.schedule, endDate: '2027-01-10T10:00:00+01:00', durationMinutes: 60 } }],
  ['DST elapsed minutes', { schedule: { startDate: '2027-03-28T01:30:00+01:00', endDate: '2027-03-28T03:30:00+02:00', durationMinutes: 60 } }],
  ['Equal participant/age bounds', { participants: { minParticipants: 2, maxParticipants: 2 }, requirements: { minAge: 12, maxAge: 12 } }],
  ['Paid zero', { price: { isFree: false, amount: 0 } }],
  ['Free hidden stale amount', { price: { isFree: true, amount: -5 } }],
  ['Online physical fields optional', { location: { name: 'Zoom', isOnline: true } }],
  ['Full registration URL', { status: 'full', registration: { registrationUrl: 'https://example.org/book' } }],
  ['Cancelled without optional metadata', { status: 'cancelled' }],
]) check(name, await errors({ ...base, ...change }), []);
const imageId = 'image-0123456789abcdef0123456789abcdef01234567-800x600-jpg';
documents.push({ _id: imageId, _type: 'sanity.imageAsset' });
const image = { _type: 'image', asset: { _type: 'reference', _ref: imageId }, alt: 'La vall de Núria' };
const gallery = Array.from({ length: 11 }, (_, n) => {
  const id = `image-${n.toString(16).padStart(40, '0')}-800x600-jpg`;
  documents.push({ _id: id, _type: 'sanity.imageAsset' });
  return { ...image, _key: `${n}`, asset: { _type: 'reference', _ref: id }, alt: `Vista ${n}` };
});
check('Image with alt', await errors({ ...base, content: { mainImage: image } }), []);
for (const mainImage of [{ _type: 'image' }, { ...image, alt: undefined }, { ...image, alt: ' ' }])
  check('Image must have asset and alt', (await errors({ ...base, content: { mainImage } })).length > 0, true);
check('Ten gallery entries', await errors({ ...base, content: { images: gallery.slice(0, 10) } }), []);
check('Gallery over ten', (await errors({ ...base, content: { images: gallery } })).length > 0, true);
check('Duplicate gallery entries', (await errors({ ...base, content: { images: [{ ...image, _key: 'a' }, { ...image, _key: 'b' }] } })).length > 0, true);
check('Duplicate asset with different alt', (await errors({ ...base, content: { images: [{ ...image, _key: 'a' }, { ...image, _key: 'b', alt: 'Una altra descripció' }] } })).length > 0, true);
check('Empty optional gallery', await errors({ ...base, content: { images: [] } }), []);
for (const definition of [featuredActivity, currentSpiritActivity]) {
  const name = definition.name, id = AGENDA_SINGLETON_IDS[name];
  const singleton = { _id: id, _type: name, [name]: { _type: 'reference', _ref: base._id } };
  check(`${name} valid`, await errors(singleton), []);
  check(`${name} draft ID valid`, await errors({ ...singleton, _id: `drafts.${id}` }), []);
  check(`${name} arbitrary ID rejected`, (await errors({ ...singleton, _id: `${id}-2` })).length > 0, true);
  check(`${name} missing selection`, (await errors({ _id: id, _type: name })).length > 0, true);
  check(`${name} unresolved reference`, (await errors({ ...singleton, [name]: { _type: 'reference', _ref: 'missing' } })).length > 0, true);
  check(`${name} strong reference`, definition.fields[0].weak, false);
  check(`${name} no inline creation`, definition.fields[0].options.disableNew, true);
}
const current = { _id: 'currentSpiritActivity', _type: 'currentSpiritActivity', currentSpiritActivity: { _type: 'reference', _ref: base._id } };
documents.push(current);
check('Published later edition does not change pointer', documents.find((item) => item._id === current._id).currentSpiritActivity._ref, base._id);
documents.push({ ...base, _id: `drafts.${base._id}`, isSpiritActivity: false });
check('Draft with removed marker rejected', (await errors(current)).length > 0, true);
documents = documents.filter((item) => item._id !== `drafts.${base._id}`);
documents = documents.map((item) => item._id === base._id ? { ...item, isSpiritActivity: false } : item);
check('Published unmarked reference rejected', (await errors(current)).length > 0, true);
check('Picker filters by marker', currentSpiritActivity.fields[0].options.filter, 'isSpiritActivity == true');
const seeds = fs.readFileSync(path.join(root, 'sanity/seed/activity-types.ndjson'), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const { localActivityTypes } = require(path.join(root, 'content/agenda/data/activityTypes.ts'));
check('Nine unique deterministic seeds', [seeds.length, new Set(seeds.map((seed) => seed._id)).size], [9, 9]);
check('Seeds match local types', seeds.map((seed) => ({ id: seed._id, name: seed.name, slug: seed.slug.current })), localActivityTypes);
documents = seeds;
for (const seed of seeds) check(`Seed ${seed._id}`, await errors(seed), []);
check('Blank type name rejected', (await errors({ ...type, name: ' ' })).length > 0, true);
check('Missing type slug rejected', (await errors({ ...type, slug: undefined })).length > 0, true);
documents.push({ ...type, _id: 'another-type' });
check('Duplicate type slug rejected', (await errors(type)).length > 0, true);
documents = [type, base, { ...later, slug: base.slug }];
check('Duplicate activity slug rejected', (await errors(base)).length > 0, true);
const config = require(path.join(root, 'sanity.config.ts')).default;
const studioSchema = createSchema({ name: 'studio-verification', types: config.schema.types });
const studio = { ...workspace, schema: studioSchema,
  templates: config.schema.templates(defaultTemplatesForSchema(studioSchema)),
  i18n: { currentLocale: { id: 'ca-ES', title: 'Català' }, t: (key) => key },
  document: { resolveNewDocumentOptions: ({ schemaType }) => studio.templates
    .filter((template) => template.schemaType === schemaType)
    .map((template) => ({ id: template.id, templateId: template.id })) },
};
const { createStructureBuilder } = require('sanity/structure');
const { structure } = require(path.join(root, 'sanity/structure/structure.ts'));
const builder = createStructureBuilder({ source: studio, perspectiveStack: ['published'] });
const tree = structure(builder, studio).serialize();
const schemaName = (item) => typeof item.schemaType === 'string' ? item.schemaType : item.schemaType?.name;
check('Seccions order with separate highlights and subscriptions', tree.items.map((item) =>
  item.type === 'divider' ? 'divider' : item.title),
  ['Rutes i itineraris', 'Agenda', 'divider', 'Destacats', 'divider', 'Subscripcions']);
const agenda = tree.items.find((item) => item.title === 'Agenda').child;
check('Agenda separates activity and editable type management', agenda.items.map((item) =>
  item.type === 'divider' ? 'divider' : schemaName(item)), ['activity', 'divider', 'activityType']);
const highlights = tree.items.find((item) => item.title === 'Destacats').child;
check('Destacats contains the three ordered singletons', highlights.items.map(schemaName),
  ['currentRoute', 'currentSpiritActivity', 'featuredActivity']);
check('No singleton remains directly under Seccions', tree.items.some((item) =>
  ['currentRoute', 'currentSpiritActivity', 'featuredActivity'].includes(schemaName(item))), false);
for (const name of ['featuredActivity', 'currentSpiritActivity']) {
  const pane = highlights.items.find((item) => schemaName(item) === name).child;
  check(`${name} fixed document pane`, pane.options.id, AGENDA_SINGLETON_IDS[name]);
}
check('Current route ID preserved', highlights.items.find((item) => schemaName(item) === 'currentRoute').child.options.id, 'currentRoute-3');
const templates = ['activity', 'activityType', 'featuredActivity', 'currentSpiritActivity', 'currentRoute', 'subscriber', 'subscription']
  .map((schemaType) => ({ id: schemaType, templateId: schemaType, schemaType }));
check('Singleton templates removed', config.schema.templates(templates).map((item) => item.schemaType),
  ['activity', 'activityType', 'subscriber', 'subscription']);
for (const type of ['global', 'structure', 'document']) {
  const options = config.document.newDocumentOptions(templates, { creationContext: { type, schemaType: 'activity' } });
  check(`No singleton creation in ${type}`, options.some((item) => item.templateId === 'currentSpiritActivity' || item.templateId === 'featuredActivity' || item.templateId === 'currentRoute'), false);
}
const actions = ['publish', 'unpublish', 'duplicate', 'delete'].map((action) => ({ action }));
for (const schemaType of ['currentRoute', 'featuredActivity', 'currentSpiritActivity'])
  check(`${schemaType} no delete/duplicate`, config.document.actions(actions, { schemaType }).map((item) => item.action), ['publish', 'unpublish']);
check('Activities retain regular actions', config.document.actions(actions, { schemaType: 'activity' }), actions);
const oldSchema = JSON.parse(execFileSync('git', ['show', 'HEAD:schema.json'], { encoding: 'utf8' }));
const newSchema = JSON.parse(fs.readFileSync(path.join(root, 'schema.json'), 'utf8'));
for (const definition of oldSchema)
  check(`Existing generated schema unchanged: ${definition.name}`, newSchema.find((item) => item.name === definition.name), definition);
const aliases = (source) => new Map(ts.createSourceFile('types.ts', source, ts.ScriptTarget.Latest, true).statements
  .filter(ts.isTypeAliasDeclaration).map((node) => [node.name.text, node.getText()]));
const oldTypes = aliases(execFileSync('git', ['show', 'HEAD:sanity.types.ts'], { encoding: 'utf8' }));
const newTypes = aliases(fs.readFileSync(path.join(root, 'sanity.types.ts'), 'utf8'));
for (const [name, text] of oldTypes)
  if (name !== 'AllSanitySchemaTypes') check(`Existing generated type unchanged: ${name}`, newTypes.get(name), text);
console.log(`PASS: ${passed} schema assertions; no remote requests or writes.`);
