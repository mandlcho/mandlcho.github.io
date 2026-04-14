---
layout: landing
title: "Mandl Cho"
hero_title: "Mandl Cho"
description: "Sr Technical Animator at Tencent, Singapore."
---

<section class="hero">
  <p class="hero__text">I'm Mandl, a Sr Technical Animator at Tencent. I toggle between engines, rigs, and tiny web toys — chasing playful systems that feel handcrafted without the overhead of heavy pipelines.</p>
  <p class="hero__previous">Previously at Ubisoft.</p>
  <div class="hero__image">
    <img src="{{ '/images/profile_pic.png' | relative_url }}" alt="Portrait of Mandl Cho" loading="lazy" />
  </div>
</section>

<section class="work-section">
  <div class="work-masonry">
    {% for item in site.data.games %}
      {% assign project_image = item.image | relative_url %}
      <a class="work-card" href="{{ item.url }}" target="_blank" rel="noopener">
        <div class="work-card__image-wrap">
          <img
            class="work-card__image"
            src="{{ project_image }}"
            alt="{{ item.image_alt | default: item.name }}"
            loading="lazy"
          />
        </div>
        <div class="work-card__info">
          <h3 class="work-card__title">{{ item.name }}</h3>
          <span class="work-card__role">{{ item.language_label }}</span>
        </div>
      </a>
    {% endfor %}
  </div>
</section>

<section class="connect">
  <h2 class="connect__heading">Let's Connect</h2>
  <p class="connect__text">Feel free to reach out for collaborations or just a friendly hello.</p>
  <a class="connect__email" href="mailto:mandl.cho@icloud.com">mandl.cho@icloud.com</a>
  <div class="connect__social">
    <a href="https://www.linkedin.com/in/mandlcho/" target="_blank" rel="noopener" aria-label="LinkedIn">
      <img src="{{ '/images/linkedin-favicon.svg' | relative_url }}" alt="LinkedIn" width="20" height="20" />
    </a>
    <a href="https://x.com/maaandl" target="_blank" rel="noopener" aria-label="X">
      <img src="{{ '/images/x-favicon.svg' | relative_url }}" alt="X" width="20" height="20" />
    </a>
    <a href="https://github.com/mandlcho" target="_blank" rel="noopener" aria-label="GitHub">
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
    </a>
  </div>
</section>
