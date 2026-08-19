# Contributing corrections

Thanks for helping make the internet slightly more precise.

## Suggest without writing code

Open the [suggestion form](https://github.com/loryanstrant/LetMeCorrectThatForYou/issues/new?template=suggest-a-correction.yml). Include the correct term, exact incorrect versions, a brief explanation, and an authoritative source where possible.

## Submit a pull request

Corrections are Markdown files in `src/content/corrections/`. Copy an existing file and follow these rules:

- Use a lowercase, stable filename, such as `powerbi.md`.
- `title` is the correct term and must preserve its exact casing and spacing.
- `anchor` is the permanent direct-link ID. Never change a published anchor.
- `incorrect` contains exact examples. Never normalise their casing; `ClipChamp` and `Clipchamp` are meaningfully different here.
- `reasons` and `notes` are lists so entries can contain short or long explanations.
- `sources` should link to authoritative first-party or dictionary references.
- Keep the tone concise, useful, and playfully direct rather than abusive.

Install Node.js 22, then run:

```sh
npm ci
npm run validate
npm run build
npm test
```

Open the pull request on GitHub. Gitea is the canonical development repository, so accepted public contributions are reviewed and integrated there before the mirror updates.
