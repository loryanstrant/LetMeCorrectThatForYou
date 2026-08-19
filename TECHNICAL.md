# Technical information

## Architecture

The site uses Astro 5 and emits static HTML to `dist/`. Corrections are schema-validated Markdown content under `src/content/corrections/`. The complete directory is present without JavaScript; a small progressive-enhancement script adds A–Z filtering, target highlighting, and clipboard links.

## Local development

Node.js 22 is recommended.

```sh
npm ci
npm run dev
npm run validate
npm run build
npm test
```

## Content model

Each correction contains a correct `title`, immutable `anchor`, one or more exact `incorrect` strings, optional `reasons` and `notes`, and optional authoritative `sources`. `scripts/content-manifest.json` is the migration manifest for the 17 WordPress entries and is used to detect omissions or accidental wording changes.

## Repositories

Gitea (`loryanstrant/LetMeCorrectThatForYou`) is canonical and private. It pushes one-way to the public GitHub repository of the same name. Public issues and contribution intake live on GitHub; code decisions and merges happen on Gitea.

## Azure Static Web Apps

The GitHub mirror is the deployment source because Azure Static Web Apps integrates with GitHub Actions. The workflow builds from `/` and publishes `dist`. Runtime routing and security headers are in `public/staticwebapp.config.json`.

The Azure resource belongs in subscription `9f5d9200-31a1-41d5-afa6-d540a979eabf`, resource group `letmecorrectthatforyou`. Deployment secrets belong in GitHub Actions secrets and must never be committed.

## Future custom-domain cutover

DNS for `www.letmecorrectthatforyou.com` remains on WordPress during this phase. Before cutover:

1. Add and validate the custom domain in Azure Static Web Apps.
2. Reduce the existing DNS record TTL in advance.
3. Verify all 17 historical fragment links on the Azure hostname.
4. Change the `www` record to Azure’s supplied target.
5. Verify TLS, canonical URLs, redirects, and monitoring.
6. Keep the former WordPress origin available until DNS caches expire and rollback is no longer needed.
