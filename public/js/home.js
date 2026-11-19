import { gameArt } from "./art.js";
import { badges, esc, FILTERS, gameHref, loadCatalog, playerLabel, prewarm } from "./catalog.js";
import { setupInstall } from "./pwa.js";

const root = document.querySelector("#home-root");

function heroActions(game) {
  if (game.status === "coming-soon") {
    return `<a class="btn btn-primary" href="${esc(gameHref(game))}">Take a look</a>`;
  }
  if (game.embed) {
    return `
      <a class="btn btn-primary" href="${esc(gameHref(game, { play: "1" }))}">Play here</a>
      <a class="btn btn-secondary" href="${esc(gameHref(game))}">How to play</a>`;
  }
  if (game.platform === "roblox") {
    return `
      <a class="btn btn-primary" href="${esc(game.url)}" target="_blank" rel="noopener noreferrer">Play on Roblox <span class="sr-only">(opens in a new tab)</span></a>
      <a class="btn btn-secondary" href="${esc(gameHref(game))}">How to play</a>`;
  }
  return `<a class="btn btn-primary" href="${esc(gameHref(game))}">Open game</a>`;
}

function badgeHtml(game, className) {
  return badges(game).map((badge) => {
    const kind = badge.kind === "new" ? "new" : badge.kind === "soon" ? "soon" : "plain";
    return `<span class="${className} ${className}-${kind}">${esc(badge.label)}</span>`;
  }).join("");
}

function tile(game) {
  return `
    <a class="tile" href="${esc(gameHref(game))}" style="--accent:${esc(game.accent)}">
      <div class="tile-art">
        ${gameArt(game.art, `tile-${game.slug}`)}
        <div class="badges">${badgeHtml(game, "badge")}</div>
      </div>
      <div class="tile-body">
        <h3 class="tile-title">${esc(game.title)}</h3>
        <p class="tile-tag">${esc(game.tagline)}</p>
        <p class="tile-meta">${esc(playerLabel(game))}</p>
      </div>
    </a>`;
}

function hero(game) {
  return `
    <section class="hero" aria-labelledby="featured-title">
      <div class="hero-copy">
        <p class="kicker">Featured</p>
        <h2 class="display" id="featured-title">${esc(game.title)}</h2>
        <p class="lede">${esc(game.tagline)}</p>
        <div class="pills">
          <span class="pill">${esc(playerLabel(game))}</span>
          ${game.categories.map((category) => `<span class="pill">${esc(category)}</span>`).join("")}
          ${badgeHtml(game, "pill")}
        </div>
        <div class="actions">${heroActions(game)}</div>
      </div>
      <div class="hero-art">
        ${gameArt(game.art, "hero")}
        <div class="sticker">${esc(playerLabel(game))}</div>
      </div>
    </section>`;
}

function page(games) {
  const featured = games.find((game) => game.featured) || games[0];
  return `
    ${hero(featured)}
    <div class="section-row">
      <h2>All games</h2>
      <p id="catalog-status" aria-live="polite"></p>
    </div>
    <div class="toolbar">
      <div class="filters" role="group" aria-label="Filter by category">
        ${FILTERS.map((filter) => `
          <button class="chip" type="button" data-cat="${esc(filter.id)}" aria-pressed="false">${esc(filter.label)}</button>
        `).join("")}
      </div>
      <form class="search" role="search" autocomplete="off">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#6a4b3a" stroke-width="2.4" stroke-linecap="round">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="M20 20l-3.5-3.5"></path>
        </svg>
        <label class="sr-only" for="game-search">Search games</label>
        <input id="game-search" type="search" placeholder="Search games" enterkeyhint="search">
      </form>
    </div>
    <div id="grid" class="grid"></div>`;
}

function readState() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("cat") || "all";
  const known = new Set(FILTERS.map((filter) => filter.id));
  return {
    cat: known.has(requested) ? requested : "all",
    q: params.get("q") || "",
  };
}

function matches(game, state) {
  if (state.cat !== "all" && !game.categories.includes(state.cat)) return false;
  const query = state.q.trim().toLowerCase();
  if (!query) return true;
  const haystack = [game.title, game.tagline, game.description, game.players, game.where, ...game.categories]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function start(games) {
  root.innerHTML = page(games);
  const state = readState();
  const grid = root.querySelector("#grid");
  const status = root.querySelector("#catalog-status");
  const input = root.querySelector("#game-search");
  const chips = [...root.querySelectorAll("[data-cat]")];
  input.value = state.q;

  function draw() {
    const shown = games.filter((game) => matches(game, state));
    chips.forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.cat === state.cat)));
    status.textContent = shown.length === games.length
      ? `${games.length} games`
      : `${shown.length} of ${games.length}`;
    grid.innerHTML = shown.length
      ? shown.map(tile).join("")
      : `<div class="empty"><p>Nothing on the grill for that search.</p><button class="btn btn-secondary" type="button" data-clear>Show every game</button></div>`;

    const url = new URL(window.location.href);
    if (state.cat === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", state.cat);
    if (state.q) url.searchParams.set("q", state.q);
    else url.searchParams.delete("q");
    const next = `${url.pathname}${url.search}`;
    if (`${window.location.pathname}${window.location.search}` !== next) {
      history.replaceState(null, "", next);
    }
  }

  root.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-cat]");
    if (chip) {
      state.cat = chip.dataset.cat;
      draw();
    }
    if (event.target.closest("[data-clear]")) {
      state.cat = "all";
      state.q = "";
      input.value = "";
      draw();
      input.focus();
    }
  });

  input.addEventListener("input", () => {
    state.q = input.value;
    draw();
  });

  root.querySelector(".search").addEventListener("submit", (event) => event.preventDefault());

  window.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) {
      event.preventDefault();
      input.focus();
    }
  });

  draw();
}

setupInstall();

loadCatalog()
  .then((games) => {
    prewarm(games);
    start(games);
  })
  .catch(() => {
    root.innerHTML = `<p class="error">The shelf didn't load. Refresh the page in a moment.</p>`;
  });
