import { CRITERIA, SCORE_OPTIONS } from './criteria.js';
import { calculateRating } from './rating.js';

const STAR_PATH = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z';
const INFO_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 7.2v3.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="5" r=".85" fill="currentColor"/></svg>';

const scores = CRITERIA.map(() => null);

const form = document.getElementById('criteria');
const reading = document.querySelector('.reading');
const figure = document.getElementById('score-figure');
const starsEl = document.getElementById('stars');
const strip = document.getElementById('strip');
const status = document.getElementById('status');
const copyButton = document.getElementById('copy');

function optionLabel(value) {
  return value === 0.5 ? '½' : String(value);
}

function renderCriteria() {
  form.innerHTML = CRITERIA.map((c) => `
    <div class="criterion">
      <div class="criterion__head">
        <span class="criterion__name" id="${c.id}-label">${c.label}</span>
        <button class="criterion__info" type="button" aria-expanded="false"
          aria-controls="${c.id}-hint" aria-label="What ${c.label} means">${INFO_ICON}</button>
      </div>
      <div class="scale" role="radiogroup" aria-labelledby="${c.id}-label">
        ${SCORE_OPTIONS.map((v) => `
          <label class="scale__option">
            <input type="radio" name="${c.id}" value="${v}" aria-label="${v === 0.5 ? 'half' : v}">
            <span aria-hidden="true">${optionLabel(v)}</span>
          </label>`).join('')}
      </div>
      <p class="criterion__hint" id="${c.id}-hint" hidden>${c.hint}</p>
    </div>`).join('');
}

function renderChrome() {
  starsEl.innerHTML = Array.from({ length: 5 }, () => `
    <span class="star">
      <svg class="star__base" viewBox="0 0 24 24"><path d="${STAR_PATH}"/></svg>
      <svg class="star__lit" viewBox="0 0 24 24"><path d="${STAR_PATH}"/></svg>
    </span>`).join('');
  strip.innerHTML = CRITERIA.map((c) => `<span class="frame" title="${c.label}"></span>`).join('');
}

function formatPoints(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function update() {
  const result = calculateRating(scores);

  reading.classList.toggle('is-complete', result.complete);
  figure.textContent = result.complete ? result.stars.toFixed(1) : '—';

  starsEl.querySelectorAll('.star').forEach((star, i) => {
    const fill = result.complete ? Math.min(Math.max(result.stars - i, 0), 1) : 0;
    star.style.setProperty('--fill', `${fill * 100}%`);
  });

  strip.querySelectorAll('.frame').forEach((frame, i) => {
    if (scores[i] === null) delete frame.dataset.score;
    else frame.dataset.score = String(scores[i]);
  });

  if (result.complete) {
    status.textContent = result.clamped
      ? `0 out of 8 points. Letterboxd's lowest is half a star.`
      : `${formatPoints(result.sum)} out of 8 points`;
  } else if (result.rated === 0) {
    status.textContent = 'Score all eight to get your rating.';
  } else {
    status.textContent = `${result.rated} of 8 rated`;
  }

  copyButton.disabled = !result.complete;
}

form.addEventListener('change', (event) => {
  const index = CRITERIA.findIndex((c) => c.id === event.target.name);
  if (index === -1) return;
  scores[index] = Number(event.target.value);
  update();
});

form.addEventListener('click', (event) => {
  const button = event.target.closest('.criterion__info');
  if (!button) return;
  const hint = document.getElementById(button.getAttribute('aria-controls'));
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  hint.hidden = open;
});

renderCriteria();
renderChrome();
update();
