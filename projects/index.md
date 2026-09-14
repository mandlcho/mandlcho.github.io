---
layout: landing
title: Projects
hero_title: Projects
description: "Side projects I use to learn by doing, test ideas, and explore a more playful side of my work."
permalink: /projects/
page_class: projects-page-panels
---

{% assign featured_projects = site.data.projects | where: "featured", true %}
{% assign archive_projects = site.data.projects | where_exp: "project", "project.featured != true" | sort: "last_updated" | reverse %}

<section class="projects-curated">
  <header class="projects-curated__header">
    <p class="geek-label">// projects_index</p>
    <h1>projects</h1>
    <p>I build side projects as a way to learn. I usually start with one problem I can picture clearly, then use it to work through a new tool, system, or idea.</p>
  </header>

  <div class="featured-projects">
    {% for project in featured_projects %}
      <a class="featured-project" href="{{ project.url }}"{% if project.url contains '://' %} target="_blank" rel="noopener"{% endif %}>
        <div class="featured-project__visual" data-command="{{ project.visual_command | escape }}"></div>
        <div class="featured-project__body">
          <div class="featured-project__meta"><span>{{ project.language_label }}</span><span>{{ project.last_updated | date: "%Y" }}</span></div>
          <h2>{{ project.name }}</h2>
          <p>{{ project.summary }}</p>
          <p><strong>Why I built it:</strong> {{ project.reason }}</p>
          <span class="featured-project__action">open project →</span>
        </div>
      </a>
    {% endfor %}
  </div>

  <section class="project-archive" aria-labelledby="archive-title">
    <p class="geek-label">// more_builds</p>
    <h2 id="archive-title">The archive</h2>
    <div class="project-archive__list">
      {% for project in archive_projects %}
        <a class="project-archive__item" href="{{ project.url }}" target="_blank" rel="noopener">
          <strong>{{ project.name }}</strong>
          <span>{{ project.summary }}</span>
          <em>{{ project.language_label }} ↗</em>
        </a>
      {% endfor %}
    </div>
  </section>
</section>
