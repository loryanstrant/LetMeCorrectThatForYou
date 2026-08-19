import { readFile, readdir } from 'node:fs/promises';
const manifest = JSON.parse(await readFile(new URL('./content-manifest.json', import.meta.url)));
const files = (await readdir(new URL('../src/content/corrections/', import.meta.url))).filter((file) => file.endsWith('.md'));
const fail = (message) => { console.error(`○ ${message}`); process.exitCode = 1; };
if (manifest.length !== 17) fail(`Expected 17 manifest entries; found ${manifest.length}.`);
if (files.length !== manifest.length) fail(`Expected ${manifest.length} Markdown files; found ${files.length}.`);
const anchors = manifest.map(({ id }) => id);
if (new Set(anchors).size !== anchors.length) fail('Manifest anchors are not unique.');
for (const item of manifest) {
  const path = new URL(`../src/content/corrections/${item.id}.md`, import.meta.url);
  const source = await readFile(path, 'utf8').catch(() => '');
  if (!source) { fail(`Missing ${item.id}.md.`); continue; }
  for (const value of [item.title, item.id, ...item.incorrect, ...item.reason, ...item.notes, ...item.sources.flatMap(({label,url}) => [label,url])]) {
    if (!source.includes(value.replaceAll('"', '\\"')) && !source.includes(value)) fail(`${item.id}.md does not preserve: ${value}`);
  }
}
if (!process.exitCode) console.log(`● Validated ${manifest.length} corrections and ${anchors.length} stable anchors.`);
