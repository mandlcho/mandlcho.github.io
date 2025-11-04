---
layout: page
title: Blog
permalink: /blog/
---

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <span class="post-meta">{{ post.date | date: "%B %d, %Y" }}</span>
    {{ post.excerpt }}
  </li>
{% endfor %}
</ul>
