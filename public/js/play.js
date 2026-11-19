import { gameArt } from "./art.js";
import {
  badges,
  esc,
  isHttpsUrl,
  loadCatalog,
  playerLabel,
  prewarm,
  slugFromLocation,
} from "./catalog.js";
import { setupInstall } from "./pwa.js";

const root = document.querySelector("#play-root");
const stage = document.querySelector("#stage");
const frameHost = stage.querySelector(".stage-frame");
const veil = stage.querySelector(".stage-veil");
const wakeLine = stage.querySelector("[data-wake]");
const veilText = stage.querySelector("[data-veil]");
const fullLink = stage.querySelector("[data-full]");
const closeButton = stage.querySelector("[data-close]");

let slowTimer = 0;

function badgeRow(game) {
  return badges(game).map((badge) => {
    const kind = badge.kind === "new" ? "pill-new" : badge.kind === "soon" ? "pill-soon" : "";
    return `<span class="pill ${kind}">${esc(badge.label)}</span>`;
  }).join("");
}

function wakeCopy(game) {
  if (game.prewarm) {
    return "Waking up the server in the background. These games nap on a free host, so the first visit can take up to a minute.";
  }
  if (game.platform === "roblox" && game.status !== "coming-soon") {
    return "This one opens in Roblox. It can’t be played inside the page.";
  }
  if (game.status === "coming-soon") {
    return "Not playable yet. The shelf is saving a seat.";
  }
  return "";
}

function actions(game) {
  if (game.status === "coming-soon") {
    return `<button class="btn btn-primary" type="button" disabled>Coming soon</button>`;
  }
  if (game.embed && isHttpsUrl(game.url)) {
    return `
      <button class="btn btn-primary" type="button" data-play>Play here</button>
      <a class="btn btn-secondary" href="${esc(game.url)}" target="_blank" rel="noopener noreferrer">Open full screen <span class="sr-only">(opens in a new tab)</span></a>`;
  }
  if (isHttpsUrl(game.url)) {
    const label = game.platform === "roblox" ? "Play on Roblox" : "Open full screen";
    return `<a class="btn btn-primary" href="${esc(game.url)}" target="_blank" rel="noopener noreferrer">${label} <span class="sr-only">(opens in a new tab)</span></a>`;
  }
  return "";
}

function render(game) {
  document.title = `${game.title} · Roch Games`;
  const note = wakeCopy(game);
  root.innerHTML = `
    <a class="back" href="/">← All games</a>
    <div class="game-layout">
      <article class="panel">
        <p class="kicker">${esc(game.where)}</p>
        <h1>${esc(game.title)}</h1>
        <div class="facts">
          <span class="fact">${esc(playerLabel(game))}</span>
          ${game.categories.map((category) => `<span class="fact">${esc(category)}</span>`).join("")}
          ${badgeRow(game)}
        </div>
        <p class="description">${esc(game.description)}</p>
        ${note ? `<p class="wake">${esc(note)}</p>` : ""}
        <div class="actions">${actions(game)}</div>
        <h2>How to play</h2>
        <ol class="steps">
          ${game.howToPlay.map((step, index) => `
            <li><span class="num">${index + 1}</span><span>${esc(step)}</span></li>
          `).join("")}
        </ol>
      </article>
      <div class="game-art">${gameArt(game.art, `page-${game.slug}`)}</div>
    </div>`;

  const play = root.querySelector("[data-play]");
  play?.addEventListener("click", () => openStage(game));
  return game;
}

function mountFrame(game) {
  frameHost.querySelector("iframe")?.remove();
  const frame = document.createElement("iframe");
  frame.title = `Play ${game.title}`;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "fullscreen; autoplay; clipboard-write; gamepad";
  frame.addEventListener("load", () => {
    let href = "";
    try {
      href = frame.contentWindow.location.href;
    } catch {
      href = "ready";
    }
    if (href.startsWith("about:")) return;
    clearTimeout(slowTimer);
    veil.hidden = true;
    wakeLine.textContent = "Server's up";
  });
  frame.src = game.url;
  frameHost.appendChild(frame);
}

function openStage(game) {
  if (!game.embed || !isHttpsUrl(game.url)) return;
  stage.hidden = false;
  document.body.classList.add("stage-open");
  stage.querySelector("[data-title]").textContent = game.title;
  fullLink.href = game.url;
  veil.hidden = false;
  veilText.textContent = "Waking up the server…";
  wakeLine.textContent = "Waking up the server…";
  clearTimeout(slowTimer);
  slowTimer = setTimeout(() => {
    if (veil.hidden) return;
    veilText.textContent = "Still waking up the server…";
    wakeLine.textContent = "Still waking up…";
  }, 12000);
  mountFrame(game);
  closeButton.focus();
}

function closeStage() {
  clearTimeout(slowTimer);
  stage.hidden = true;
  document.body.classList.remove("stage-open");
  frameHost.querySelector("iframe")?.remove();
  const play = root.querySelector("[data-play]");
  play?.focus();
}

closeButton.addEventListener("click", closeStage);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !stage.hidden) closeStage();
});

function missing() {
  document.title = "Game not found · Roch Games";
  root.innerHTML = `
    <a class="back" href="/">← All games</a>
    <article class="panel">
      <h1>That game isn't on the shelf</h1>
      <p class="description">The link may be old. The rest of the games are still on the home page.</p>
      <div class="actions"><a class="btn btn-primary" href="/">All games</a></div>
    </article>`;
}

setupInstall();

loadCatalog()
  .then((games) => {
    prewarm(games);
    const slug = slugFromLocation();
    const game = games.find((item) => item.slug === slug);
    if (!game) {
      missing();
      return;
    }
    render(game);
    const autoplay = new URLSearchParams(window.location.search).get("play") === "1";
    if (autoplay && game.embed && game.status !== "coming-soon") openStage(game);
  })
  .catch(() => {
    root.innerHTML = `<p class="error">The shelf didn't load. Refresh the page in a moment.</p>`;
  });
