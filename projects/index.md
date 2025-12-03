---
layout: landing
title: projects
hero_title: Mandl Cho
description: "Selected builds, kept in high signal snapshots."
permalink: /projects/
page_class: projects-page-panels
---

{% assign projects = site.data.projects | sort: 'last_updated' | reverse %}
{% include work-section.html
  items=projects
  eyebrow="latest cycles"
  title="projects"
  description=page.description
  empty_message="More builds coming soon."
  page_type="projects"
%}
