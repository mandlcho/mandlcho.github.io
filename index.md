---
layout: landing
title: "Mandl Cho"
description: "Developer, experimenter, chronic tinkerer."
---

{% assign projects_showcase = site.data.projects | sort: 'last_updated' | reverse | slice: 0, 3 %}

<section class="contributions contributions--about">
  <div class="contributions__body">
    <div class="contributions__content">
      <div class="contributions__text">
        <h2 class="contributions__title">about</h2>
        <ul class="contributions__list">
          <li>💼 Sr Technical Animator, Tencent</li>
          <li>📍 Central, Singapore</li>
          <li>✉️ mandl.cho@icloud.com</li>
          <li>✨ Fun-stack Developer</li>
          <li class="contributions__social">
            <img
              src="{{ '/images/linkedin-favicon.svg' | relative_url }}"
              alt="LinkedIn logo"
              class="contributions__social-icon"
              width="16"
              height="16"
              loading="lazy"
            />
            <a href="https://www.linkedin.com/in/mandlcho/" target="_blank" rel="noopener">
              LinkedIn
            </a>
          </li>
          <li class="contributions__social">
            <img
              src="{{ '/images/x-favicon.svg' | relative_url }}"
              alt="X logo"
              class="contributions__social-icon"
              width="16"
              height="16"
              loading="lazy"
            />
            <a href="https://x.com/maaandl" target="_blank" rel="noopener">
              X (@maaandl)
            </a>
          </li>
        </ul>
        <p class="contributions__bio">
          <span>
            I toggle between engines, rigs, and tiny web toys—chasing playful systems
            that feel handcrafted without the overhead of heavy pipelines.
          </span>
          <span>
            Most days I’m prototyping feel-first loops, documenting the process,
            and sharing notes so other builders can remix the experiments for themselves.
          </span>
        </p>
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
    {% if projects_showcase and projects_showcase.size > 0 %}
      <div class="projects-overview">
        {% for project in projects_showcase %}
          {% include project-card-mini.html project=project %}
        {% endfor %}
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
        chart.src = `${base}?t=${Date.now()}`; // bust cache to pull latest chart
      }
    }
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
