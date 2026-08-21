---
layout: landing
title: Projects
hero_title: Projects
description: "Side projects I use to learn by doing, test ideas, and explore AI."
permalink: /projects/
page_class: projects-page-panels
---

{% assign projects = site.data.projects | sort: 'last_updated' | reverse %}
{% include work-section.html
  items=projects
  eyebrow="projects_index"
  title="projects"
  description=page.description
  empty_message="More builds coming soon."
  page_type="projects"
%}
