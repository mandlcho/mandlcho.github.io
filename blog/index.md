---
layout: page
title: Notes
description: "Build logs, project notes, and things I learned while making them."
permalink: /blog/
eyebrow: notes_index
---

<p class="notes-count">{{ site.posts | size }} published notes. These are build logs rather than polished tutorials, so they keep the decisions and unfinished edges visible.</p>

<div class="notes-grid">
  {% for post in site.posts %}
    {% if post.title %}
      <a class="note-card" data-node="post::{{ post.slug }}" href="{{ post.url | relative_url }}">
        <div>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time>
          <h2>{{ post.title }}</h2>
        </div>
        {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        {% if post.tags %}<span class="note-card__tags">{{ post.tags | join: " / " }}</span>{% endif %}
      </a>
    {% endif %}
  {% endfor %}
</div>
