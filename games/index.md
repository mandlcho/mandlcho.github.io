---
layout: landing
title: Work archive
hero_title: Work archive
description: "Shipped and in-development game projects, with the technical animation contribution behind each one."
permalink: /games/
---

<section class="projects-page projects-page--games">
  <header class="projects-page__intro">
    <p class="projects-page__eyebrow">selected_work</p>
    <h1 class="projects-page__title">work archive</h1>
    <div class="projects-page__header-container"><p class="projects-page__description">{{ page.description }}</p></div>
  </header>
  <div class="projects-grid">
    {% for item in site.data.games %}
      <article class="project-card">
        <figure class="project-card__media"><img src="{{ item.image | relative_url }}" alt="{{ item.image_alt }}" width="1200" height="675" loading="lazy" /></figure>
        <header class="project-card__header">
          <a class="project-card__name" href="{{ item.url | relative_url }}">{{ item.name }}</a>
          <span class="project-card__status">{{ item.status }}</span>
        </header>
        <p class="project-card__summary">{{ item.summary }}</p>
        <div class="project-card__links">
          <a href="{{ item.url | relative_url }}">case study →</a>
          {% if item.video_url %}<a href="{{ item.video_url }}" target="_blank" rel="noopener">related reel ↗</a>{% endif %}
        </div>
        <footer class="project-card__footer">
          <span class="project-card__language"><span class="project-card__language-swatch" style="--lang-color: {{ item.language_color }}"></span>{{ item.language_label }}</span>
        </footer>
      </article>
    {% endfor %}
  </div>
</section>
