---
layout: landing
title: projects
hero_title: Mandl Cho
description: "Selected builds, kept in high signal snapshots."
permalink: /projects/
---

{% assign detected_projects = site.pages | where: "layout", "project" | sort: "card_order" %}
{% assign detected_project_count = 0 %}
{% for project in detected_projects %}
  {% if project.card_repo %}
    {% assign detected_project_count = detected_project_count | plus: 1 %}
  {% endif %}
{% endfor %}
<section class="projects-page">
  <header class="projects-page__intro">
    <p class="projects-page__eyebrow">latest cycles</p>
    <h1 class="projects-page__title">projects</h1>
    <p class="projects-page__description">{{ page.description }}</p>
  </header>

  <div class="projects-grid">
    {% if detected_project_count > 0 %}
      {% for project in detected_projects %}
        {% if project.card_repo %}
          {% include project-card.html project=project %}
        {% endif %}
      {% endfor %}
    {% else %}
      <p class="projects-page__empty">More builds coming soon.</p>
    {% endif %}
  </div>
</section>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".project-card[data-repo]");
    if (!cards.length) return;

    var languageColors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      HTML: "#e34c26",
      CSS: "#563d7c",
      SCSS: "#c6538c",
      Ruby: "#701516",
      Python: "#3572a5",
      Shell: "#89e051",
      Markdown: "#083fa1",
      JSON: "#292929"
    };

    cards.forEach(function (card) {
      var repo = card.getAttribute("data-repo");
      if (!repo) return;

      var starsEl = card.querySelector("[data-stars-value]");
      var forksEl = card.querySelector("[data-forks-value]");
      var updatedEl = card.querySelector("[data-updated-value]");
      var languageLabel = card.querySelector("[data-language-label]");
      var languageSwatch = card.querySelector("[data-language-swatch]");

      fetch("https://api.github.com/repos/" + repo, {
        headers: { Accept: "application/vnd.github+json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(function (repoData) {
          if (starsEl && typeof repoData.stargazers_count === "number") {
            starsEl.textContent = repoData.stargazers_count;
          }

          if (forksEl && typeof repoData.forks_count === "number") {
            forksEl.textContent = repoData.forks_count;
          }

          if (languageLabel && repoData.language) {
            languageLabel.textContent = repoData.language;
          }

          if (languageSwatch && repoData.language) {
            var color =
              languageColors[repoData.language] ||
              "rgba(148, 163, 184, 0.6)";
            languageSwatch.style.setProperty("--lang-color", color);
          }

          if (updatedEl && repoData.pushed_at) {
            var updatedDate = new Date(repoData.pushed_at);
            updatedEl.textContent =
              "updated — " +
              updatedDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
          }
        })
        .catch(function () {
          if (starsEl) starsEl.textContent = "—";
          if (forksEl) forksEl.textContent = "—";
          if (updatedEl) updatedEl.textContent = "updated — unavailable";
        });
    });
  });
</script>
