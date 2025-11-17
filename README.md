# mandlcho.github.io

GitHub Pages blog powered by Jekyll and the minima theme.

## Local development

> Always run `bundle install` (or `bundle update` when you need fresh gems) followed by `bundle exec jekyll build` after pulling changes so the site and dependencies stay in sync.

1. Ensure you have Ruby (>= 3.0 recommended) and Bundler installed.
2. Install dependencies:

   ```bash
   bundle install
   ```

3. Run the development server with livereload so changes rebuild automatically:

   ```bash
   bundle exec jekyll serve --livereload
   ```

4. Open <http://localhost:4000> to preview changes. The site will reload when you edit files.

5. Before committing, rebuild to catch issues:

   ```bash
   bundle exec jekyll build
   bundle exec jekyll doctor
   ```

## Publishing

Push changes to the `main` branch and GitHub Pages will rebuild the site automatically.

### Refreshing the BTC price snapshot

The Bitcoin page reads a cached Google Finance snapshot stored at `assets/data/btc-usd.json`. Update it before publishing by running:

```bash
python3 scripts/fetch_google_price.py
```

Commit the refreshed JSON so production picks up the latest price.

## Creating a post

1. Add a new Markdown file under `_posts/` named `YYYY-MM-DD-your-title.md`.
2. Include YAML front matter similar to:

   ```markdown
   ---
   layout: post
   title: "My Post Title"
   description: Optional short summary
   ---
   ```

3. Write your content using Markdown.
