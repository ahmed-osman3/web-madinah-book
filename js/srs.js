// srs.js — Spaced repetition scheduling based on the SM-2 algorithm
// (the algorithm popularised by SuperMemo / Anki).
//
// A scheduling record for a card looks like:
//   { ease, interval, reps, lapses, due, lastReviewed, introduced }
// - ease:     easiness factor (>= 1.3), starts at 2.5
// - interval: current interval in days
// - reps:     number of consecutive successful reviews
// - lapses:   number of times the card was forgotten
// - due:      ISO date string of next review
// - introduced: true once the card has been studied at least once

export const RATING = {
  AGAIN: 0, // total blackout / wrong
  HARD: 1,
  GOOD: 2,
  EASY: 3,
};

const DAY_MS = 24 * 60 * 60 * 1000;

function todayStart() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

export function isoDate(date) {
  // 'YYYY-MM-DD' in local time.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function newCard() {
  return {
    ease: 2.5,
    interval: 0,
    reps: 0,
    lapses: 0,
    due: isoDate(todayStart()),
    lastReviewed: null,
    introduced: false,
  };
}

// A card is "due" if its due date is today or earlier.
export function isDue(card, ref = todayStart()) {
  if (!card || !card.introduced) return false;
  return new Date(card.due) <= ref;
}

export function isNew(card) {
  return !card || !card.introduced;
}

// Apply a rating and return the updated scheduling record (pure function).
export function schedule(card, rating) {
  const c = card ? { ...card } : newCard();
  const today = todayStart();
  c.introduced = true;
  c.lastReviewed = isoDate(today);

  if (rating === RATING.AGAIN) {
    c.reps = 0;
    c.lapses += 1;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.interval = 0; // relearn — due again today/next session
    c.due = isoDate(today);
    return c;
  }

  // Update easiness factor. Map our 4-point scale onto SM-2's quality 0-5.
  const quality = { [RATING.HARD]: 3, [RATING.GOOD]: 4, [RATING.EASY]: 5 }[rating];
  c.ease = Math.max(
    1.3,
    c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  c.reps += 1;

  let interval;
  if (c.reps === 1) {
    interval = rating === RATING.EASY ? 4 : 1;
  } else if (c.reps === 2) {
    interval = rating === RATING.EASY ? 6 : 3;
  } else {
    interval = Math.round(c.interval * c.ease);
    if (rating === RATING.HARD) interval = Math.round(c.interval * 1.2);
    if (rating === RATING.EASY) interval = Math.round(interval * 1.3);
  }
  interval = Math.max(1, interval);

  c.interval = interval;
  c.due = isoDate(addDays(today, interval));
  return c;
}

// Human-friendly preview of when each rating would schedule the card next.
export function nextIntervalLabels(card) {
  const labels = {};
  for (const [name, rating] of Object.entries(RATING)) {
    const result = schedule(card, rating);
    if (result.interval === 0) {
      labels[name] = 'now';
    } else if (result.interval === 1) {
      labels[name] = '1 day';
    } else if (result.interval < 30) {
      labels[name] = `${result.interval} days`;
    } else if (result.interval < 365) {
      labels[name] = `${Math.round(result.interval / 30)} mo`;
    } else {
      labels[name] = `${(result.interval / 365).toFixed(1)} yr`;
    }
  }
  return labels;
}
