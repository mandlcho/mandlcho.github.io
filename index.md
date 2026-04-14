---
layout: landing
title: "Mandl Cho"
hero_title: "Mandl Cho"
description: "Sr Technical Animator at Tencent, Singapore."
---

<section class="hero">
  <h2 class="hero__heading">I'm Mandl, a Sr Technical Animator at Tencent. I build rigs, prototype feel-first loops, and tinker with playful systems.</h2>
  <p class="hero__sub">Previously at Ubisoft.</p>
</section>

<section class="work-grid">
  {% for item in site.data.games %}
    {% assign project_image = item.image | relative_url %}
    <a class="work-card" href="{{ item.url }}" target="_blank" rel="noopener">
      <img
        class="work-card__image"
        src="{{ project_image }}"
        alt="{{ item.image_alt | default: item.name }}"
        loading="lazy"
      />
      <div class="work-card__overlay">
        <h3 class="work-card__title">{{ item.name }}</h3>
        <span class="work-card__role">{{ item.language_label }}</span>
      </div>
    </a>
  {% endfor %}
</section>

<footer class="landing__site-footer">
  <div class="landing__footer-links">
    <a href="mailto:mandl.cho@icloud.com">Email</a>
    <a href="https://www.linkedin.com/in/mandlcho/" target="_blank" rel="noopener">LinkedIn</a>
    <a href="https://x.com/maaandl" target="_blank" rel="noopener">X</a>
    <a href="https://github.com/mandlcho" target="_blank" rel="noopener">GitHub</a>
  </div>
</footer>
