---
layout: page
title: "mandlcho.github.io — November Refresh"
description: "Documenting the latest pass on the site stack, theming, and deployment tooling."
date: 2025-11-08
tags:
  - web
  - mandlcho-github-io
---

![Color palette exploration for the site refresh]({{ '/images/site-refresh-swatches.png' | relative_url }})

This cycle focused on making the portfolio feel alive: live GitHub stats, theme toggles, and cards that surface the best builds. A few highlights:

1. **Project data pipeline.** Replaced hard-coded cards with `_data/projects.yml` so the home page and `/projects/` stay in sync.
2. **Auto-metrics.** Each card now fetches stars, forks, language, and last push date directly from the GitHub API.
3. **Styling pass.** Wrote a thin SCSS layer over Minima to get glassy panels, motion curves, and a friendlier reading width.

I keep experimenting with Micro-UX touches—expect more notes here as the design language settles in.
