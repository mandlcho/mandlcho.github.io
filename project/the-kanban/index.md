---
layout: project
title: DoWhat
description: "A real-time task board that keeps the whole state of my work visible without turning task management into another project."
permalink: /projects/the-kanban/
eyebrow: project_file
---

<section class="project-info">
  <div class="project-info__header">
    <h2 class="project-info__title">languages</h2>
    <span class="project-meta" id="project-updated">last updated — loading…</span>
  </div>
  <p class="project-info__lede">Backlog, active, and done stay visible in one board, with real-time sync across devices and no conventional account.</p>
  <div class="project-info__details">
    <ul
      class="project-languages"
      id="project-languages"
      data-repo="mandlcho/DoWhat"
    >
      <li>loading…</li>
    </ul>
  </div>
</section>

## Why I built it

There are many task managers, but I kept running into the same problem. A flat list hid the state of the work, while larger tools introduced more ceremony than I wanted.

I built DoWhat so backlog, active, and done could stay visible at the same time. It supports list and card views, priorities, due dates, categories, drag-and-drop, and archiving.

## One part that stands out

Cross-device sync usually begins with an account form. I wanted the board to work across devices without making signup the first task.

DoWhat uses a generated vault code and a PIN. The browser hashes the PIN before it is sent, while Supabase subscriptions keep changes synchronized in real time. A second device joins by entering the same vault code and PIN.

The important part was not removing identity completely. It was reducing identity to the smallest mechanism the project actually needed.

## What I learned

This project gave me a practical way to work through real-time state, database policies, synchronization, and the boundary between a simple interface and the infrastructure behind it. It also reinforced how I prefer to learn: start with a problem I already understand, then build until the technical decisions become concrete.

<p class="project-links"><a class="geek-button geek-button--blue" href="https://mandlcho.github.io/DoWhat/" target="_blank" rel="noopener">open live project ↗</a> <a class="geek-button" href="https://github.com/mandlcho/DoWhat" target="_blank" rel="noopener">view source ↗</a></p>

<script>
  (function () {
    var list = document.getElementById("project-languages");
    var updatedLabel = document.getElementById("project-updated");
    if (!list) return;

    var repo = list.getAttribute("data-repo");
    if (!repo) return;

    var languageEndpoint = "https://api.github.com/repos/" + repo + "/languages";
    var repoEndpoint = "https://api.github.com/repos/" + repo;
    var languageColors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      HTML: "#e34c26",
      CSS: "#563d7c",
      SCSS: "#c6538c",
      Ruby: "#701516",
      Python: "#3572A5",
      Shell: "#89e051",
      Markdown: "#083fa1",
      JSON: "#292929"
    };

    Promise.all([
      fetch(languageEndpoint, { headers: { Accept: "application/vnd.github+json" } }),
      fetch(repoEndpoint, { headers: { Accept: "application/vnd.github+json" } })
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
        );
      })
      .then(function (results) {
        var languages = results[0];
        var repoDetails = results[1];

        if (updatedLabel && repoDetails && repoDetails.updated_at) {
          var updatedDate = new Date(repoDetails.updated_at);
          updatedLabel.textContent =
            "last updated — " + updatedDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
        }

        list.innerHTML = "";
        var entries = Object.entries(languages);
        if (!entries.length) {
          list.innerHTML = "<li class=\"project-language\">not available</li>";
          return;
        }

        entries
          .sort(function (a, b) {
            return b[1] - a[1];
          })
          .forEach(function (entry) {
            var li = document.createElement("li");
            li.className = "project-language";

            var swatch = document.createElement("span");
            swatch.className = "project-language__swatch";
            swatch.style.setProperty("--lang-color", languageColors[entry[0]] || "rgba(148, 163, 184, 0.6)");

            var label = document.createElement("span");
            label.textContent = entry[0];

            li.appendChild(swatch);
            li.appendChild(label);
            list.appendChild(li);
          });
      })
      .catch(function () {
        list.innerHTML = "<li class=\"project-language\">not available</li>";
        if (updatedLabel) {
          updatedLabel.textContent = "last updated — not available";
        }
      });
  })();
</script>
