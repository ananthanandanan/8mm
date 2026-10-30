# 8mm.

**Eight perspectives. One rating.**

A small calculator for rating movies on Letterboxd. Try it at [8mm.ananthanandanan.com](https://8mm.ananthanandanan.com).

I watch a lot of movies, and rating them on gut feel never sat right with me. Two films would land on the same number even though I clearly liked one more. Now I score eight quick questions after the credits roll and log the rating I get.

## How it works

Score each criterion **0**, **½**, or **1**:

| Criterion | What it covers |
|---|---|
| Story | Plot, structure, coherence, and how engaging it is |
| Direction | The director's vision and how well the film comes together |
| Acting | How believable and effective the performances are |
| Pacing | Rhythm and flow, and whether scenes feel rushed or drawn out |
| Depth | Themes, layers of meaning, and ideas that stay with you |
| Cinematography | Composition, framing, lighting, and camera movement |
| Screenplay | Dialogue, scene construction, and character development |
| Emotional Impact | How strongly the film hits you, and for how long |

8mm turns the total into stars and rounds to the nearest half star:

```
stars = round((sum / 8) * 5 * 2) / 2
```

For example, a total of 6 out of 8 is 3.75, which rounds to **4.0★**.

A few details:

- The rating appears only after you score all eight criteria.
- An all-zero score shows **0.5★**, because that's the lowest rating Letterboxd allows.
- **Copy rating** puts text like `★★★★ 4.0/5` on your clipboard.
- On a keyboard, type `0`, `5`, or `1` to score each criterion in order.

## Run it locally

You need Node 20 or later, but only for the dev server and the tests.

```sh
npm run dev    # serves the site at http://localhost:5173
npm test       # runs the scoring tests
```

Use the dev server rather than opening `index.html` from disk. Browsers block ES modules over `file://`.

## Project structure

There's no framework, no build step, and no dependencies. It's plain HTML, CSS, and ES modules.

```
index.html              Page shell
manifest.webmanifest    Home screen install details
icons/                  Favicon and home screen icons
scripts/
  make_icons.py         Draws the PNG icons (npm run icons)
src/
  app.js                UI wiring (render, state, copy, reset, keyboard)
  criteria.js           The eight criteria and score options
  rating.js             Pure scoring function (no DOM)
  styles.css            Styles
test/
  rating.test.js        Tests for the scoring function
docs/
  movie_rating_app_brief.md   The original brief
```

## Hosting

8mm runs on Cloudflare Pages and is available at [8mm.ananthanandanan.com](https://8mm.ananthanandanan.com).

On your phone, use **Add to Home Screen** (the share menu in Safari on iPhone, or the ⋮ menu in Chrome on Android). It then opens full screen, like an app.

## Scope

8mm is a calculator and nothing more. There's no login, no saved history, and no movie search. You get a rating, then you log it on Letterboxd. [The brief](docs/movie_rating_app_brief.md) explains why it stays that small.
