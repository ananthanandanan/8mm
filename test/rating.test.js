import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateRating } from '../src/rating.js';

test.todo('returns null stars until all eight criteria are rated');
test.todo('converts 6/8 to 4.0 stars');
test.todo('rounds to the nearest half star');
test.todo('clamps a completed all-zero rating to 0.5 stars');
