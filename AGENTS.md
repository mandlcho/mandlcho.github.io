# Repository Guidelines

## Project Structure & Module Organization
- `_config.yml` stores site metadata, permalink rules, and plugin configuration for the Jekyll build.
- `_posts/` holds dated Markdown posts named `YYYY-MM-DD-title.md`; Jekyll turns these into blog entries automatically.
- `blog/index.md`, `index.md`, and `about.md` are top-level pages that surface content with Minima layouts.
- `assets/css/style.scss` extends the Minima theme; keep Sass front matter (`---`) intact so Jekyll processes it.

## Build, Test, and Development Commands
- `bundle install` installs the GitHub Pages gem set pinned by GitHub.
- `bundle exec jekyll serve --livereload` runs the local dev server at `http://localhost:4000`, auto-reloading on edits.
- `bundle exec jekyll build` generates the static site in `_site/` to validate production output.
- `bundle exec jekyll doctor` checks for common configuration issues before publishing.

## Coding Style & Naming Conventions
- Use Markdown with YAML front matter; indent YAML blocks with two spaces and arrange keys in the order: `layout`, `title`, `description`, `date`, `tags`.
- Favor concise, descriptive post slugs (e.g., `_posts/2024-05-12-digital-gardening.md`); avoid spaces and uppercase letters.
- Keep SCSS selectors scoped to components (e.g., `.post-header`) and group related variables near their usage to ease theme tweaks.

## Testing Guidelines
- Always run `bundle exec jekyll build` locally; treat build warnings as blockers.
- Follow with `bundle exec jekyll doctor` and resolve reported front matter or link issues.
- Preview via `bundle exec jekyll serve` and verify new pages, external links, and asset paths in the browser before submitting.

## Commit & Pull Request Guidelines
- Write imperative, scope-first commit subjects (`Add analytics snippet`, `Fix footer layout`) and keep bodies under 72 characters per line.
- Squash unrelated changes; separate content updates from styling or configuration adjustments.
- Pull requests should summarize the change, call out impacted URLs, and include screenshots for visible UI updates.
- Reference related GitHub issues with `Fixes #123` when applicable and note that the site builds cleanly with `bundle exec jekyll build`.

## Content & Asset Workflow
- Store images or downloads under `assets/` and reference them with the Liquid helper: `{{ '/assets/img/example.png' | relative_url }}`.
- When drafting new posts, keep placeholders in `_drafts/` (create the folder as needed) and move to `_posts/` with the correct date when ready to publish.
- After merging to `main`, let GitHub Pages deploy automatically; no manual publishing steps are required.
