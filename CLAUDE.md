# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev                                   # static server at http://localhost:5173 (npx serve)
npm test                                      # node:test over test/**/*.test.js
node --test --test-name-pattern="6/8" test/rating.test.js   # run a single test by name
npm run icons                                 # regenerate the PNG icons into icons/
```

Requires Node 20+. There's no build step, no linter, and no dependencies. Don't add a framework, bundler, or npm packages. The site is plain HTML, CSS, and ES modules served as-is. Opening `index.html` from `file://` fails because browsers block ES modules there, so always use the dev server.

## Architecture

8mm is a single static page that turns eight criterion scores (0, ½, or 1 each) into a Letterboxd half-star rating. It's deployed to Cloudflare Pages from `main` at 8mm.ananthanandanan.com.

- `src/rating.js` holds the only logic that matters. It's pure and has no DOM access, so `node:test` can import it directly. `calculateRating(scores)` takes one entry per criterion, where `null` means unrated and is different from an intentional `0`. It returns `stars: null` until every criterion is rated. Completed ratings round to the nearest half star and clamp to a minimum of 0.5 (`MIN_STARS`, Letterboxd's lowest rating), and `clamped` flags when that happened. `formatRating` produces the clipboard text, for example `★★★★½ 4.5/5`.
- `src/criteria.js` is the single source for the eight criteria (`id`, `label`, `hint`) and `SCORE_OPTIONS`. Array order is display order. The UI, the film-strip frames, and the keyboard flow all derive from this array.
- `src/app.js` owns the `scores` array and renders everything into the empty containers in `index.html` (`#criteria`, `#stars`, `#strip`). Every change goes through `update()`, which recomputes the rating and updates the figure, star fill (through the `--fill` CSS variable), status line, and copy button state. The keyboard shortcut maps `0`, `5`, and `1` to 0, ½, and 1. It scores the focused row, or the first unrated row, and then moves focus on.
- `scripts/make_icons.py` rasterises the icon with only the Python standard library. It writes the PNGs. `icons/favicon.svg` is hand-written, so keep it in sync by hand if the icon design changes.

## Product constraints

The scope decisions live in `docs/movie_rating_app_brief.md`. Keep to them unless the user says otherwise:

- Exactly eight equally weighted criteria. Don't add Sound, Music, Originality, or weighting.
- No accounts, saved history, movie search, backend, or Letterboxd integration. It's a calculator only.
- Show no rating until all eight criteria are scored.
- The visual style is warm ivory, charcoal type, and amber accents, with Newsreader (serif) and Hanken Grotesk (sans) loaded from Google Fonts.
