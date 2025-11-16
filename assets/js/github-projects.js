const GithubProjects = (() => {
  const ONE_HOUR = 60 * 60 * 1000;
  const OWNER_STORAGE_PREFIX = "github_repo_owner_";
  const REPO_STORAGE_PREFIX = "github_repo_single_";
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
    return {
      owner,
      name,
      ownerKey: owner.toLowerCase(),
      repoKey: name.toLowerCase(),
      repoFull: `${owner}/${name}`,
      repoFullKey: `${owner.toLowerCase()}/${name.toLowerCase()}`
    };
  }

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Ignore quota errors.
    }
  }

  function safeRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore removal errors.
    }
  }

  function readJSON(key) {
    const raw = safeGet(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (error) {
      safeRemove(key);
      return null;
    }
  }

  function runtimeStore(namespace) {
    const globalName = `__github${namespace}`;
    if (!window[globalName]) {
      window[globalName] = {};
    }
    return window[globalName];
  }

  function getOwnerPayload(ownerKey) {
    return readJSON(`${OWNER_STORAGE_PREFIX}${ownerKey}`);
  }

  function cacheOwnerPayload(ownerKey, payload) {
    safeSet(`${OWNER_STORAGE_PREFIX}${ownerKey}`, JSON.stringify(payload));
  }

  function getRepoPayload(repoKey) {
    return readJSON(`${REPO_STORAGE_PREFIX}${repoKey}`);
  }

  function cacheRepoPayload(repoKey, payload) {
    safeSet(`${REPO_STORAGE_PREFIX}${repoKey}`, JSON.stringify(payload));
  }

  function fetchOwnerRepos(owner, ownerKey, fallback) {
    const now = Date.now();
    const memory = runtimeStore("OwnerStore");
    if (memory[ownerKey] && now - memory[ownerKey].timestamp < ONE_HOUR) {
      return Promise.resolve(memory[ownerKey].data);
    }

    const localData = fallback || getOwnerPayload(ownerKey);
    if (localData && now - localData.timestamp < ONE_HOUR) {
      memory[ownerKey] = localData;
      return Promise.resolve(localData.data);
    }

    const inflight = runtimeStore("OwnerPromises");
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
        memory[ownerKey] = payload;
        cacheOwnerPayload(ownerKey, payload);
        return repoList;
      })
      .catch(error => {
        if (localData && localData.data) {
          memory[ownerKey] = localData;
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

  function fetchSingleRepo(repoFull, repoFullKey) {
    const now = Date.now();
    const memory = runtimeStore("RepoStore");
    if (memory[repoFullKey] && now - memory[repoFullKey].timestamp < ONE_HOUR) {
      return Promise.resolve(memory[repoFullKey].data);
    }

    const localData = getRepoPayload(repoFullKey);
    if (localData && now - localData.timestamp < ONE_HOUR) {
      memory[repoFullKey] = localData;
      return Promise.resolve(localData.data);
    }

    const inflight = runtimeStore("RepoPromises");
    if (inflight[repoFullKey]) {
      return inflight[repoFullKey];
    }

    const request = fetch(`https://api.github.com/repos/${repoFull}`, { headers: HEADERS })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(repoData => {
        const payload = { timestamp: Date.now(), data: repoData };
        memory[repoFullKey] = payload;
        cacheRepoPayload(repoFullKey, payload);
        return repoData;
      })
      .catch(error => {
        if (localData && localData.data) {
          memory[repoFullKey] = localData;
          return localData.data;
        }
        throw error;
      })
      .finally(() => {
        delete inflight[repoFullKey];
      });

    inflight[repoFullKey] = request;
    return request;
  }

  function applyRepoData(entries, repoList) {
    const missing = [];
    if (!repoList || !repoList.length) {
      return entries.slice();
    }

    const lookup = new Map();
    repoList.forEach(repo => {
      if (repo && repo.name) {
        lookup.set(repo.name.toLowerCase(), repo);
      }
    });

    entries.forEach(entry => {
      const repoData = lookup.get(entry.repoKey);
      if (repoData) {
        updateCardWithData(entry.card, repoData);
      } else {
        missing.push(entry);
      }
    });

    return missing;
  }

  function fetchMissingRepos(entries) {
    entries.forEach(entry => {
      fetchSingleRepo(entry.repoFull, entry.repoFullKey)
        .then(repoData => updateCardWithData(entry.card, repoData))
        .catch(() => setCardToErrorState(entry.card));
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

      owners.get(parsed.ownerKey).entries.push({
        repoKey: parsed.repoKey,
        repoFull: parsed.repoFull,
        repoFullKey: parsed.repoFullKey,
        card
      });

      const cachedRepo = getRepoPayload(parsed.repoFullKey);
      if (cachedRepo && cachedRepo.data) {
        updateCardWithData(card, cachedRepo.data);
      }
    });

    owners.forEach(({ owner, entries }, ownerKey) => {
      const storedOwner = getOwnerPayload(ownerKey);
      let missingFromStored = [];
      if (storedOwner && storedOwner.data) {
        missingFromStored = applyRepoData(entries, storedOwner.data);
      }

      fetchOwnerRepos(owner, ownerKey, storedOwner)
        .then(repoList => {
          const missing = applyRepoData(entries, repoList);
          if (missing.length) {
            fetchMissingRepos(missing);
          }
        })
        .catch(() => {
          const targets = missingFromStored.length ? missingFromStored : entries;
          fetchMissingRepos(targets);
        });
    });
  }

  ready(hydrateCards);
  return { refresh: hydrateCards };
})();
