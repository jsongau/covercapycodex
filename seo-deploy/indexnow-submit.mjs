#!/usr/bin/env node
/**
 * CoverCapy IndexNow submitter
 * ----------------------------------------------------------------------------
 * Notifies IndexNow-participating engines (Bing, Yandex, Seznam, Naver, and the
 * shared IndexNow endpoint) when URLs are published, materially updated,
 * redirected, or deleted. IndexNow does NOT submit to Google. Google discovers
 * changes through the sitemap and Search Console.
 *
 * Designed for CoverCapy's Vercel + GitHub setup:
 *   - Reads the IndexNow key from an environment variable (never commit the key).
 *   - Hosts the key verification file at /<key>.txt at the site root.
 *   - Submits only a provided batch of URLs (you decide what changed).
 *   - De-dupes against a local state file so unchanged URLs are not resubmitted
 *     on every build.
 *   - Logs response status and handles errors without failing the build.
 *
 * ----------------------------------------------------------------------------
 * ONE-TIME SETUP
 *   1. Generate a key (32+ hex chars), e.g.:  openssl rand -hex 16
 *   2. In Vercel project settings, add env vars:
 *        INDEXNOW_KEY        = <your key>
 *        INDEXNOW_HOST       = www.covercapy.com           (optional, defaults below)
 *   3. Create the key file so engines can verify ownership. Either:
 *        - commit  public/<key>.txt  whose contents are exactly <key>, OR
 *        - serve it via a Vercel route. The file MUST be reachable at
 *          https://www.covercapy.com/<key>.txt
 *   4. Keep INDEXNOW_KEY out of the repo. It lives only in Vercel env.
 *
 * USAGE
 *   node seo-deploy/indexnow-submit.mjs \
 *     https://www.covercapy.com/benefit-maxing/ \
 *     https://www.covercapy.com/benefit-maxing/smart-timing-protocol/
 *
 *   # or pass a newline-delimited file:
 *   node seo-deploy/indexnow-submit.mjs --file seo-deploy/changed-urls.txt
 *
 *   # force resubmit even if unchanged since last run:
 *   node seo-deploy/indexnow-submit.mjs --force https://www.covercapy.com/benefit-maxing/
 *
 * The FIRST submission after deploying these two pages should include both:
 *   https://www.covercapy.com/benefit-maxing/
 *   https://www.covercapy.com/benefit-maxing/smart-timing-protocol/
 * ----------------------------------------------------------------------------
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const KEY = process.env.INDEXNOW_KEY;
const HOST = process.env.INDEXNOW_HOST || 'www.covercapy.com';
const STATE_PATH = resolve(process.cwd(), 'seo-deploy/.indexnow-state.json');

// IndexNow shared endpoint fans out to all participating engines.
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

function parseArgs(argv) {
  const args = { force: false, urls: [], file: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') args.force = true;
    else if (a === '--file') args.file = argv[++i];
    else if (a.startsWith('http')) args.urls.push(a.trim());
  }
  return args;
}

async function loadState() {
  try {
    if (existsSync(STATE_PATH)) return JSON.parse(await readFile(STATE_PATH, 'utf8'));
  } catch { /* corrupt or missing state is non-fatal */ }
  return {};
}

async function saveState(state) {
  await mkdir(dirname(STATE_PATH), { recursive: true });
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
}

// A stable fingerprint per URL. Replace Date.now() with a real content hash
// (e.g. hash of the built HTML) if you want change-detection by content.
function fingerprint(url, salt) {
  return createHash('sha1').update(url + '|' + (salt || '')).digest('hex').slice(0, 16);
}

async function main() {
  const { force, urls, file } = parseArgs(process.argv);

  let list = [...urls];
  if (file) {
    const raw = await readFile(resolve(process.cwd(), file), 'utf8');
    list.push(...raw.split('\n').map(s => s.trim()).filter(s => s.startsWith('http')));
  }
  list = [...new Set(list)]; // de-dupe within the batch

  if (!KEY) {
    console.error('[indexnow] INDEXNOW_KEY is not set. Skipping submission (no failure).');
    process.exit(0);
  }
  if (list.length === 0) {
    console.error('[indexnow] No URLs provided. Pass URLs or --file <path>.');
    process.exit(0);
  }

  // Validate host match: IndexNow requires all URLs share the declared host.
  const mismatched = list.filter(u => {
    try { return new URL(u).host !== HOST; } catch { return true; }
  });
  if (mismatched.length) {
    console.error('[indexnow] These URLs do not match host ' + HOST + ':');
    mismatched.forEach(u => console.error('  ' + u));
    process.exit(1);
  }

  // Skip URLs already submitted with the same fingerprint, unless --force.
  const state = await loadState();
  const buildSalt = process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now());
  const toSubmit = force
    ? list
    : list.filter(u => state[u]?.fingerprint !== fingerprint(u, buildSalt));

  if (toSubmit.length === 0) {
    console.log('[indexnow] Nothing changed since last run. Use --force to resubmit.');
    process.exit(0);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: toSubmit
  };

  console.log(`[indexnow] Submitting ${toSubmit.length} URL(s) to ${ENDPOINT}`);
  toSubmit.forEach(u => console.log('  ' + u));

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const body = await res.text().catch(() => '');
    console.log(`[indexnow] Response: ${res.status} ${res.statusText} ${body ? '- ' + body : ''}`);

    // IndexNow returns 200 (accepted) or 202 (accepted, pending). Treat both as success.
    if (res.status === 200 || res.status === 202) {
      for (const u of toSubmit) state[u] = { fingerprint: fingerprint(u, buildSalt), at: new Date().toISOString() };
      await saveState(state);
      console.log('[indexnow] State updated.');
    } else {
      console.error('[indexnow] Non-success status. State not updated so the next run retries.');
      // Do not throw: a failed ping should not break the deploy.
    }
  } catch (err) {
    console.error('[indexnow] Request failed:', err.message);
    // Swallow the error so CI/CD continues. The next run retries.
  }
}

main();
