export const FILTERS = [
  { id: "all", label: "All" },
  { id: "Party", label: "Party" },
  { id: "Roblox", label: "Roblox" },
  { id: "Family", label: "Family" },
  { id: "Coming soon", label: "Coming soon" },
];

export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

export async function loadCatalog() {
  const response = await fetch("/data/games.json", { cache: "no-cache" });
  if (!response.ok) throw new Error("The game list did not load.");
  const data = await response.json();
  if (!data || !Array.isArray(data.games)) throw new Error("The game list looks wrong.");
  return data.games;
}

export function gameHref(game, extra) {
  const url = new URL(`/play/${game.slug}`, window.location.origin);
  if (extra) {
    for (const [key, value] of Object.entries(extra)) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}`;
}

export function slugFromLocation() {
  const fromQuery = new URLSearchParams(window.location.search).get("game");
  if (fromQuery) return fromQuery;
  const parts = window.location.pathname.split("/").filter(Boolean);
  const index = parts.indexOf("play");
  if (index >= 0 && parts[index + 1] && !parts[index + 1].endsWith(".html")) {
    return decodeURIComponent(parts[index + 1]);
  }
  return "";
}

export function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/** Ping web games so a free Render dyno starts before anyone hits Play. */
export function prewarm(games) {
  const urls = games.filter((game) => game.prewarm && isHttpsUrl(game.url)).map((game) => game.url);
  for (const url of urls) {
    fetch(url, { mode: "no-cors", cache: "no-store", credentials: "omit" }).catch(() => {});
  }
  return urls.length;
}

export function playerLabel(game) {
  return `${game.players} players`;
}

export function badges(game) {
  const items = [];
  if (game.badge) items.push({ kind: game.badge === "New" ? "new" : "plain", label: game.badge });
  if (game.status === "coming-soon") items.push({ kind: "soon", label: "Coming soon" });
  return items;
}
