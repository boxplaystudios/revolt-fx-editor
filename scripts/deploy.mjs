// Copies the build (`dist/`) into the boxplay repo's dev server, which serves it to the games at
// http://localhost:9998/fx-editor/. Replaces the folder there.
//
//   npm run deploy                        # builds, then copies to ../boxplay
//   npm run deploy -- /path/to/boxplay    # another boxplay checkout
//   BOXPLAY_REPO=/path/to/boxplay npm run deploy
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(root, process.argv[2] || process.env.BOXPLAY_REPO || '../boxplay');
const publicDir = resolve(repo, 'packages/dev-server/bin/public');
const target = resolve(publicDir, 'fx-editor');
const dist = resolve(root, 'dist');

if (!existsSync(resolve(dist, 'index.html'))) {
  console.error(`No build in ${dist}: run \`npm run build\` first.`);
  process.exit(1);
}
// Only ever replace the folder inside a real dev server checkout.
if (!existsSync(publicDir)) {
  console.error(`Not a boxplay repo: ${publicDir} does not exist.\nPass the repo path: npm run deploy -- /path/to/boxplay`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(dist, target, { recursive: true });
console.log(`Deployed ${dist} -> ${target}`);
