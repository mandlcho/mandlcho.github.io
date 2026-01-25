# mandlcho.github.io

A GitHub Pages site (Jekyll + minima) for publishing notes, experiments, and long-form writeups.

## Problem

Publishing technical notes and project updates often becomes documentation debt when the workflow is slow or brittle. This repo is the source of truth for a low-friction, versioned publishing pipeline.

## Who it’s for

- Readers who want updates, writeups, and references
- Maintainers/contributors who want a simple workflow for adding posts and pages

## Goals

- Keep publishing lightweight (write Markdown → push to `main`)
- Ensure local preview matches production (GitHub Pages build)
- Keep the site stable and fast to build

## Success metrics

- Time to publish a post: < 5 minutes after writing
- Pages build success rate: ~100% on `main`
- No broken internal links or missing assets after merges

## Scope

- Jekyll site content and theme config
- Posts under `_posts/`
- Static pages, assets, and site metadata

## Non-goals

- Building a custom CMS or admin UI
- Complex theme customization beyond what’s needed for readability
- Heavy client-side JS features

## Constraints / assumptions

- GitHub Pages runs the production build
- Ruby/Bundler required for local development
- Keep dependencies compatible with GitHub Pages’ supported Jekyll ecosystem

## How to run locally

Prereqs: Ruby (>= 3.0 recommended) + Bundler

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000

Before committing:

```bash
bundle exec jekyll build
bundle exec jekyll doctor
```

## Publishing

Push to `main` and GitHub Pages will rebuild automatically.

## Creating a post

1. Add a Markdown file under `_posts/` named `YYYY-MM-DD-your-title.md`
2. Include front matter:

```md
---
layout: post
title: "My Post Title"
description: Optional short summary
---
```

## Roadmap

- Add a lightweight content checklist (front matter conventions, image sizing, link hygiene)
- Add CI checks: `jekyll build` + `jekyll doctor` on PRs
- Optional: add a “Now” page / project index for navigation
