// storage.js — thin wrapper around localStorage for all persistent app state.
// Everything lives under a single namespaced key so the whole app state can be
// exported/imported as one JSON blob.

const STORAGE_KEY = 'madinah:v1';

const DEFAULT_STATE = {
  version: 1,
  // SRS scheduling data, keyed by card id (`l<lesson>:<index>`).
  srs: {},
  // Per-lesson progress: { [lessonNumber]: { completed: bool, completedAt: iso } }
  lessons: {},
  // Daily study statistics.
  stats: {
    streak: 0,
    longestStreak: 0,
    lastStudyDate: null,   // 'YYYY-MM-DD'
    reviewsByDay: {},      // { 'YYYY-MM-DD': count }
    totalReviews: 0,
    xp: 0,                 // total experience points earned
    xpByDay: {},           // { 'YYYY-MM-DD': xp }
    newByDay: {},          // { 'YYYY-MM-DD': new cards introduced }
  },
  settings: {
    newCardsPerDay: 15,
    showTransliteration: true,
    theme: 'auto',
    dailyGoal: 30,         // XP target per day
    useHearts: true,       // Duolingo-style hearts during lessons
  },
};

function deepMerge(base, override) {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) {
    return override === undefined ? base : override;
  }
  const out = { ...base };
  for (const key of Object.keys(override || {})) {
    if (
      typeof base[key] === 'object' &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      out[key] = deepMerge(base[key], override[key]);
    } else {
      out[key] = override[key];
    }
  }
  return out;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    // Merge so new default fields appear for existing users.
    return deepMerge(structuredClone(DEFAULT_STATE), parsed);
  } catch (err) {
    console.error('Failed to load state, starting fresh:', err);
    return structuredClone(DEFAULT_STATE);
  }
}

let _state = loadState();

export function getState() {
  return _state;
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
}

// Mutate state via a callback then persist.
export function update(mutator) {
  mutator(_state);
  saveState();
  return _state;
}

export function resetState() {
  _state = structuredClone(DEFAULT_STATE);
  saveState();
  return _state;
}

export function exportState() {
  return JSON.stringify(_state, null, 2);
}

export function importState(json) {
  const parsed = JSON.parse(json);
  _state = deepMerge(structuredClone(DEFAULT_STATE), parsed);
  saveState();
  return _state;
}
