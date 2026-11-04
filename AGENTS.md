# Working on this portfolio

Read README.md, docs/PROJECT.md, and docs/DEPLOYMENT.md before editing. This repository is the portable project; do not depend on an old chat, absolute local paths, or a particular Codex account.

- Edit `dist/` directly. It is both source and deploy output. Preserve assets and case-study content unless asked to change them.
- Preview with `python3 scripts/preview.py`. No framework install/build is needed.
- Check the affected flow at mobile and desktop widths. Check dark mode when changing shared UI. Respect reduced motion.
- Bump the relevant asset query version when editing a cached CSS/JS file. Some scripts are loaded dynamically by nav.js.
- Publishing follows the user's current request. “Review first” means provide a preview; an explicit publish request authorizes the normal GitHub-to-Cloudflare flow.
- Never commit credentials, browser/session data, local research exports, .env files, or account configuration. Reconnect integrations through their normal login flow in a new environment.
- Keep Microsoft 365 / Outlook email DNS unchanged when working on the website domain.
- The chat is a curated, browser-only guide. Do not silently replace it with a model, paid service, or privileged tools. Its knowledge includes only approved professional facts.
- Optional chat regression check: `node tests/chat-guide.test.cjs`.
