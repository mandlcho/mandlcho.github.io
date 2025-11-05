---
layout: project
title: the kanban
permalink: /projects/the-kanban/
---

# the kanban {.project-page__title}

<section class="project-info">
  <h2 class="project-info__title">info</h2>
  <p class="project-info__lede">
    the kanban keeps a living pulse on active experiments and build strands without
    drowning in docs.
  </p>
  <div class="project-info__details">
    <p>languages detected from the repo:</p>
    <ul id="project-languages" data-repo="mandlcho/mandlcho.github.io">
      <li>loading…</li>
    </ul>
  </div>
</section>

<script>
  (function () {
    var list = document.getElementById("project-languages");
    if (!list) return;

    var repo = list.getAttribute("data-repo");
    if (!repo) return;

    var endpoint = "https://api.github.com/repos/" + repo + "/languages";

    fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (response) {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(function (data) {
        list.innerHTML = "";
        var entries = Object.entries(data);
        if (!entries.length) {
          list.innerHTML = "<li>not available</li>";
          return;
        }

        entries
          .sort(function (a, b) {
            return b[1] - a[1];
          })
          .forEach(function (entry) {
            var li = document.createElement("li");
            li.textContent = entry[0];
            list.appendChild(li);
          });
      })
      .catch(function () {
        list.innerHTML = "<li>not available</li>";
      });
  })();
</script>
