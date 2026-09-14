---
layout: case-study
title: "Monster Hunter Outlanders"
description: "Locomotion and combat systems for characters that need to feel responsive across very different situations."
permalink: /work/monster-hunter-outlanders/
eyebrow: current_work
role: Senior Technical Animator
focus: Locomotion and combat systems
status: In development
image: /images/mh-card.webp
image_alt: "Monster Hunter Outlanders artwork"
image_label: monster_hunter_outlanders.webp
official_url: https://www.monsterhunter.com/outlanders/
next_work_url: /work/assassins-creed-valhalla/
next_work_title: "Assassin’s Creed Valhalla"
---

## The broad problem

There are several parts to technical animation, but one that stands out is how a system behaves outside its cleanest example. A movement state can look good on its own and still feel wrong when the player changes direction, interrupts it, enters combat, or moves into a different scenario.

On Monster Hunter Outlanders, I work on locomotion and combat systems. These systems need to support different character behaviors while still feeling responsive to the player.

## What I pay attention to

The work is not only about whether an animation plays. I look at how the system selects a state, how it leaves that state, and what happens when the expected sequence is interrupted. Transitions need to be designed carefully so the same solution does not become visible and repetitive.

That means starting broad, listing the situations the system has to survive, and then zoning in on the places where movement begins to break down. Those edge cases usually reveal more about the system than the ideal path does.

## My approach

I work between gameplay requirements, animation quality, and implementation constraints. The goal is to make those parts support each other, so the character still feels believable without making the controls feel delayed or disconnected.

Because the project is still in development, the details here are intentionally high-level. The part I can show is how I think about the problem: visible movement is the output, but the real work is the system of decisions underneath it.

> A movement system is not finished when one animation looks right. It is finished when the transitions and edge cases still feel intentional.
