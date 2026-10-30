// Pure scoring logic. No DOM access here so it can be tested in Node.

/**
 * @param {Array<null | 0 | 0.5 | 1>} scores one entry per criterion, null = unrated
 * @returns {{ rated: number, total: number, sum: number, stars: number | null, complete: boolean }}
 */
export function calculateRating(scores) {
  throw new Error('not implemented');
}
