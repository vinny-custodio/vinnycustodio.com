# Vinny Custodio portfolio

A portable website built with plain HTML, CSS, and JavaScript. The files in `dist/` are the editable source and the deployable website. No build step or paid runtime is required.

## Start on another computer or in a cloud workspace

1. Clone https://github.com/vinny-custodio/vinnycustodio.com or extract a recovery ZIP.
2. Open the project folder in any editor or coding assistant.
3. Run `python3 scripts/preview.py` (Windows: `py -3 scripts/preview.py`).
4. Open http://127.0.0.1:4173/ . In a cloud editor, forward port 4173; use `--host 0.0.0.0` only if that environment requires it.

Tell a new assistant: “Read AGENTS.md and docs/PROJECT.md, then work on this portfolio.” No previous Codex conversation is needed.

## Updates and publishing

Edit files in `dist/`, preview locally, and review on mobile and desktop. Push approved changes to GitHub `main`; the existing Cloudflare Pages connection publishes automatically. For review before production, use a separate branch and its Cloudflare preview.

Cloudflare Pages: project `vinnycustodio-com`, production branch `main`, framework None, build command empty, output directory `dist`, root directory the repository root.

Preview site: https://vinnycustodio-com.pages.dev/ . Domain: vinnycustodio.com (migration status is in docs/DEPLOYMENT.md).

## Recovery and backups

- GitHub stores source, assets, instructions, and commit history independently of a Codex account.
- `python3 scripts/backup.py` creates a self-contained ZIP with SHA-256 checksums. Keep a copy somewhere outside this computer, such as your own cloud drive.
- `python3 scripts/verify_backup.py path/to/backup.zip` checks the archive before restoring it.
- To restore without GitHub, extract the ZIP and run the preview. Upload `dist/` to any static host, or create a new repository and connect it to a host.
- Moving Codex accounts does not move access to GitHub, Cloudflare, GoDaddy, or Figma. Sign into those accounts again when needed. No passwords, tokens, or browser sessions belong in this project.

See docs/PROJECT.md for design decisions and file locations; docs/DEPLOYMENT.md for hosting and domain recovery.
