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

The app is fully static, so any static host works. On Vercel (Hobby plan):

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Set **Framework Preset** to **Other**. Leave the build command empty and the output directory as the root.
4. Deploy. Every push to `main` redeploys automatically.

GitHub Pages, Netlify, and Cloudflare Pages work the same way.

## Scope

It's just a calculator, so there's no login, no saved history, and no movie search. You get the rating, then go log it on Letterboxd. If you're curious how it got here, [the brief](docs/movie_rating_app_brief.md) has the full backstory.
