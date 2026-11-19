# Roch Games

A small game shelf for Mike Rocha’s games. Friends and family open one link, see every game as a big tile, and jump in. No accounts.

The site is static HTML, CSS, and JavaScript. The whole catalog lives in [`public/data/games.json`](public/data/games.json).

## Games

| Game | Where it runs |
| --- | --- |
| Roch-a-Doodle | Browser. Drawing telephone for 3–12. |
| Rochasaurus Rex | Browser. Quip-and-vote party game for 3–10. Featured on the home page. |
| Know Your Roch | Browser. Family hot-seat game for 2–10. Marked New. |
| Backyard Cookout | Roblox. Opens in the Roblox app. |
| Daybreak on the Harvesting | Coming soon. 48-player Roblox battle royale. |

Browser games are hosted on Render’s free tier, so the first visit after a nap can take up to a minute. The portal pings those URLs when a page loads, and the game page says so while the server wakes up.

## Run it locally

```bash
npm start
```

Open http://localhost:4173. The dev server rewrites `/play/<slug>` to the game page, the same way Render does.

## Check the catalog

```bash
npm test
```

That validates `public/data/games.json` (slugs, categories, player counts, how-to-play steps, art keys, the featured flag) and requests every live URL. `npm run test:schema` skips the network.

## Add a game

1. Add an object to the `games` array in `public/data/games.json`. Order in that array is the order on the shelf.
2. Point `art` at a drawing in `public/js/art.js` (`doodle`, `rex`, `family`, `cookout`, `daybreak`). An unknown name falls back to a plain mark, so a new game still renders.
3. Set `featured` on exactly one game. Use `"badge": "New"` for a new tile. Categories are `Party`, `Roblox`, `Family`, and `Coming soon`.
4. Run `npm test`.

A ready browser game needs an `https` `url`, `"embed": true` only if the host allows framing, and `"prewarm": true`. Roblox games stay `"embed": false`. A coming-soon game uses `"status": "coming-soon"`, `"url": null`, and the Coming soon category.

## Deploy on Render

The repo includes a [Render Blueprint](https://render.com/docs/blueprint-spec) at `render.yaml`.

1. In the Render dashboard, choose **New +** → **Blueprint**.
2. Connect the `dirtyroch/roch-games` repo and the branch you want to publish.
3. Render reads `render.yaml` and creates a **static** site named **roch-games**. The publish directory is `public`. The build command checks the game list. `/play/*` rewrites to `play.html`.
4. Deploy. The free static site stays up. The games it links to are separate web services and can still sleep.

To create the site by hand instead of the Blueprint: static site, build command `node scripts/validate-games.js`, publish directory `public`, and a rewrite from `/play/*` to `/play.html`.

## Install it

The site is a PWA. On Android, use **Install** when the browser offers it, or the browser menu. On iPhone, use Share → **Add to Home Screen**.
