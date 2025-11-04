# mandlcho.github.io

GitHub Pages blog powered by Jekyll and the minima theme.

## Local development

1. Ensure you have Ruby (>= 3.0 recommended) and Bundler installed.
2. Install dependencies:

   ```bash
   bundle install
   ```

3. Run the development server:

   ```bash
   bundle exec jekyll serve
   ```

4. Open <http://localhost:4000> to preview changes. The site will reload when you edit files.

## Publishing

Push changes to the `main` branch and GitHub Pages will rebuild the site automatically.

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
