const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataPath = path.join(root, "public", "data", "games.json");
const artPath = path.join(root, "public", "js", "art.js");
const checkLinks = process.argv.includes("--links");

const CATEGORIES = ["Party", "Roblox", "Family", "Coming soon"];
const REQUIRED_FILES = [
  "public/index.html",
  "public/play.html",
  "public/css/styles.css",
  "public/js/home.js",
  "public/js/play.js",
  "public/js/catalog.js",
  "public/js/art.js",
  "public/js/pwa.js",
  "public/sw.js",
  "public/manifest.webmanifest",
  "public/icons/logo.svg",
  "public/icons/favicon.svg",
  "public/icons/icon-192.png",
  "public/icons/icon-512.png",
  "public/icons/apple-touch-icon.png",
  "render.yaml",
];

const errors = [];
const warnings = [];
const linkNotes = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function isHttps(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function artIds() {
  const source = fs.readFileSync(artPath, "utf8");
  const match = source.match(/const ARTS = \{([^}]+)\}/);
  if (!match) {
    fail("public/js/art.js is missing the ARTS map.");
    return new Set();
  }
  return new Set(match[1].split(",").map((part) => part.trim()).filter(Boolean));
}

function validateShape(games, ids) {
  if (!Array.isArray(games) || games.length === 0) {
    fail("games.json needs a non-empty games array.");
    return;
  }

  const slugs = new Set();
  const featured = games.filter((game) => game.featured === true);
  if (featured.length !== 1) fail(`Exactly one game should be featured. Found ${featured.length}.`);

  for (const game of games) {
    const name = game && game.slug ? game.slug : "(missing slug)";
    if (!game || typeof game !== "object") {
      fail("Each game must be an object.");
      continue;
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.slug || "")) fail(`${name}: slug must be kebab-case.`);
    if (slugs.has(game.slug)) fail(`${name}: duplicate slug.`);
    slugs.add(game.slug);

    for (const field of ["title", "tagline", "description", "players", "where", "platform", "status", "art"]) {
      if (typeof game[field] !== "string" || !game[field].trim()) fail(`${name}: ${field} is required.`);
    }
    if (typeof game.title === "string" && game.title.length > 48) fail(`${name}: title is too long for a tile.`);
    if (typeof game.tagline === "string" && game.tagline.length > 90) fail(`${name}: tagline is too long for a tile.`);
    if (typeof game.description === "string" && game.description.length < 80) fail(`${name}: description is too short.`);
    if (!/^#[0-9a-fA-F]{6}$/.test(game.accent || "")) fail(`${name}: accent must be a #rrggbb color.`);
    if (!ids.has(game.art)) fail(`${name}: art "${game.art}" is not in public/js/art.js.`);
    if (game.badge !== null && game.badge !== "New") fail(`${name}: badge must be null or "New".`);
    if (!Array.isArray(game.categories) || game.categories.length === 0) fail(`${name}: categories must be a non-empty array.`);
    else {
      for (const category of game.categories) {
        if (!CATEGORIES.includes(category)) fail(`${name}: unknown category "${category}".`);
      }
    }
    if (!Array.isArray(game.howToPlay) || game.howToPlay.length < 3) fail(`${name}: howToPlay needs at least 3 steps.`);
    else {
      for (const step of game.howToPlay) {
        if (typeof step !== "string" || step.trim().length < 12) fail(`${name}: each how-to-play step needs a full sentence.`);
      }
    }
    if (!["web", "roblox"].includes(game.platform)) fail(`${name}: platform must be web or roblox.`);
    if (!["ready", "coming-soon"].includes(game.status)) fail(`${name}: status must be ready or coming-soon.`);
    if (typeof game.embed !== "boolean" || typeof game.prewarm !== "boolean" || typeof game.featured !== "boolean") {
      fail(`${name}: embed, prewarm, and featured must be booleans.`);
    }

    const coming = game.status === "coming-soon";
    const markedComing = Array.isArray(game.categories) && game.categories.includes("Coming soon");
    if (coming !== markedComing) fail(`${name}: "Coming soon" status and category have to match.`);

    if (coming) {
      if (game.url !== null) fail(`${name}: a coming-soon game has no url yet.`);
      if (game.embed || game.prewarm) fail(`${name}: coming-soon games are not embeddable and are not prewarmed.`);
    } else if (!isHttps(game.url)) {
      fail(`${name}: ready games need an https url.`);
    }

    if (game.platform === "web" && !coming) {
      if (game.prewarm !== true) fail(`${name}: web games should set prewarm true so the free server wakes up.`);
      if (game.embed && !isHttps(game.url)) fail(`${name}: embed requires an https url.`);
    }
    if (game.platform === "roblox") {
      if (game.embed || game.prewarm) fail(`${name}: Roblox games are not embedded or prewarmed.`);
      if (!coming && !/roblox\.com\/games\/\d+/.test(game.url || "")) {
        fail(`${name}: Roblox url should look like https://www.roblox.com/games/<id>.`);
      }
    }
    if (game.platform === "web" && game.categories?.includes("Roblox")) {
      fail(`${name}: a browser game should not be filed under Roblox.`);
    }
  }
}

function frameable(headers) {
  const xfo = (headers.get("x-frame-options") || "").toLowerCase();
  if (xfo.includes("deny") || xfo.includes("sameorigin")) {
    return { ok: false, reason: `X-Frame-Options: ${headers.get("x-frame-options")}` };
  }
  const csp = headers.get("content-security-policy") || "";
  const match = csp.match(/frame-ancestors\s+([^;]+)/i);
  if (match && !match[1].trim().split(/\s+/).includes("*")) {
    return { ok: false, reason: `CSP frame-ancestors ${match[1].trim()}` };
  }
  return { ok: true, reason: "no frame-blocking header" };
}

async function checkWeb(game) {
  const response = await fetch(game.url, {
    redirect: "follow",
    signal: AbortSignal.timeout(60000),
    headers: { "User-Agent": "Mozilla/5.0 RochGamesLinkCheck" },
  });
  if (!response.ok) fail(`${game.slug}: ${game.url} returned ${response.status}.`);
  const framing = frameable(response.headers);
  linkNotes.push(`${game.slug}: HTTP ${response.status}; ${framing.reason}`);
  if (game.embed && !framing.ok) {
    fail(`${game.slug}: embed is true, but the host refuses framing (${framing.reason}).`);
  }
  await response.arrayBuffer();
}

async function checkRoblox(game) {
  const match = String(game.url).match(/\/games\/(\d+)/);
  const api = `https://apis.roblox.com/universes/v1/places/${match[1]}/universe`;
  const response = await fetch(api, {
    signal: AbortSignal.timeout(20000),
    headers: { "User-Agent": "Mozilla/5.0 RochGamesLinkCheck" },
  });
  if (!response.ok) {
    fail(`${game.slug}: Roblox place API returned ${response.status}.`);
    return;
  }
  const body = await response.json();
  if (!body.universeId) fail(`${game.slug}: Roblox place did not resolve to a universe.`);
  else linkNotes.push(`${game.slug}: place ${match[1]} resolves to universe ${body.universeId}.`);

  try {
    const page = await fetch(game.url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const framing = frameable(page.headers);
    linkNotes.push(`${game.slug}: public page HTTP ${page.status}; ${framing.reason}`);
    if (framing.ok) warn(`${game.slug}: expected Roblox to block framing.`);
    if (page.status !== 200) {
      warn(`${game.slug}: the public Roblox page returned ${page.status} to this client. The place id still resolves, and the site keeps the link you open from a phone.`);
    }
    await page.arrayBuffer().catch(() => {});
  } catch (error) {
    warn(`${game.slug}: could not read the public Roblox page (${error.message}).`);
  }
}

async function checkAllLinks(games) {
  await Promise.all(games.map(async (game) => {
    try {
      if (game.status === "coming-soon") return;
      if (game.platform === "web") await checkWeb(game);
      if (game.platform === "roblox") await checkRoblox(game);
    } catch (error) {
      fail(`${game.slug}: link check failed (${error.message}).`);
    }
  }));
}

function validateSiteFiles() {
  for (const file of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(root, file))) fail(`Missing ${file}.`);
  }
  const yaml = fs.readFileSync(path.join(root, "render.yaml"), "utf8");
  if (!/name:\s*roch-games/.test(yaml)) fail("render.yaml must name the service roch-games.");
  if (!/runtime:\s*static/.test(yaml)) fail("render.yaml must be a static site.");
  if (!/staticPublishPath:\s*\.\/public/.test(yaml)) fail("render.yaml must publish ./public.");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "public", "manifest.webmanifest"), "utf8"));
  if (manifest.display !== "standalone") fail("The web manifest must use standalone display.");
  if (!manifest.icons?.some((icon) => icon.sizes === "192x192")) fail("Manifest needs a 192 icon.");
  if (!manifest.icons?.some((icon) => icon.sizes === "512x512")) fail("Manifest needs a 512 icon.");
}

async function main() {
  validateSiteFiles();
  let games = [];
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    games = data.games;
    validateShape(games, artIds());
  } catch (error) {
    fail(`Could not read games.json (${error.message}).`);
  }

  if (checkLinks && errors.length === 0) await checkAllLinks(games);

  for (const note of linkNotes) console.log(`link  ${note}`);
  for (const warning of warnings) console.log(`warn  ${warning}`);
  if (errors.length) {
    for (const error of errors) console.error(`error ${error}`);
    process.exit(1);
  }
  const titles = Array.isArray(games) ? games.map((game) => game.title).join(", ") : "";
  console.log(`ok    ${Array.isArray(games) ? games.length : 0} games${titles ? `: ${titles}` : ""}`);
}

main();
