---
layout: page
title: "OpenCode To-Do List Build Log"
description: "How the kanban-lite workflow keeps experiments visible without ceremony."
date: 2025-10-31
tags:
  - productivity
  - opencode-todolist
---

![Board layout concept for OpenCode]({{ '/images/opencode-wireframe.png' | relative_url }})

What started as a “sticky notes but in the browser” sprint morphed into a living backlog that tracks experiments moving from `spark → build → ship`.

Takeaways from this pass:

- **Card anatomy.** Titles, ETA dots, and a single textarea for learnings keep updates lightweight enough that I actually use the thing.
- **Realtime sync.** Leveraged Supabase to broadcast updates so tablet + desktop stay mirrored when I roam around the studio.
- **Automation hooks.** Draft webhooks pipe status changes into a daily digest so I can review experiments over coffee.

The post will keep collecting screenshots as I layer in public sharing and templated board views.
