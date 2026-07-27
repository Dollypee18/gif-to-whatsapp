# Tweet GIF → WhatsApp

MVP: paste an X/Twitter link, get an MP4 you can download or send straight to WhatsApp.

## What's here

- `app/page.js` — the paste-link form + result view
- `app/api/extract/route.js` — takes a tweet URL, hits X's syndication endpoint, returns the best-quality MP4 URL
- No FFmpeg, no storage, no auth. This is deliberately the smallest working slice.

## Status

- ✅ Builds and runs (`npm run build` passes)
- ⚠️ **The extraction call itself is untested.** My build environment can't reach `cdn.syndication.twimg.com`, so I wrote the extraction logic based on the known response shape of that endpoint (used by X's own embed widgets) but haven't confirmed it against a live tweet. This is the one thing you need to verify first.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000, paste a tweet URL with a GIF/video, hit Convert.

## First thing to do

Test `/api/extract` against 5-10 real tweet URLs that contain GIFs. Two outcomes:

1. **It works** → move on to wiring the "Send to WhatsApp" button properly (currently just opens `wa.me` with the raw MP4 link as text, which is a placeholder — WhatsApp doesn't auto-attach files from a URL in that text, so on mobile you'll want to trigger the native share sheet instead once you wrap this as a PWA or app).
2. **Syndication endpoint fails or is inconsistent** → fall back to `yt-dlp` called as a subprocess from the API route. Slower per-request but far more resilient to X changing its page/API structure.

## Known gaps (not built yet)

- No GIF/sticker conversion (FFmpeg) — ship MP4-only first, per the plan
- No handling for private/deleted tweets beyond a generic error
- No rate limiting — add before deploying publicly, since the syndication endpoint will throttle or block naive scraping
- No mobile share-sheet integration — `wa.me` link is a stopgap
