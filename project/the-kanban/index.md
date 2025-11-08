layout: project
title: the kanban
permalink: /projects/the-kanban/
card_repo: mandlcho/opencode-todolist
card_summary: "Live kanban that surfaces active experiments without drowning in docs."
card_status: public
card_language: JavaScript
card_language_color: "#f1e05a"
card_order: 1
---

# the kanban

<section class="project-info">
  <div class="project-info__header">
    <h2 class="project-info__title">languages</h2>
    <span class="project-meta" id="project-updated">last updated — loading…</span>
  </div>
  <p class="project-info__lede">the kanban keeps a live pulse on active experiments without drowning in docs.</p>
  <div class="project-info__details">
    <ul
      class="project-languages"
      id="project-languages"
      data-repo="mandlcho/opencode-todolist"
    >
      <li>loading…</li>
    </ul>
  </div>
</section>

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
