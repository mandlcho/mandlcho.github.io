---
layout: case-study
title: "Skull & Bones"
description: "Animation systems for crews and characters moving on ships, where the surface beneath them is always changing."
permalink: /work/skull-and-bones/
eyebrow: shipped_work
role: Technical Animator
focus: Character and crew animation systems
status: Shipped
image: /images/sb-card.webp
image_alt: "Skull and Bones artwork"
image_label: skull_and_bones.webp
official_url: https://www.ubisoft.com/en-us/game/skull-and-bones
next_work_url: /work/monster-hunter-outlanders/
next_work_title: "Monster Hunter Outlanders"
---

## The broad problem

Character movement is usually designed against a stable world. On a ship, that assumption changes. The surface underneath the character can pitch, roll, and move while the animation still needs to read clearly.

On Skull & Bones, I worked on animation systems for crews and characters moving on ships. One of the main problems was supporting movement on a surface that was constantly shifting.

## The situation that changes everything

A motion that looks correct on stable ground can lose weight or contact when the reference beneath it moves. The problem is not only the individual animation. It is how the character, the ship, and the world relate to one another over time.

This is the kind of technical animation problem I enjoy because the visual issue points back to a systems issue. You have to decide which movement belongs to the character, which belongs to the platform, and how the result should be combined without becoming noisy or artificial.

## What the example shows

The ship is an extreme case, but the same way of thinking applies elsewhere. Start with the visible problem, identify the assumptions underneath it, and test the situations where those assumptions stop being true.

For this project, the unstable surface was not an edge case. It was the world the characters had to live in, so the animation system needed to treat it as a first-class condition.

> When the ground itself moves, stability has to come from the system rather than from the environment.
