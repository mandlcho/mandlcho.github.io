---
layout: page
title: "The Kanban Build Log"
description: "How the kanban-lite workflow keeps experiments visible without ceremony."
date: 2025-10-31
tags:
  - productivity
  - the-kanban
---

![Kanban board overview]({{ '/images/the-kanban-board.svg' | relative_url }})

The Kanban (formerly OpenCode To-Do List) leans into a board-first workflow: backlog, active, and done columns are powered by the same drag hooks that fuel the list view. Todo metadata—priority badges, categories, and due dates—survive every drag thanks to the `useBoardDragAndDrop` hook.

Key takeaways from this cycle:

- **Dual view modes.** The `viewMode` state flips between list and card views, letting me compose quickly in list mode but review flow in the kanban layout.
- **Category system.** `useCategories()` keeps labels reusable: assigning/removing a category instantly re-colors cards and filters via the selector chips above the board.
- **Priority focus.** Holding a priority filter (`TODO_PRIORITIES`) fades non-matching cards, a tiny trick that keeps deep backlogs scannable.

![Archive drawer interactions]({{ '/images/the-kanban-archive.svg' | relative_url }})

Recent additions focus on lifecycle management:

1. **Archive drawer.** The `ArchiveDrawer` component pairs with a pointer-down listener so tapping outside closes it—no extra UI clutter.
2. **Keyboard flow.** Shortcuts like `⌘J` (toggle drawer) and `Esc` (dismiss) map to `useEffect` bindings so the board feels more like a native planning app.
3. **Category cleanup.** Removing a category updates active + archived todos in one sweep; the log above shows the diff applied to both collections for parity.

Next up is wiring Supabase for multi-device sync alongside Vitest coverage of the drag/drop hooks. The build log will keep snapshots as I ship that backend bridge.
