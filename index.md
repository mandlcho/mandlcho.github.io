---
layout: landing
title: "Mandl Cho"
description: "Developer, experimenter, chronic tinkerer."
---

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
    <ul class="contributions__list contributions__list--projects">
      <li>Placeholder project update: new feature sketches under review.</li>
      <li>Placeholder prototype: iterating on interaction model this week.</li>
      <li>Placeholder shipping note: packaging roadmap for early testers.</li>
    </ul>
  </div>
</section>

<script defer>
  document.addEventListener("DOMContentLoaded", () => {
    const chart = document.getElementById("github-contributions");
    if (!chart) return;
    const base = chart.dataset.baseSrc;
    if (!base) return;
    chart.src = `${base}?t=${Date.now()}`; // bust cache to pull latest chart
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
