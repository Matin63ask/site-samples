# Repository notes

Static marketing site for **پایا پویش سبز** (Vite + React + Tailwind, fully RTL Persian)
plus a small JSON API for the site's forms.

## Layout

- `web/` — the React site. All page copy and product/article data lives in
  `web/src/data/*.js`; there is no CMS, so content edits happen in those files.
- `server/` — dependency-free Node HTTP API (`node:http`) exposing
  `POST /api/collaboration`, `POST /api/newsletter` and `GET /api/health`.
  Submissions are appended to `/data/submissions.json` (compose volume `api_data`).
  The frontend always calls `/api/...`; Vite proxies it to the `api` service, so the
  site keeps a single public origin (no CORS).

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build   # dev: Vite on :3000, API internal :4000
docker compose -f docker-compose.base44.yml logs -f web
```

- Dependencies install at container start (`npm ci`), so `web/package-lock.json`
  must stay in sync with `web/package.json` — regenerate with
  `npm install --package-lock-only` after changing dependencies.
- Vite uses polling (`watch.usePolling`) because the source lives on a bind mount.

## Sandbox / preview mode

- `web/vite.config.js` accepts the proxied preview host: it allows
  `.${BASE44_SANDBOX_HOST_DOMAIN}` (the sandbox id rotates) plus anything in
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`. Both are passed through by compose.
- `BASE44_PREVIEW_MODE` / `BASE44_SANDBOX_HOST_DOMAIN` are read from the
  platform environment; with them unset the dev server falls back to
  `localhost`/`127.0.0.1` only, so shared behaviour is unchanged.

## Checks

```bash
docker compose -f docker-compose.base44.yml exec -T web npm run build   # full compile of every route
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/          # dev server answers
docker compose -f docker-compose.base44.yml exec -T api node -e "fetch('http://127.0.0.1:4000/api/health').then(r=>r.text()).then(console.log)"
```

## Gotchas

- Pages are registered in `web/src/App.jsx`; `PageHero` supplies the dark soil band
  that the transparent fixed header needs to stay readable, so every inner page
  starts with it.
- Colour and texture tokens (`soil`, `forest`, `leaf`, `sage`, `ivory`, `oat`,
  `.paper-texture`, `.soil-surface`, `.grain-overlay`) are defined in
  `web/tailwind.config.js` and `web/src/index.css` — reuse them instead of new hex
  values.
- Persian digits are converted for display with `toPersianDigits`; user input is
  normalised back with `toLatinDigits` before validation (both client and server).
