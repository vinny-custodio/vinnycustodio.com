# Vinny Custodio portfolio

Plain HTML, CSS, and JavaScript. There is no framework, build step, or required hosting provider.

## Local preview

From this folder:

```sh
ruby -run -e httpd dist -p 4173
```

Then open `http://127.0.0.1:4173`.

## Hosting

Deploy the contents of `dist/` to any static host. The site uses directory-based routes such as `melon-trains/index.html`, so the host should serve `index.html` for directory URLs.

### GitHub and Cloudflare Pages

Recommended repository name: `vinny-portfolio`, private visibility.

Upload this project's website files (`dist/`, `README.md`, and `.gitignore`) to the repository. Do not upload the parent workspace, research files, exports, or `.openai/` configuration.

In Cloudflare Pages, connect the GitHub repository with these settings:

- Production branch: `main`
- Framework preset: None
- Build command: leave empty
- Build output directory: `dist`
- Root directory: repository root

Review the generated preview before connecting `vinnycustodio.com`. Add the domain through Pages Custom domains. For the root domain, configure Cloudflare DNS and preserve existing email DNS records. Domain registration can stay with the current registrar.

Future pushes to `main` publish updates automatically. Use a separate branch to review changes in a preview before merging.

The `.openai/hosting.json` file only records the earlier private ChatGPT Sites preview. It does not affect other hosting providers.

## Structure

- `dist/index.html` — homepage
- `dist/my-work/` — work index
- `dist/about-me/` — about page
- `dist/contact/` — contact page
- `dist/<project>/` — eight local case studies
- `dist/assets/` — locally stored project imagery
- `dist/case-studies.js` — existing case-study copy and image manifests
- `dist/styles.css`, `dist/page.css`, `dist/case-study.css` — shared visual system
