const GithubProjects = (() => {
  const ONE_HOUR = 60 * 60 * 1000;
  const STORAGE_PREFIX = "github_repo_owner_";
  const HEADERS = { Accept: "application/vnd.github+json" };
  const LANGUAGE_FALLBACK = "rgba(148, 163, 184, 0.6)";
  const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    Ruby: "#701516",
    Python: "#3572a5",
    Shell: "#89e051",
    Markdown: "#083fa1",
    JSON: "#292929"
  };

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function updateCardWithData(card, repoData) {
    const starsEl = card.querySelector("[data-stars-value]");
    const forksEl = card.querySelector("[data-forks-value]");
    const updatedEl = card.querySelector("[data-updated-value]");
    const languageLabel = card.querySelector("[data-language-label]");
    const languageSwatch = card.querySelector("[data-language-swatch]");

    if (starsEl && typeof repoData.stargazers_count === "number") {
      starsEl.textContent = repoData.stargazers_count;
    }

    if (forksEl && typeof repoData.forks_count === "number") {
      forksEl.textContent = repoData.forks_count;
    }

    if (languageLabel && repoData.language) {
      languageLabel.textContent = repoData.language;
    }

    if (languageSwatch && repoData.language) {
      const color = LANGUAGE_COLORS[repoData.language] || LANGUAGE_FALLBACK;
      languageSwatch.style.setProperty("--lang-color", color);
    }

    if (updatedEl && repoData.pushed_at) {
      const updatedDate = new Date(repoData.pushed_at);
      updatedEl.textContent = `updated — ${updatedDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
      })}`;
    }
  }

  function setCardToErrorState(card) {
    const starsEl = card.querySelector("[data-stars-value]");
    const forksEl = card.querySelector("[data-forks-value]");
    const updatedEl = card.querySelector("[data-updated-value]");
    if (starsEl) starsEl.textContent = "—";
    if (forksEl) forksEl.textContent = "—";
    if (updatedEl) updatedEl.textContent = "updated — unavailable";
  }

  function parseRepo(value) {
    if (!value || value.indexOf("/") === -1) return null;
    const parts = value.split("/");
    const owner = parts[0]?.trim();
    const name = parts[1]?.trim();
    if (!owner || !name) return null;
    return { owner, ownerKey: owner.toLowerCase(), name, repoKey: name.toLowerCase() };
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Swallow quota errors.
    }
  }

  function removeStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore removal errors.
    }
  }

  function getStoredOwnerData(ownerKey) {
    const raw = readStorage(`${STORAGE_PREFIX}${ownerKey}`);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.data)) return null;
      return parsed;
    } catch (error) {
      removeStorage(`${STORAGE_PREFIX}${ownerKey}`);
      return null;
    }
  }

  function cacheOwnerData(ownerKey, payload) {
    writeStorage(`${STORAGE_PREFIX}${ownerKey}`, JSON.stringify(payload));
  }

  function runtimeStore() {
    if (!window.__githubOwnerStore) {
      window.__githubOwnerStore = {};
    }
    return window.__githubOwnerStore;
  }

  function inflightStore() {
    if (!window.__githubOwnerPromises) {
      window.__githubOwnerPromises = {};
    }
    return window.__githubOwnerPromises;
  }

  function fetchOwnerRepos(owner, ownerKey, fallback) {
    const now = Date.now();
    const store = runtimeStore();
    if (store[ownerKey] && now - store[ownerKey].timestamp < ONE_HOUR) {
      return Promise.resolve(store[ownerKey].data);
    }

    const localData = fallback || getStoredOwnerData(ownerKey);
    if (localData && now - localData.timestamp < ONE_HOUR) {
      store[ownerKey] = localData;
      return Promise.resolve(localData.data);
    }

    const inflight = inflightStore();
    if (inflight[ownerKey]) {
      return inflight[ownerKey];
    }

    const endpoint = `https://api.github.com/users/${owner}/repos?per_page=100&type=owner&sort=updated`;
    const request = fetch(endpoint, { headers: HEADERS })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(repoList => {
        const payload = { timestamp: Date.now(), data: repoList };
        store[ownerKey] = payload;
        cacheOwnerData(ownerKey, payload);
        return repoList;
      })
      .catch(error => {
        if (localData && localData.data) {
          store[ownerKey] = localData;
          return localData.data;
        }
        throw error;
      })
      .finally(() => {
        delete inflight[ownerKey];
      });

    inflight[ownerKey] = request;
    return request;
  }

  function applyRepoData(entries, repoList) {
    if (!repoList || !repoList.length) {
      entries.forEach(entry => setCardToErrorState(entry.card));
      return;
    }

    const lookup = new Map();
    repoList.forEach(repo => {
      if (repo && repo.name) {
        lookup.set(repo.name.toLowerCase(), repo);
      }
    });

    entries.forEach(({ repoKey, card }) => {
      const repoData = lookup.get(repoKey);
      if (repoData) {
        updateCardWithData(card, repoData);
      } else {
        setCardToErrorState(card);
      }
    });
  }

  function hydrateCards() {
    const cards = Array.from(document.querySelectorAll(".project-card[data-repo]"));
    if (!cards.length) return;

    const owners = new Map();
    cards.forEach(card => {
      const parsed = parseRepo(card.getAttribute("data-repo"));
      if (!parsed) {
        setCardToErrorState(card);
        return;
      }

      if (!owners.has(parsed.ownerKey)) {
        owners.set(parsed.ownerKey, { owner: parsed.owner, entries: [] });
      }
      owners.get(parsed.ownerKey).entries.push({ repoKey: parsed.repoKey, card });
    });

    owners.forEach(({ owner, entries }, ownerKey) => {
      const stored = getStoredOwnerData(ownerKey);
      if (stored && stored.data) {
        applyRepoData(entries, stored.data);
      }

      fetchOwnerRepos(owner, ownerKey, stored)
        .then(repoList => applyRepoData(entries, repoList))
        .catch(() => {
          if (!stored) {
            entries.forEach(entry => setCardToErrorState(entry.card));
          }
        });
    });
  }

  ready(hydrateCards);
  return { refresh: hydrateCards };
})();
