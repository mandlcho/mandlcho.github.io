layout: landing
title: "Mandl Cho"
description: "Developer, experimenter, chronic tinkerer."
---

{% assign homepage_projects = site.pages | where: "layout", "project" | sort: "card_order" %}
<section class="contributions contributions--about">
  <div class="contributions__body">
    <div class="contributions__content">
      <div class="contributions__text">
        <h2 class="contributions__title">about</h2>
        <ul class="contributions__list">
          <li>Sr Technical Animator, Tencent</li>
          <li>Central, Singapore</li>
          <li>mandl.cho@icloud.com</li>
        </ul>
      </div>
      <span class="contributions__avatar contributions__avatar--about">
        <img
          src="{{ '/images/profile_pic.png' | relative_url }}"
          alt="Portrait of {{ site.title }}"
          loading="lazy"
        />
      </span>
    </div>
  </div>
</section>

<section class="contributions">
  <div class="contributions__body">
    <h2 class="contributions__title">github contributions</h2>
    <p class="contributions__description">
      Live snapshot of my latest activity across repositories.
    </p>
    <div class="contributions__graph">
      <img
        id="github-contributions"
        data-base-src="https://ghchart.rshah.org/mandlcho"
        alt="GitHub contributions calendar for mandlcho"
        loading="lazy"
      />
    </div>
  </div>
</section>

<section class="contributions contributions--projects">
  <div class="contributions__body">
    <h2 class="contributions__title">projects</h2>
    <p class="contributions__description">
      Quick notes on what I'm building, shipping, or experimenting with next.
    </p>
    {% assign homepage_rendered = 0 %}
    {% capture homepage_cards %}
      {% for project in homepage_projects %}
        {% if project.card_repo and homepage_rendered < 3 %}
          {% assign homepage_rendered = homepage_rendered | plus: 1 %}
          {% include project-card--slim.html project=project %}
        {% endif %}
      {% endfor %}
    {% endcapture %}
    {% if homepage_rendered > 0 %}
      <div class="projects-overview">
        {{ homepage_cards | strip }}
      </div>
    {% else %}
      <p class="projects-page__empty">More builds coming soon.</p>
    {% endif %}
  </div>
</section>

<script defer>
  document.addEventListener("DOMContentLoaded", () => {
    const chart = document.getElementById("github-contributions");
    if (chart) {
      const base = chart.dataset.baseSrc;
      if (base) {
        chart.src = `${base}?t=${Date.now()}`;
      }
    }

    const cards = document.querySelectorAll(".project-card[data-repo]");
    if (!cards.length) return;

    const languageColors = {
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

    cards.forEach((card) => {
      const repo = card.getAttribute("data-repo");
      if (!repo) return;

      const starsEl = card.querySelector("[data-stars-value]");
      const forksEl = card.querySelector("[data-forks-value]");
      const updatedEl = card.querySelector("[data-updated-value]");
      const languageLabel = card.querySelector("[data-language-label]");
      const languageSwatch = card.querySelector("[data-language-swatch]");

      fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Accept: "application/vnd.github+json" }
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((repoData) => {
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
            const color =
              languageColors[repoData.language] ||
              "rgba(148, 163, 184, 0.6)";
            languageSwatch.style.setProperty("--lang-color", color);
          }

          if (updatedEl && repoData.pushed_at) {
            const updatedDate = new Date(repoData.pushed_at);
            updatedEl.textContent = `updated — ${updatedDate.toLocaleDateString(
              undefined,
              { month: "short", day: "numeric", year: "numeric" }
            )}`;
          }
        })
        .catch(() => {
          if (starsEl) starsEl.textContent = "—";
          if (forksEl) forksEl.textContent = "—";
          if (updatedEl) updatedEl.textContent = "updated — unavailable";
        });
    });
  });
</script>

<section class="contributions contributions--games">
  <div class="contributions__body">
    <h2 class="contributions__title">games</h2>
    <div class="games-gallery">
      <div class="games-gallery__column">
        <img
          class="games-gallery__image"
          src="{{ '/images/Screenshot 2025-11-07 at 12.52.02 AM.png' | relative_url }}"
          alt="Latest gameplay screenshot preview"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>
