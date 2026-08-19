# Static site migration specification

## Goal

Replace the WordPress site with a fast, accessible Azure Static Web Apps site while preserving all 17 corrections and their historical fragment links.

## Approved experience

- Editorial A–Z directory based on the restrained Segoe UI, blue-grey, square-form visual language from the reference Rufus project.
- The correct term is always the entry heading.
- Incorrect versions are exact, case-sensitive examples beneath the heading; they are never forced to uppercase.
- Content supports one or many incorrect examples, multi-paragraph reasons, notes, and multiple sources.
- Static HTML is complete without JavaScript. JavaScript only enhances filtering and link copying.
- Desktop uses a two-column term/details layout; approximately 380px uses one column without horizontal overflow.
- Direct links retain every existing WordPress anchor and visibly identify the selected entry.
- Suggestions use a non-technical GitHub issue form; direct contributors use pull requests.

## Acceptance criteria

1. All 17 manifest entries build from schema-validated Markdown.
2. Anchors remain: `bluesky`, `clipchamp`, `cloudflare`, `copilot`, `entraid`, `intune`, `on-premises`, `onedrive`, `onenote`, `powerapps`, `powerbi`, `powerfx`, `powerpoint`, `powershell`, `sharepoint`, `team`, and `windowsautopilot`.
3. Filtering is keyboard-operable and selected state is not communicated by colour alone.
4. With JavaScript disabled, every correction and direct fragment remains readable.
5. Gitea remains canonical; GitHub is a public one-way mirror and Azure deployment source.
6. Existing custom-domain DNS is not changed in this phase.

## Non-goals

- A CMS or runtime database
- Recreating the WordPress suggestion form
- Custom-domain cutover
- A separate mobile application
