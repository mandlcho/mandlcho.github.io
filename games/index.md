---
layout: landing
title: Games
hero_title: Games
description: "Game design work across AAA titles."
permalink: /games/
---

{% assign games = site.data.games %}
{% include work-section.html
  items=games
  eyebrow="game design"
  title="Games"
  description=page.description
  empty_message="More work coming soon."
  page_type="games"
%}
