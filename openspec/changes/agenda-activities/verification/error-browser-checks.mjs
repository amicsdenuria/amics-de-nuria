// Run against an isolated production server with an intentionally invalid viewer token.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.AGENDA_PLAYWRIGHT_DIR || 'C:/Users/muner/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.AGENDA_VERIFY_URL || 'http://localhost:3101';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 360, height: 900 } });
page.setDefaultTimeout(20000);
let passed = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); passed++; };
try {
  for (const route of ['/agenda', '/agenda/activitats', '/agenda/activity/prova-sortida-amb-l-esperit-segona-edicio', '/rutes-itineraris']) {
    await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
    const retry = page.getByRole('button', { name: 'Torna-ho a provar', exact: true });
    await retry.waitFor();
    check('Error message and retry', await retry.count(), 1);
    check('Failure does not show empty Agenda', await page.locator('#empty-agenda-title').count(), 0);
    check('Failure does not show false 404', await page.getByText('La pàgina que busques no existeix', { exact: true }).count(), 0);
    check('Error layout fits mobile', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const requests = [];
    page.on('request', (r) => { if (r.url().startsWith(base) && r.resourceType() === 'fetch') requests.push(r.url()); });
    await retry.click();
    await page.waitForFunction(() => [...document.querySelectorAll('button')].some((b) => b.textContent === 'Torna-ho a provar' && !b.disabled));
    check('Retry requests fresh server content', requests.length > 0, true);
    check('Persistent failure keeps retry available', await retry.isEnabled(), true);
  }
  console.log(`PASS: ${passed} production read-error/retry assertions; no remote mutations.`);
} finally { await browser.close(); }
