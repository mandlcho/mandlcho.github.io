---
layout: landing
title: "Mandl Cho"
description: "Developer, experimenter, chronic tinkerer."
---

<section class="hero">
  <nav class="hero__menu" aria-label="primary">
    <ul class="menu">
      <li class="menu__item menu__item--accordion">
        <button
          type="button"
          class="menu__trigger"
          data-accordion-trigger
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="projects-submenu"
        >
          projects
        </button>
        <ul class="menu__submenu" id="projects-submenu" hidden>
          <li>
            <a
              href="{{ '/projects/the-kanban/' | relative_url }}"
              data-transition-link="true"
            >
              the kanban
            </a>
          </li>
        </ul>
      </li>
      <li class="menu__item menu__item--accordion">
        <button
          type="button"
          class="menu__trigger"
          data-accordion-trigger
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="experiments-submenu"
        >
          experiments
        </button>
        <ul class="menu__submenu" id="experiments-submenu" hidden>
          <li>
            <a href="{{ '/experiments/' | relative_url }}" data-transition-link="true">
              overview
            </a>
          </li>
          <li><a href="{{ '/experiments/lab-notes/' | relative_url }}">lab notes</a></li>
          <li><a href="{{ '/experiments/prototypes/' | relative_url }}">playable prototypes</a></li>
        </ul>
      </li>
      <li class="menu__item menu__item--accordion">
        <button
          type="button"
          class="menu__trigger"
          data-accordion-trigger
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="bitcoin-submenu"
        >
          bitcoin
        </button>
        <ul class="menu__submenu" id="bitcoin-submenu" hidden>
          <li>
            <a href="{{ '/bitcoin/' | relative_url }}" data-transition-link="true">
              overview
            </a>
          </li>
          <li><a href="{{ '/bitcoin/research/' | relative_url }}">research log</a></li>
          <li><a href="{{ '/bitcoin/tools/' | relative_url }}">tools + resources</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</section>
