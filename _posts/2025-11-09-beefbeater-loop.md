---
layout: page
title: "Prototyping Beefbeater's Core Loop"
description: "Notes on shaping the clicker rhythm, HUD polish, and balancing passes."
date: 2025-11-09
tags:
  - beefbeater
  - prototypes
---

![Early HUD sketches for Beefbeater]({{ '/images/beefbeater-hud.png' | relative_url }})

Beefbeater started as a weekend challenge: build a crunchy clicker loop that rewards over-the-top tap spam but still feels readable. I mapped the touch feedback first—juice before mechanics—so every press pushes a squishy waveform through the HUD.

Key beats from this cycle:

- **Loop timing.** Settled on 600ms resolve windows so the score blooms without spamming particle trash everywhere.
- **UI polish.** Swapped static sprites for programmatic gradients to keep things light on memory while still feeling neon.
- **Instrumentation.** Added a debug overlay that streams DPS, combo decay, and energy reserve so I can dial difficulty way faster.

Next up is a multiplayer tap-off, so this post will keep growing with GIFs/screens once the WebGL capture cooperates.
