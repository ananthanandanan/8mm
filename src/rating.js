// Pure scoring logic. No DOM access here so it can be tested in Node.

// Letterboxd's lowest rating. A completed all-zero score is lifted to this.
export const MIN_STARS = 0.5;

/**
 * @param {Array<null | 0 | 0.5 | 1>} scores one entry per criterion, null = unrated
 * @returns {{ rated: number, total: number, sum: number, stars: number | null, complete: boolean, clamped: boolean }}
 */
export function calculateRating(scores) {
  const total = scores.length;
  const given = scores.filter((s) => s !== null);
  const rated = given.length;
  const sum = given.reduce((acc, s) => acc + s, 0);
  const complete = total > 0 && rated === total;

  if (!complete) {
    return { rated, total, sum, stars: null, complete, clamped: false };
  }

  // Scale to 5 and snap to the nearest half star.
  const rounded = Math.round((sum / total) * 5 * 2) / 2;
  const clamped = rounded < MIN_STARS;
  const stars = clamped ? MIN_STARS : rounded;

  return { rated, total, sum, stars, complete, clamped };
}
