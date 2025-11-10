---
layout: landing
title: bitcoin
hero_title: bitcoin
description: "Research notes, mining economics, and infrastructure tools collected in one hub."
permalink: /bitcoin/
---

{% assign bitcoin_entries = site.data.bitcoin %}
{% include work-section.html
  items=bitcoin_entries
  eyebrow="sound money workbench"
  title="bitcoin"
  description=page.description
  empty_message="More bitcoin experiments coming soon."
%}
