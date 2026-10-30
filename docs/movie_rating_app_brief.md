# 8mm — Movie Rating Calculator | Product & Design Brief

> **Status:** Concept / planning only. No application has been implemented.
> **Purpose:** Handoff context for continuing design and implementation in Codex.

## 1. The idea and identity

**Selected name: 8mm** (decided by the user). The name refers both to the app’s **eight rating criteria** and to the **8mm motion-picture film format**. Use **8mm** consistently in the UI, document titles, and future implementation; **8mm.** (with a period) is an optional wordmark styling, not a different name.

**Proposed tagline:** “Eight perspectives. One rating.” An alternative is “Every film deserves a closer look.” Neither tagline is mandatory.

The name has not been checked for domain or trademark availability.



Build a **minimalist, aesthetically pleasing, single-page web application** for personal use that helps a viewer calculate a consistent movie rating **out of 5 stars**, suitable for copying into Letterboxd.

The app should feel more like a beautifully designed calculator than a social platform or film database. Its primary purpose is to turn quick judgments about a movie into a final star rating.

**Core user flow:** Open the page → score the movie on eight criteria → see the calculated rating update immediately → copy the rating if desired.

The intended workflow should be quick, frictionless, and comfortably usable after watching a movie (ideally less than a minute once familiar).

## 2. Agreed rating criteria

The user explicitly chose **eight** criteria and does **not** want to expand to ten:

| # | Criterion | What it evaluates |
|---|---|---|
| 1 | **Story** | Plot, narrative structure, coherence, and how engaging the story is. |
| 2 | **Direction** | The director's vision and how effectively the film comes together. |
| 3 | **Acting** | Quality, believability, and effectiveness of performances. |
| 4 | **Pacing** | Narrative rhythm, flow, and whether scenes feel rushed or drawn out. |
| 5 | **Depth** | Themes, layers of meaning, complexity, and thought-provoking ideas. |
| 6 | **Cinematography** | Composition, framing, lighting, camera movement, and visual storytelling. |
| 7 | **Screenplay** | Dialogue, scene construction, character development, and execution of the story. |
| 8 | **Emotional Impact** | How strongly the film affects the viewer and how much it stays with them. |

**Important distinctions:**
- **Story vs. Screenplay:** A strong premise or plot does not guarantee strong dialogue or scene writing.
- **Depth vs. Emotional Impact:** A movie can be intellectually rich without being moving; a simple movie can be emotionally powerful.
- **Depth is not a requirement for greatness:** A straightforward comedy, romance, or action film can be excellent without philosophical complexity.

Do not add **Sound/Music** or **Originality** as new criteria by default. Both were suggested earlier, but the user deliberately settled on these eight.

## 3. Scoring model (current preferred starting point)

The discussion favored **simple scoring** over nuanced scoring for the initial version:

- Each criterion receives **0**, **0.5**, or **1** point.
- Eight criteria yield a maximum raw score of **8**.
- Convert the total to a five-star scale:

  `raw_5_star_score = (sum_of_eight_scores / 8) * 5`

- Letterboxd uses half-star steps; round to the nearest **0.5 star**:

  `letterboxd_score = round(raw_5_star_score * 2) / 2`

- Letterboxd's displayed rating range is **0.5–5**; if needed, clamp a completed rating to a minimum of 0.5 (but see the unanswered question about an all-zero rating).
- In the earlier calculator example, the eight criteria were **equally weighted**. Equal weighting is the initial default; weighting can be revisited only if experience shows a problem.

**Example:** A raw total of 6 out of 8 becomes 3.75 / 5, which rounds to 4.0 / 5 on the half-star scale.

### Alternative considered but not selected

Each criterion could instead be scored from **1 to 5, in 0.5 increments**, with the average producing the final rating. This allows more nuanced judgments but demands more input. **The preferred initial choice is the simpler 0 / 0.5 / 1 system.**

### Important UX refinement

The last discussion suggested **starting each criterion as unselected**, rather than preselecting 0.5. This avoids showing a misleading finished rating before the viewer has made any evaluations.

Suggested behavior for implementation discussion:
- Represent unanswered criteria as `null`, distinct from an intentional `0`.
- Make completion state visible, e.g., `5 of 8 rated`.
- A completed final rating should be calculated only after all eight have a selection, or present a clearly marked provisional result if that is preferred later.
- Decide separately what the rating should display when all eight scores are zero.

These behaviors were discussed as recommendations, **not finalized requirements**.

## 4. Essential features / proposed MVP

1. **Single-page interface**, with all eight criteria visible and easy to score.
2. **Three-option segmented control** for every criterion: `0` · `0.5` · `1` (or visual `0` · `½` · `1`). Avoid sliders.
3. **Prominent live rating** at the top, expressed out of 5, ideally with a star visual.
4. **Simple score calculation** and rounding to Letterboxd-compatible half-star increments.
5. **Copy rating button** that copies the final rating to the clipboard, with subtle success feedback. Possible copy formats: `4/5`, `4.0/5`, or `★★★★☆ 4/5`. The exact format remains open.
6. **Reset control** to clear the current evaluation.
7. **Subtle criterion explanations**, perhaps via small info icons or lightweight tooltips, especially for criteria that may overlap.
8. **Responsive layout**, usable on mobile and desktop.

This should work as a small, personal utility. There is no requirement for a backend.

## 5. Visual and interaction direction

Desired character: **minimal, clean, visually appealing, understated, cinematic, and easy to use.**

The proposed creative direction is closer to an **independent film magazine / elegant calculator** than a busy dashboard.

### Suggested look

- **Light mode**, with a warm off-white / ivory background.
- Charcoal or dark-gray typography.
- Restrained amber/gold accents for stars, selections, or subtle highlights.
- Generous whitespace and a clear typographic hierarchy.
- Simple rounded controls, fine dividers, and restrained motion.
- No unnecessary graphics, busy charts, or decorative clutter.
- Use elegant but readable typefaces, taking care with mobile legibility.

These are design recommendations, not a rigid design system.

### Suggested page layout

**Header:** Small understated **8mm** wordmark (optionally styled as **8mm.**), optionally a minimal film-related icon.

**Rating summary:** Large `X.X / 5` figure, star representation, and optionally raw `X / 8` or completion progress. This should be the most immediately recognizable outcome.

**Criteria list:** Eight compact rows, each with a criterion label on the left and three clearly selectable score values on the right. Optional information affordance near the label.

**Footer actions:** Main **Copy rating** action and a secondary **Reset** action. A quiet one-line tagline could be included, but is not essential.

**Responsive behavior:** On desktop the score can sit above the criteria; on mobile, consider a compact sticky score header so the outcome remains visible. Avoid any layout that feels cramped or needs significant scrolling to understand.

**Feedback:** When copying, briefly change button feedback to something like `Copied!`, without introducing loud alerts or animations.

## 6. Product principles and constraints

- **Personal, not social.** Built to calculate ratings for use elsewhere (specifically Letterboxd), not replace that platform.
- **Fast above all.** Minimize taps, cognitive load, and setup.
- **No account, login, onboarding, or database** in the first version.
- **No movie search, watch history, review publishing, or Letterboxd integration** in the first version.
- Do not add new criteria, elaborate scoring dimensions, or productivity features unless they solve a demonstrated need.
- Favor clarity and polish over feature count.
- No implementation was requested during the discussion; this document captures product intent for future work.

## 7. Open decisions for a future Codex session

These ideas were raised but **not definitively decided**:

1. **Unselected state:** Should the rating remain hidden until all eight are scored, or appear as a clearly labeled provisional value?
2. **Precision:** Retain only 0 / 0.5 / 1 per criterion for the initial release (preferred) or test whether users need more granularity?
3. **Equal weights:** Keep all eight criteria equal by default (recommended) and revisit only after using the app on a few films.
4. **Copy format:** `4/5`, `4.0/5`, `★★★★☆ 4/5`, or an optional choice?
5. **All-zero completed score:** How should a total of zero translate into Letterboxd's minimum half-star rating?
6. **Tooltip interaction:** Hover/focus on desktop and tap on mobile, or short descriptions always visible?
7. **Visual identity:** The name **8mm** is final; font choice, spacing, colors, tagline, and exact mobile header behavior remain open.
8. **Product framing:** Should it feel primarily like a precise scoring instrument or a quick personal-reflection tool? The discussion leaned toward a **quick, polished personal calculator**.

## 8. Practical implementation note for Codex

A straightforward implementation could be a client-side SPA with eight score values (including `null` for unanswered), a pure rating calculation function, instant UI updates, clipboard support, and responsive styling. There is no known need for an API, persistence, authentication, or third-party integrations.

**Suggested next step:** Start by building a polished static layout and testing the eight-row interaction, then add the small scoring function, completion-state logic, reset, and clipboard copying. Validate ratings against a few already-watched films to see whether equal weights and coarse scoring feel right.

---

## 9. Summary of the conversation's evolution

1. Initially considered a personal movie rubric with **Story/Plot, Direction, Acting, Pacing, Depth, Cinematography**, and blank entries for some categories.
2. A broader ten-factor system was suggested, adding ideas such as Sound/Music, Originality, Screenplay, and Emotional Impact.
3. The user explicitly narrowed the list to **eight criteria**: Story, Direction, Acting, Pacing, Depth, Cinematography, Screenplay, Emotional Impact.
4. We prototyped the math conceptually: 0 / 0.5 / 1 per criterion, total out of 8, converted to Letterboxd's five-star scale.
5. The user proposed turning the calculator into an attractive, simple **single-page personal web app**; we discussed it without implementing anything.
6. Visual direction, interactions, UX refinements, and scope constraints were discussed. The favored direction is a minimalist, light-mode, cinematic calculator with live feedback and one-click copying.
7. The user selected **8mm** as the app name. Branding can optionally use the **8mm.** wordmark and the tagline “Eight perspectives. One rating.”

**Current state:** Ready for a future design/implementation discussion in Codex. No code has been written for the application.
