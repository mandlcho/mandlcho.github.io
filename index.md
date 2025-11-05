---
layout: landing
title: "Mandl Cho"
description: "Developer, experimenter, chronic tinkerer."
---

<section class="hero">
  <h1 class="hero__title">mandl.projects</h1>
  <nav class="hero__menu" aria-label="primary">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__trigger" href="{{ '/projects/' | relative_url }}">projects</a>
        <ul class="menu__submenu">
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
      <li class="menu__item">
        <a class="menu__trigger" href="{{ '/experiments/' | relative_url }}">experiments</a>
        <ul class="menu__submenu">
          <li><a href="{{ '/experiments/lab-notes/' | relative_url }}">lab notes</a></li>
          <li><a href="{{ '/experiments/prototypes/' | relative_url }}">playable prototypes</a></li>
        </ul>
      </li>
      <li class="menu__item">
        <a class="menu__trigger" href="{{ '/bitcoin/' | relative_url }}">bitcoin</a>
        <ul class="menu__submenu">
          <li><a href="{{ '/bitcoin/research/' | relative_url }}">research log</a></li>
          <li><a href="{{ '/bitcoin/tools/' | relative_url }}">tools + resources</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</section>
