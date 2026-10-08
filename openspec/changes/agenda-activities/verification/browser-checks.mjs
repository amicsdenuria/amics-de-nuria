// Use an existing development server; no remote writes or test framework.
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.AGENDA_PLAYWRIGHT_DIR || 'playwright');
const base = process.env.AGENDA_VERIFY_URL || 'http://localhost:3100';
const scenario = process.argv[2] || 'browser';
const rollout = process.argv.includes('--rollout');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.setDefaultTimeout(15000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
let passed = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); passed++; };
const go = async (url) => {
  const response = await page.goto(`${base}${url}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  check(`${url} HTTP`, response.status(), 200);
  await page.waitForFunction(() => {
    const menu = document.querySelector('button[aria-label="Obrir menú de navegació"]');
    return menu && Object.keys(menu).some((key) => key.startsWith('__reactProps'));
  });
  if (url.startsWith('/agenda/activitats')) {
    await page.getByLabel('Cerca activitats', { exact: true }).waitFor();
    // SSR controls become visible before React attaches their event handlers.
    await page.waitForFunction(() => Object.keys(document.querySelector('#activity-search'))
      .some((key) => key.startsWith('__reactProps')));
  } else if (url.startsWith('/agenda/activity/')) {
    await page.locator('h1').waitFor();
    await page.locator('aside[aria-labelledby="activity-information"]').waitFor();
  }
};
const cards = () => page.locator('#activity-results a[href^="/agenda/activity/"]');
const slugs = async () => cards().evaluateAll((links) => links.map((link) => link.getAttribute('href').split('/').at(-1)));
const count = async (expected) => {
  try { await page.waitForFunction((n) => document.querySelectorAll('#activity-results a[href^="/agenda/activity/"]').length === n, expected); }
  catch (error) {
    console.error({ passed, expected, actual: await cards().count(), query: await page.locator('#activity-search').inputValue(), errors });
    throw error;
  }
  check('Result count', await cards().count(), expected);
  check('Accessible result counter', (await page.locator('form [role="status"]').innerText()).startsWith(`${expected} `), true);
};
const clear = async () => { await page.getByRole('button', { name: 'Neteja els filtres' }).click(); };
const choose = async (label, value) => { await page.getByLabel(label, { exact: true }).selectOption(value); };
const evidence = path.join(process.cwd(), '.next/agenda-verification');
fs.mkdirSync(evidence, { recursive: true });
try {
  await go('/agenda/activitats');
  await page.getByLabel('Cerca activitats', { exact: true }).waitFor();
  if (scenario === 'browser') {
    await count(8);
    check('All ordered, no omissions', await slugs(), ['verify-7', 'verify-3', 'verify-2', 'verify-4', 'verify-5', 'verify-6', 'verify-1', 'verify-8']);
    check('Types derived, sorted and deduplicated', await page.locator('#activity-type option').allTextContents(), ['Tots els tipus', 'Astronomia', 'Música', 'Natura']);
    check('One h1', await page.locator('h1').count(), 1);
    check('Metadata title', (await page.title()).includes('Totes les activitats'), true);
    check('Metadata description', await page.locator('meta[name="description"]').getAttribute('content'), 'Troba les activitats dels Amics de Núria. Cerca per nom o lloc i filtra per tipus, estat i període.');
    const interactions = [];
    const watch = (request) => { if (request.url().startsWith(base + '/agenda') && ['document', 'fetch', 'xhr'].includes(request.resourceType())) interactions.push(request.url()); };
    page.on('request', watch);
    const originalURL = page.url();
    for (const [text, expected] of [
      ['MUSICA A NURIA', 'verify-1'], ['  musica  ', 'verify-1'], ['CONSTEL·LACIONS', 'verify-3'],
      ['REFUGI DEL BOSC', 'verify-2'], ['RIBES DE FRESER', 'verify-2'], ['ASSOCIACIO CAMINS', 'verify-5'],
      ['ASTRONOMIA', 'verify-6'], ['ONLINE', 'verify-6'],
    ]) {
      await page.getByLabel('Cerca activitats', { exact: true }).fill(text);
      await count(1); check(`Search ${text}`, await slugs(), [expected]);
    }
    await clear(); await count(8);
    check('Clear restores focus', await page.locator('#activity-search').evaluate((element) => element === document.activeElement), true);
    for (const [status, expected] of [['scheduled', 3], ['full', 1], ['cancelled', 2], ['finished', 2]]) {
      await choose('Estat', status); await count(expected);
    }
    await choose('Període', 'upcoming'); await count(1);
    check('Finished today is upcoming', await slugs(), ['verify-3']);
    await choose('Període', 'archived'); await count(1);
    check('Finished archive', await slugs(), ['verify-1']);
    await choose('Tipus d’activitat', 'verify-new-type'); await count(0);
    check('No-results state', await page.getByText('No hem trobat cap activitat', { exact: true }).isVisible(), true);
    await clear(); await count(8);
    for (const [type, expected] of [['verify-new-type', 1], ['verify-music', 1], ['activity-type-nature', 6]]) {
      // Use the runtime ID for the original reusable nature type.
      const id = type === 'activity-type-nature' ? await page.locator('#activity-type option').filter({ hasText: /^Natura$/ }).getAttribute('value') : type;
      await choose('Tipus d’activitat', id); await count(expected);
    }
    await choose('Estat', 'cancelled'); await count(2);
    await choose('Període', 'upcoming'); await count(1);
    await page.getByLabel('Cerca activitats', { exact: true }).fill('CAMINS'); await count(1);
    check('All four filters combined', await slugs(), ['verify-5']);
    await page.getByLabel('Cerca activitats', { exact: true }).fill('NO-EXISTEIX'); await count(0);
    await clear(); await count(8);
    check('Filtering does not navigate', page.url(), originalURL);
    check('Filtering makes no data requests', interactions.length, 0);
    page.off('request', watch);
    for (const [preset, expected] of [['upcoming', 6], ['archived', 2], ['invalid', 8], ['', 8], ['upcoming&period=archived', 8]]) {
      await go(`/agenda/activitats?period=${preset}`); await count(expected);
      if (expected < 8) { await clear(); await count(8); check('Clear URL preset to all', await page.locator('#activity-period').inputValue(), 'all'); }
    }
    await page.locator('#activity-search').focus();
    for (const id of ['activity-type', 'activity-status', 'activity-period']) {
      await page.keyboard.press('Tab');
      check('Keyboard control order', await page.evaluate(() => document.activeElement.id), id);
      check('Visible focus ring', await page.locator(`#${id}`).evaluate((element) => getComputedStyle(element).boxShadow !== 'none'), true);
    }
    await page.keyboard.press('Shift+Tab');
    check('Reverse keyboard order', await page.evaluate(() => document.activeElement.id), 'activity-status');
    await page.locator('#activity-period').focus();
    await page.keyboard.press('ArrowUp'); await page.keyboard.press('Enter');
    check('Native period keyboard selection', await page.locator('#activity-period').inputValue(), 'all');
    const cancelled = page.locator('#activity-results a[href$="verify-5"]');
    check('Cancelled styling retained', await cancelled.locator('h3').evaluate((element) => getComputedStyle(element).textDecorationLine.includes('line-through')), true);
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      check(`No page overflow at ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      check(`Controls fit at ${width}`, await page.locator('form input, form select').evaluateAll((elements) => elements.every((element) => {
        const box = element.getBoundingClientRect(); return box.width > 0 && box.left >= 0 && box.right <= innerWidth;
      })), true);
      check(`No card overflow at ${width}`, await cards().evaluateAll((links) => links.every((link) => link.scrollWidth <= link.clientWidth + 1)), true);
      await page.screenshot({ path: path.join(evidence, `browser-${width}.png`), fullPage: true, animations: 'disabled' });
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(evidence, `browser-${width}-viewport.png`), animations: 'disabled' });
    }
    for (const slug of ['verify-7', 'verify-3', 'verify-2', 'verify-4', 'verify-5', 'verify-6', 'verify-1', 'verify-8']) {
      await go('/agenda/activitats');
      const link = page.locator(`#activity-results a[href$="/${slug}"]`);
      await link.focus(); await page.keyboard.press('Enter');
      await page.waitForURL(`**/agenda/activity/${slug}`);
      check('Detail is reachable by keyboard', await page.locator('h1').count(), 1);
    }
    await go('/agenda');
    check('Primary CTA enabled', await page.locator('section').filter({ has: page.locator('h1') }).getByRole('link', { name: 'Totes les activitats', exact: true }).getAttribute('href'), '/agenda/activitats');
    for (const [id, preset, expected] of [['activities', 'upcoming', 6], ['archive', 'archived', 2]]) {
      const link = page.locator(`#${id} a[href*="period=${preset}"]`);
      check('Preview CTA enabled', await link.count(), 1);
      await link.click(); await count(expected);
      check('Preview CTA initializes filter', await page.locator('#activity-period').inputValue(), preset);
      await go('/agenda');
    }
  } else if (scenario === 'empty') {
    await count(0);
    check('Empty published dataset', await page.getByText('Encara no hi ha activitats publicades', { exact: true }).isVisible(), true);
    await go('/agenda');
    check('Empty agenda keeps hero', await page.getByRole('heading', { level: 1 }).innerText(), "Agenda d'activitats");
    check('Empty agenda has no card links', await page.locator('a[href^="/agenda/activity/"]').count(), 0);
  } else if (scenario === 'local' || scenario === 'production') {
    await count(6);
    if (scenario === 'production') {
      const requests = [];
      const watch = (request) => { if (request.url().startsWith(base + '/agenda') && ['document', 'fetch', 'xhr'].includes(request.resourceType())) requests.push(request.url()); };
      page.on('request', watch);
      const originalURL = page.url();
      await page.getByLabel('Cerca activitats', { exact: true }).fill('ONLINE'); await count(1);
      await choose('Estat', 'scheduled'); await count(1);
      await choose('Període', 'upcoming'); await count(1);
      await clear(); await count(6);
      check('Production filtering stays on the page', page.url(), originalURL);
      check('Production filtering needs no data requests', requests, []);
      page.off('request', watch);
    }
    await go('/agenda/activity/sortida-familiar-a-nuria');
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      check(`Detail overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      const images = page.locator('img[alt="Vista panoràmica de la Vall de Núria"]');
      await images.evaluateAll((elements) => Promise.all(elements.map((element) => element.decode())));
      check('Local detail image optimized and loaded', await images.evaluateAll((elements) => elements.length > 0 && elements.every((element) => element.naturalWidth > 0 && element.currentSrc.includes('/_next/image'))), true);
    }
    const response = await page.goto(`${base}/agenda/activity/does-not-exist`, { waitUntil: 'domcontentloaded' });
    check('Unknown activity HTTP 404', response.status(), 404);
    await page.getByText('Aquesta pàgina no existeix', { exact: true }).waitFor();
    check('Unknown activity public not-found', await page.getByText('Aquesta pàgina no existeix', { exact: true }).isVisible(), true);
  } else if (scenario === 'calendar' || scenario === 'calendar-next') {
    await count(7);
    await choose('Període', 'archived');
    await count(scenario === 'calendar' ? 1 : 4);
    const registrations = scenario === 'calendar' ? [3, 4, 6] : [3];
    for (let number = 1; number <= 7; number++) {
      await go(`/agenda/activity/verify-${number}`);
      check(`Registration eligibility ${number}`, await page.getByRole('link', { name: 'Inscripció externa' }).count(), registrations.includes(number) ? 1 : 0);
      if (number === 4) {
        const labels = await page.locator('aside dt').allTextContents();
        check('Duration without invented end', labels.includes('Fi'), false);
        check('Duration field exists', labels.includes('Durada'), true);
      }
    }
  } else if (scenario === 'detail') {
    await count(7);
    for (const [slug, registered, status] of [
      ['verify-1', false, 'Agendada'], ['verify-2', true, 'Agendada'], ['detail-full', true, 'Completa'],
      ['detail-cancelled', false, 'Cancel·lada'], ['detail-finished', false, 'Finalitzada'],
      ['detail-archived', false, 'Finalitzada'], ['detail-empty', false, 'Agendada'],
    ]) {
      await go(`/agenda/activity/${slug}`);
      check('One detail h1', await page.locator('h1').count(), 1);
      check('Detail status', await page.locator('header [data-slot="badge"]').last().innerText(), status);
      check('Detail registration', await page.getByRole('link', { name: 'Inscripció externa' }).count(), registered ? 1 : 0);
      check('Detail metadata', (await page.title()).includes(await page.locator('h1').innerText()), true);
      check('Decorative practical icons', await page.locator('aside svg').evaluateAll((icons) => icons.every((icon) => icon.getAttribute('aria-hidden') === 'true')), true);
      if (slug === 'verify-1' || slug === 'detail-empty') {
        check('Missing requirements omitted', await page.locator('#activity-requirements').count(), 0);
        check('Missing gallery omitted', await page.locator('#activity-gallery').count(), 0);
        check('No empty image source', await page.locator('img[src=""]').count(), 0);
      } else {
        check('Only usable gallery images', await page.locator('section[aria-labelledby="activity-gallery"] img').count(), 2);
        check('Full requirements visible', await page.getByText('Calçat de muntanya', { exact: true }).isVisible(), true);
      }
      if (slug === 'detail-cancelled') check('Cancellation reason', await page.getByText('Cancel·lada per pluja.', { exact: true }).isVisible(), true);
      if (registered) check('Registration target', await page.getByRole('link', { name: 'Inscripció externa' }).getAttribute('href'), 'https://example.org/inscripcio');
      for (const width of [360, 768, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        check(`Detail fits ${slug}/${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      }
    }
  }
  if (rollout) {
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 }); await go('/agenda/activitats');
      check(`Footer Agenda link ${width}`, await page.locator('footer').getByRole('link', { name: 'Totes les activitats', exact: true }).getAttribute('href'), '/agenda/activitats');
      await page.getByRole('button', { name: 'Obrir menú de navegació' }).click();
      const menu = page.getByRole('dialog');
      check(`Agenda menu visible ${width}`, await menu.getByRole('button', { name: "Agenda d'activitats" }).isVisible(), true);
      const link = menu.getByRole('link', { name: 'Totes les activitats', exact: true });
      await link.focus(); await page.keyboard.press('Enter');
      await menu.waitFor({ state: 'hidden' });
      check('Menu link works and closes', new URL(page.url()).pathname, '/agenda/activitats');
    }
    await go('/rutes-itineraris');
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      check(`Routes overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    const sanityImages = await page.locator('img').evaluateAll((images) => images.filter((image) => image.src.includes('cdn.sanity.io'))
      .map((image) => ({ src: image.src, srcset: image.srcset })));
    if (sanityImages.length) {
      check('Direct Sanity src and responsive srcSet', sanityImages.every(({ src, srcset }) =>
        !src.includes('/_next/image') && src.includes('auto=format') && srcset.includes('cdn.sanity.io') && /[?&]w=/.test(srcset)), true);
      console.log(`PASS Sanity image routing: ${sanityImages.length} real images inspected on /rutes-itineraris`);
    } else console.log('N/A real Sanity image: none rendered on /rutes-itineraris');
    await page.getByRole('button', { name: 'Obrir menú de navegació' }).click();
    const routesMenu = page.getByRole('dialog');
    await routesMenu.getByRole('button', { name: "Agenda d'activitats" }).click();
    const agendaHome = routesMenu.locator('a[href="/agenda"]');
    check('Discover Agenda from another page', await agendaHome.count(), 1);
    await agendaHome.click(); await page.waitForURL('**/agenda');
    await go('/rutes-itineraris');
    const spiritLinks = page.locator('#sortides-esperit a[href^="/agenda/activity/"]');
    if (scenario === 'spirit' || scenario === 'local') {
      const slug = scenario === 'spirit' ? 'verify-3' : 'sortides-amb-esperit-2027';
      check('Routes latest edition card and both CTAs', await spiritLinks.count(), 3);
      const cardLink = spiritLinks.filter({ has: page.locator('[data-slot="card"]') });
      check('Routes actual latest slug', await cardLink.getAttribute('href'), `/agenda/activity/${slug}`);
      check('Both information CTAs target the detail', await spiritLinks.evaluateAll((links) => new Set(links.map((link) => link.getAttribute('href'))).size), 1);
      await cardLink.focus(); await page.keyboard.press('Enter');
      await page.waitForURL(`**/agenda/activity/${slug}`);
      check('Routes card opens latest detail', await page.locator('h1').count(), 1);
    } else {
      check('Missing spirit has no broken detail link', await spiritLinks.count(), 0);
      check('Missing spirit contact fallback', await page.locator('#sortides-esperit a[href="/contacta"]').count(), 2);
    }
  }
  check('No render/hydration errors', errors, []);
  console.log(`PASS ${passed} browser assertions (${scenario}${rollout ? ', 2D' : ''}); FAIL 0`);
} finally { await browser.close(); }
