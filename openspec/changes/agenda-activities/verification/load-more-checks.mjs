// Run against Next with AGENDA_VERIFY=load-more-<count>; no remote writes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.AGENDA_PLAYWRIGHT_DIR || 'playwright');
const base = process.env.AGENDA_VERIFY_URL || 'http://localhost:3100';
const datasetSize = Number(process.argv[2]);
assert.ok([0, 1, 12, 13, 24, 25, 60].includes(datasetSize), 'Supported fixture count');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.setDefaultTimeout(15000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const requests = [];
const watch = (request) => {
  if (request.url().startsWith(`${base}/agenda`) && ['document', 'fetch', 'xhr'].includes(request.resourceType())) requests.push(request.url());
};
let passed = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); passed++; };
const cards = () => page.locator('#activity-results a[href^="/agenda/activity/"]');
const more = () => page.getByRole('button', { name: "Veure'n més", exact: true });
const allNumbers = [
  ...Array.from({ length: Math.min(datasetSize, 37) }, (_, i) => i + 1),
  ...Array.from({ length: Math.max(datasetSize - 37, 0) }, (_, i) => datasetSize - i),
];
const state = async (numbers, total) => {
  await page.waitForFunction((n) => document.querySelectorAll('#activity-results a[href^="/agenda/activity/"]').length === n, numbers.length);
  check('Visible cards in exact order', await cards().evaluateAll((links) => links.map((link) => link.getAttribute('href').split('-').at(-1))), numbers.map(String));
  check('Total matching count remains accurate', await page.locator('form [role="status"]').innerText(), `${total} ${total === 1 ? 'activitat' : 'activitats'} de ${datasetSize}`);
  check('Button only when more matches remain', await more().count(), Number(numbers.length < total));
  if (total > 12) {
    const status = page.locator('#activity-results [role="status"]');
    check('Visible count announcement', await status.innerText(), `Mostrant ${numbers.length} de ${total} activitats`);
    check('Polite live announcement', await status.getAttribute('aria-live'), 'polite');
  }
};
const go = async (suffix = '') => {
  const response = await page.goto(`${base}/agenda/activitats${suffix}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  check('Listing HTTP', response.status(), 200);
  const html = await response.text();
  check('Initial SSR has no more than 12 cards', (html.match(/href="\/agenda\/activity\/verify-\d+"/g) || []).length <= 12, true);
  await page.getByLabel('Cerca activitats', { exact: true }).waitFor();
  await page.waitForFunction(() => Object.keys(document.querySelector('#activity-search')).some((key) => key.startsWith('__reactProps')));
};
const expand = async (numbers, method = 'click') => {
  const before = await cards().count();
  if (method === 'click') await more().click();
  else { await more().focus(); await page.keyboard.press(method); }
  const after = Math.min(before + 12, numbers.length);
  await state(numbers.slice(0, after), numbers.length);
  await page.waitForFunction((id) => document.activeElement?.getAttribute('href') === `/agenda/activity/verify-${id}`, numbers[before]);
  check('Focus reaches first appended card', await page.evaluate(() => document.activeElement.getAttribute('href')), `/agenda/activity/verify-${numbers[before]}`);
};
const revealAll = async (numbers) => {
  let batch = 0;
  while (await more().count()) await expand(numbers, ['Enter', 'Space', 'click'][batch++ % 3]);
  await state(numbers, numbers.length);
};
const clear = async () => {
  await page.getByRole('button', { name: 'Neteja els filtres' }).click();
  await state(allNumbers.slice(0, 12), datasetSize);
  check('Clear returns focus to search', await page.locator('#activity-search').evaluate((element) => element === document.activeElement), true);
};
const choose = async (label, value) => page.getByLabel(label, { exact: true }).selectOption(value);
try {
  await go();
  await state(allNumbers.slice(0, 12), datasetSize);
  if (datasetSize === 0) check('Empty dataset stays accessible', await page.getByText('Encara no hi ha activitats publicades', { exact: true }).isVisible(), true);
  if (datasetSize > 12) {
    check('Button controls results', await more().getAttribute('aria-controls'), 'activity-results');
    await more().focus();
    check('Visible keyboard focus', await more().evaluate((element) => getComputedStyle(element).boxShadow !== 'none'), true);
    await page.evaluate(() => { window.__agendaFirstCard = document.querySelector('#activity-results a'); });
    page.on('request', watch);
    const originalURL = page.url();
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(400);
    await state(allNumbers.slice(0, 12), datasetSize);
    await revealAll(allNumbers);
    check('Existing card DOM is retained', await page.evaluate(() => window.__agendaFirstCard === document.querySelector('#activity-results a')), true);
    check('No duplicate cards', await cards().evaluateAll((links) => new Set(links.map((link) => link.href)).size), datasetSize);
    check('Load more keeps URL', page.url(), originalURL);
    check('Load more makes no data requests', requests, []);
    page.off('request', watch);
  }
  if (datasetSize === 60) {
    page.on('request', watch);
    const originalURL = page.url();
    // Every control must reset the expanded limit, even if it leaves >12 matches.
    await page.getByLabel('Cerca activitats', { exact: true }).fill('prova');
    await state(allNumbers.slice(0, 12), 60);
    await expand(allNumbers);
    await page.getByLabel('Cerca activitats', { exact: true }).fill('PROVA');
    await state(allNumbers.slice(0, 12), 60);
    await revealAll(allNumbers);
    const music = allNumbers.filter((n) => n % 2 === 1);
    await choose('Tipus d’activitat', 'verify-music');
    await state(music.slice(0, 12), 30);
    await revealAll(music);
    const nature = allNumbers.filter((n) => n % 2 === 0);
    const natureId = await page.locator('#activity-type option').filter({ hasText: /^Natura$/ }).getAttribute('value');
    await choose('Tipus d’activitat', natureId);
    await state(nature.slice(0, 12), 30);
    await revealAll(nature);
    await clear();
    await revealAll(allNumbers);
    const scheduled = allNumbers.filter((n) => n <= 37 && (n - 1) % 3 !== 0);
    await choose('Estat', 'scheduled');
    await state(scheduled.slice(0, 12), 24);
    await revealAll(scheduled);
    const full = allNumbers.filter((n) => n <= 37 && (n - 1) % 3 === 0);
    await choose('Estat', 'full');
    await state(full.slice(0, 12), 13);
    await revealAll(full);
    await clear();
    await revealAll(allNumbers);
    const upcoming = allNumbers.filter((n) => n <= 37);
    const archived = allNumbers.filter((n) => n > 37);
    await choose('Període', 'upcoming');
    await state(upcoming.slice(0, 12), 37);
    await revealAll(upcoming);
    await choose('Període', 'archived');
    await state(archived.slice(0, 12), 23);
    await revealAll(archived);
    await clear();
    await revealAll(allNumbers);
    await choose('Estat', 'finished');
    await state(archived.slice(0, 12), 23);
    await choose('Tipus d’activitat', 'verify-music');
    await state(archived.filter((n) => n % 2 === 1), 11);
    await choose('Període', 'archived');
    await state(archived.filter((n) => n % 2 === 1), 11);
    await page.getByLabel('Cerca activitats', { exact: true }).fill('prova 59');
    await state([59], 1);
    await clear();
    // Search must find a card outside the initial batch without first expanding.
    await page.getByLabel('Cerca activitats', { exact: true }).fill('Activitat de prova 60');
    await state([60], 1);
    await page.getByLabel('Cerca activitats', { exact: true }).fill('NO-EXISTEIX');
    await state([], 0);
    check('No results state', await page.getByText('No hem trobat cap activitat', { exact: true }).isVisible(), true);
    await clear();
    check('Filtering and loading preserve URL', page.url(), originalURL);
    check('Filtering and loading make no data requests', requests, []);
    page.off('request', watch);
    for (const [preset, numbers] of [['upcoming', upcoming], ['archived', archived]]) {
      await go(`?period=${preset}`);
      await state(numbers.slice(0, 12), numbers.length);
      await revealAll(numbers);
      await clear();
    }
    const evidence = path.join(process.cwd(), '.next/agenda-verification');
    fs.mkdirSync(evidence, { recursive: true });
    for (const width of [360, 768, 1280]) {
      await go();
      await page.setViewportSize({ width, height: 900 });
      await more().scrollIntoViewIfNeeded();
      check(`No overflow at ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      check(`Button fits at ${width}`, await more().evaluate((element) => {
        const box = element.getBoundingClientRect(); return box.width > 0 && box.left >= 0 && box.right <= innerWidth;
      }), true);
      check(`Grid columns at ${width}`, await cards().first().evaluate((element) => getComputedStyle(element.parentElement).gridTemplateColumns.split(' ').length), width === 360 ? 1 : width === 768 ? 2 : 3);
      await page.screenshot({ path: path.join(evidence, `load-more-${width}.png`), animations: 'disabled' });
      await expand(allNumbers, 'Enter');
      check(`Focus ring on appended card at ${width}`, await page.locator('#activity-results a:focus').evaluate((element) => getComputedStyle(element).boxShadow !== 'none'), true);
    }
    // A card revealed in the last batch keeps its real detail route.
    await revealAll(allNumbers);
    const last = cards().last();
    const href = await last.getAttribute('href');
    await last.focus(); await page.keyboard.press('Enter');
    await page.waitForURL(`${base}${href}`);
    check('Appended card opens its own detail', await page.locator('h1').innerText(), 'Activitat de prova 38');
  }
  check('No render or hydration errors', errors, []);
  console.log(`PASS ${passed} load-more-${datasetSize} browser assertions; FAIL 0`);
} finally { await browser.close(); }
