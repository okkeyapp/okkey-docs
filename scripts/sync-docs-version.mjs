#!/usr/bin/env node
// Keeps the published docs line identical to the working copy.
//
// The working copy (`docs/` and the English `current/`) is the only place
// where pages are edited. The published line `v1.0` is a copy of it:
//
//   npm run docs:sync    copy the working copy into version-v1.0
//   npm run docs:check   fail if they differ (runs before every build)
//
// Betas and patches of 1.0.x update v1.0 in place, so the copy is always full.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const VERSION = 'v1.0';
const PAIRS = [
  ['docs', `versioned_docs/version-${VERSION}`],
  [
    'i18n/en/docusaurus-plugin-content-docs/current',
    `i18n/en/docusaurus-plugin-content-docs/version-${VERSION}`,
  ],
];

function listFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const f of listFiles(full)) out.push(path.join(entry.name, f));
    } else {
      out.push(entry.name);
    }
  }
  return out.sort();
}

function diff(src, dst) {
  const a = listFiles(src);
  const b = listFiles(dst);
  const problems = [];
  for (const f of a) {
    if (!b.includes(f)) problems.push(`missing in ${dst}: ${f}`);
    else if (!fs.readFileSync(path.join(src, f)).equals(fs.readFileSync(path.join(dst, f)))) {
      problems.push(`differs: ${f}`);
    }
  }
  for (const f of b) if (!a.includes(f)) problems.push(`extra in ${dst}: ${f}`);
  return problems;
}

const mode = process.argv[2] ?? '--check';
let failed = false;
for (const [srcRel, dstRel] of PAIRS) {
  const src = path.join(root, srcRel);
  const dst = path.join(root, dstRel);
  if (mode === '--write') {
    fs.rmSync(dst, {recursive: true, force: true});
    fs.cpSync(src, dst, {recursive: true});
    console.log(`synced ${srcRel} -> ${dstRel}`);
  } else {
    const problems = diff(src, dst);
    if (problems.length) {
      failed = true;
      console.error(`${dstRel} is not a copy of ${srcRel}:`);
      for (const p of problems) console.error(`  ${p}`);
    }
  }
}
if (failed) {
  console.error('Edit the working copy, then run `npm run docs:sync`.');
  process.exit(1);
}
