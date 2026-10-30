# 8mm.

**Eight perspectives. One rating.**

A little calculator for rating movies on Letterboxd.

I watch a lot of movies, and picking a star rating on gut feel alone never quite sat right. Sometimes two films land on the same number even though I liked one a bit more. So now I tap through eight quick questions after the credits roll and get a rating I'm happy to log.

## How it works

Score each criterion **0**, **½**, or **1**:

| Criterion | What it evaluates |
|---|---|
| Story | Plot, narrative structure, coherence, engagement |
| Direction | The director's vision and how the film comes together |
| Acting | Quality, believability, and effectiveness of performances |
| Pacing | Rhythm and flow; whether scenes feel rushed or drawn out |
| Depth | Themes, layers of meaning, thought-provoking ideas |
| Cinematography | Composition, framing, lighting, camera movement |
| Screenplay | Dialogue, scene construction, character development |
| Emotional Impact | How strongly the film affects you and stays with you |

The rating is:

```
stars = round((sum / 8) * 5 * 2) / 2
```

The result is clamped to a minimum of 0.5★, Letterboxd's lowest rating. It appears only after all eight criteria are scored.

Example: 6 / 8 → 3.75 → **4.0★**

## Project structure

```
index.html          Page shell
manifest.webmanifest  Home screen install details
icons/              Favicon and home screen icons
scripts/
  make_icons.py     Draws the PNG icons (npm run icons)
src/
  app.js            UI wiring (render, state, copy, reset)
  criteria.js       The eight criteria and score options
  rating.js         Pure scoring function (no DOM)
  styles.css        Styles
test/
  rating.test.js    Tests for the scoring function
docs/
  movie_rating_app_brief.md   Original product and design brief
```

It uses no framework, no build step, and no dependencies. It's plain HTML, CSS, and ES modules.

## Development

Requires Node 20+ (only for the local server and tests).

```sh
npm run dev    # serves the site at http://localhost:5173
npm test       # runs the scoring tests
```

Opening `index.html` directly from disk won't work, because browsers block ES modules over `file://`. Use the dev server.

## Deployment

The app is fully static and hosted on Cloudflare Pages (free plan).

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repo.
2. Set **Framework preset** to **None**, leave **Build command** empty, and set **Build output directory** to `/`.
3. Save and deploy. Every push to `main` redeploys automatically, and other branches get preview URLs.

To use your own domain, open the project's **Custom domains** tab and add a subdomain like `8mm.yourdomain.com`. If the domain's DNS is on Cloudflare, the record is created for you. Otherwise, add a `CNAME` pointing that subdomain to the project's `*.pages.dev` address. HTTPS is set up automatically either way.

Any other static host (Vercel, Netlify, GitHub Pages) works too, since there's no build step.

Once it's live, open it on your phone and use **Add to Home Screen** (Safari's share menu on iPhone, the ⋮ menu in Chrome on Android). It opens full screen like an app.

## Scope

It's just a calculator, so there's no login, no saved history, and no movie search. You get the rating, then go log it on Letterboxd. If you're curious how it got here, [the brief](docs/movie_rating_app_brief.md) has the full backstory.
