---
layout: landing
title: projects
hero_title: Mandl Cho
description: "Selected builds, kept in high signal snapshots."
permalink: /projects/
---

{% assign projects = site.data.projects %}
<section class="projects-page">
  <header class="projects-page__intro">
    <p class="projects-page__eyebrow">latest cycles</p>
    <h1 class="projects-page__title">projects</h1>
    <p class="projects-page__description">{{ page.description }}</p>
  </header>

  <div class="projects-grid">
    {% if projects and projects.size > 0 %}
      {% for project in projects %}
        {% assign repo = project.repo %}
        {% assign project_href = project.url | default: "" %}
        {% if project_href contains "://" %}
          {% assign project_href = project_href %}
        {% elsif project_href != "" %}
          {% assign project_href = project_href | relative_url %}
        {% else %}
          {% assign project_href = "https://github.com/" | append: repo %}
        {% endif %}
        {% assign case_post = nil %}
        {% if project.case_study_slug %}
          {% assign case_post = site.posts | where: "slug", project.case_study_slug | first %}
        {% endif %}
        {% assign has_case_panel = project.case_study_slug %}
        <article class="project-card" data-repo="{{ repo }}" data-project-card>
          <header class="project-card__header">
            <div class="project-card__identity">
              <svg
                class="project-card__icon"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M2 2.75A1.75 1.75 0 0 1 3.75 1h8.5A1.75 1.75 0 0 1 14 2.75v10.5A1.75 1.75 0 0 1 12.25 15H3.75A1.75 1.75 0 0 1 2 13.25Zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25Z"
                />
              </svg>
              <a class="project-card__name" href="{{ project_href }}">
                <span class="project-card__owner">
                  {{ repo | split: "/" | first }}
                </span>
                <span class="project-card__slash">/</span>
                <span class="project-card__repo">
                  {{ repo | split: "/" | last }}
                </span>
              </a>
            </div>
            <span class="project-card__status">
              {{ project.status | default: "public" }}
            </span>
          </header>

          <p class="project-card__summary">
            {{ project.summary }}
          </p>

          <div class="project-card__footer">
            <span class="project-card__language">
              <span
                class="project-card__language-swatch"
                data-language-swatch
                style="--lang-color: {{ project.language_color | default: 'rgba(148, 163, 184, 0.6)' }};"
              ></span>
              <span class="project-card__language-label" data-language-label>
                {{ project.language | default: "updating..." }}
              </span>
            </span>
            <div class="project-card__stats">
              <span class="project-card__stat project-card__stat--stars">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M8 .981 10.09 6.26l5.527.2-4.3 3.402 1.434 5.356L8 12.735l-4.75 2.483 1.434-5.356-4.3-3.403 5.527-.199Z"
                  />
                </svg>
                <span class="project-card__stat-value" data-stars-value>—</span>
              </span>
              <span class="project-card__stat project-card__stat--forks">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M5.5 3.25a2.25 2.25 0 1 0-3 2.122v2.256a2.25 2.25 0 1 0 1.5 0V5.372a2.251 2.251 0 0 0 1.5-2.122m-2.25.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5m0 6a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M10.5.5a2.25 2.25 0 0 0-1.5 3.872v5.256a2.25 2.25 0 1 0 1.5 0V4.372A2.25 2.25 0 0 0 10.5.5m0 3a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5m0 8a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5"
                  />
                </svg>
                <span class="project-card__stat-value" data-forks-value>—</span>
              </span>
              <span class="project-card__stat project-card__stat--updated" data-updated-value>
                updated — syncing...
              </span>
            </div>
          </div>
          {% if has_case_panel %}
            <button
              class="project-card__toggle"
              type="button"
              data-project-toggle
              aria-expanded="false"
            >
              <span data-toggle-label>Show build log</span>
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M3.22 5.47a.75.75 0 0 1 1.06 0L8 9.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.22 6.53a.75.75 0 0 1 0-1.06"
                />
              </svg>
            </button>
            <div class="project-card__details" data-project-details hidden>
              {% if case_post %}
                <article class="project-card__case">
                  <header class="project-card__case-header">
                    <p class="project-card__case-eyebrow">
                      {{ case_post.date | date: "%b %d, %Y" }}
                    </p>
                    <h3 class="project-card__case-title">{{ case_post.title }}</h3>
                  </header>
                  <div class="project-card__case-body">
                    {{ case_post.content }}
                  </div>
                  <a
                    class="project-card__case-link"
                    href="{{ case_post.url | relative_url }}"
                  >
                    Continue reading
                  </a>
                </article>
              {% else %}
                <p class="project-card__case-empty">
                  Build log coming soon.
                </p>
              {% endif %}
            </div>
          {% endif %}
        </article>
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

    var detailCards = document.querySelectorAll("[data-project-card]");
    detailCards.forEach(function (card) {
      var toggle = card.querySelector("[data-project-toggle]");
      var details = card.querySelector("[data-project-details]");
      if (!toggle || !details) return;

      var label = toggle.querySelector("[data-toggle-label]");

      function setState(isOpen) {
        toggle.setAttribute("aria-expanded", isOpen);
        details.hidden = !isOpen;
        card.classList.toggle("is-open", isOpen);
        if (label) {
          label.textContent = isOpen ? "Hide build log" : "Show build log";
        }
      }

      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var isExpanded = toggle.getAttribute("aria-expanded") === "true";
        setState(!isExpanded);
      });

      card.addEventListener("click", function (event) {
        if (event.target.closest("a")) return;
        if (event.target.closest("[data-project-toggle]")) return;
        if (event.target.closest("[data-project-details]")) return;
        toggle.click();
      });
    });
  });
</script>
