import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateRating } from '../src/rating.js';

// Build eight scores that add up to `sum`, using 1s then a trailing 0.5.
function scoresFor(sum) {
  const scores = Array(8).fill(0);
  let left = sum;
  for (let i = 0; i < 8 && left > 0; i++) {
    scores[i] = left >= 1 ? 1 : 0.5;
    left -= scores[i];
  }
  return scores;
}

test('returns null stars until all eight criteria are rated', () => {
  const result = calculateRating([1, 1, 0.5, 0, 1, null, null, null]);
  assert.equal(result.stars, null);
  assert.equal(result.complete, false);
  assert.equal(result.rated, 5);
  assert.equal(result.total, 8);
  assert.equal(result.sum, 3.5);
});

test('nothing rated yet', () => {
  const result = calculateRating(Array(8).fill(null));
  assert.deepEqual(result, { rated: 0, total: 8, sum: 0, stars: null, complete: false, clamped: false });
});

test('converts 6/8 to 4.0 stars', () => {
  assert.equal(calculateRating(scoresFor(6)).stars, 4);
});

test('a perfect score is 5 stars', () => {
  assert.equal(calculateRating(Array(8).fill(1)).stars, 5);
});

test('rounds to the nearest half star for every possible sum', () => {
  // sum -> raw (sum / 8 * 5) -> nearest half star
  const expected = {
    0.5: 0.5, // 0.3125 -> 0.5
    1: 0.5, // 0.625 -> 0.5
    1.5: 1, // 0.9375 -> 1
    2: 1.5, // 1.25 -> 1.5 (ties round up)
    2.5: 1.5, // 1.5625 -> 1.5
    3: 2, // 1.875 -> 2
    3.5: 2, // 2.1875 -> 2
    4: 2.5, // 2.5
    4.5: 3, // 2.8125 -> 3
    5: 3, // 3.125 -> 3
    5.5: 3.5, // 3.4375 -> 3.5
    6: 4, // 3.75 -> 4 (ties round up)
    6.5: 4, // 4.0625 -> 4
    7: 4.5, // 4.375 -> 4.5
    7.5: 4.5, // 4.6875 -> 4.5
    8: 5,
  };
  for (const [sum, stars] of Object.entries(expected)) {
    const result = calculateRating(scoresFor(Number(sum)));
    assert.equal(result.sum, Number(sum));
    assert.equal(result.stars, stars, `sum ${sum}`);
    assert.equal(result.clamped, false, `sum ${sum}`);
  }
});

test('clamps a completed all-zero rating to 0.5 stars', () => {
  const result = calculateRating(Array(8).fill(0));
  assert.equal(result.complete, true);
  assert.equal(result.stars, 0.5);
  assert.equal(result.clamped, true);
});
