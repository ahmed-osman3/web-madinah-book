// exercises.js — builds a "teach then practice" step sequence for a lesson,
// in the spirit of a Duolingo skill: first present the grammar and each new
// word, then drill them with a mix of interactive exercise types.

import { lessonCards, getLesson, allCards } from './content.js';

// Fisher–Yates shuffle (returns the same array, shuffled).
export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sample(arr, n, exclude = () => false) {
  const pool = arr.filter((x) => !exclude(x));
  shuffle(pool);
  return pool.slice(0, n);
}

// Normalise an answer for lenient typed-answer checking.
export function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/\(.*?\)/g, '')        // drop parentheticals e.g. "(masc.)"
    .replace(/[.!?,;:]/g, '')
    .replace(/\b(a|an|the|to)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Accept any of the alternative meanings separated by / or , .
export function answerMatches(input, english) {
  const got = normalize(input);
  if (!got) return false;
  const alts = english.split(/[\/,]/).map(normalize).filter(Boolean);
  return alts.some((a) => a === got || (a.length > 3 && (a.includes(got) || got.includes(a))));
}

const PRACTICE_CAP = 12; // max single-word practice exercises per lesson

// Build the full ordered list of steps for a lesson.
export function buildLessonSteps(lessonNum) {
  const lesson = getLesson(1, lessonNum);
  if (!lesson) return [];
  const cards = lessonCards(1, lessonNum); // each: {id, ar, translit, en, lesson}
  const globalPool = allCards();

  const steps = [];

  // 1. Teach: the grammar point.
  steps.push({ kind: 'grammar', lesson });

  // 2. Teach: each new word in order.
  for (const w of cards) {
    steps.push({ kind: 'intro', word: w });
  }

  // 3. Practice. Pick the words to drill (cap for very long lessons).
  const practiceWords = cards.length > PRACTICE_CAP
    ? sample(cards, PRACTICE_CAP)
    : shuffle([...cards]);

  const exercises = [];
  practiceWords.forEach((w, i) => {
    // Alternate exercise types so each word is practised a different way.
    const mode = i % 3;
    if (mode === 0) {
      exercises.push(makeChooseEn(w, cards, globalPool));
    } else if (mode === 1) {
      exercises.push(makeChooseAr(w, cards, globalPool));
    } else {
      exercises.push(makeType(w));
    }
  });
  shuffle(exercises);

  // Sprinkle in match rounds (4 pairs each) for variety.
  if (cards.length >= 4) {
    const matchRounds = cards.length >= 8 ? 2 : 1;
    for (let r = 0; r < matchRounds; r++) {
      const pairs = sample(cards, 4);
      if (pairs.length === 4) {
        // Insert near the start and middle.
        const at = r === 0 ? Math.min(2, exercises.length) : Math.floor(exercises.length / 2);
        exercises.splice(at, 0, { kind: 'match', pairs });
      }
    }
  }

  steps.push(...exercises);
  return steps;
}

function distractorEnglish(word, local, global, n = 3) {
  const taken = new Set([word.en]);
  const localOpts = sample(local, n, (w) => taken.has(w.en) || w.en === word.en).map((w) => w.en);
  localOpts.forEach((e) => taken.add(e));
  let opts = localOpts;
  if (opts.length < n) {
    const more = sample(global, n - opts.length, (w) => taken.has(w.en)).map((w) => w.en);
    opts = opts.concat(more);
  }
  return opts.slice(0, n);
}

function distractorArabic(word, local, global, n = 3) {
  const taken = new Set([word.ar]);
  const localOpts = sample(local, n, (w) => taken.has(w.ar) || w.ar === word.ar).map((w) => w.ar);
  localOpts.forEach((a) => taken.add(a));
  let opts = localOpts;
  if (opts.length < n) {
    const more = sample(global, n - opts.length, (w) => taken.has(w.ar)).map((w) => w.ar);
    opts = opts.concat(more);
  }
  return opts.slice(0, n);
}

function makeChooseEn(word, local, global) {
  const options = shuffle([word.en, ...distractorEnglish(word, local, global)]);
  return { kind: 'choose-en', word, options, answer: word.en };
}

function makeChooseAr(word, local, global) {
  const options = shuffle([word.ar, ...distractorArabic(word, local, global)]);
  return { kind: 'choose-ar', word, options, answer: word.ar };
}

function makeType(word) {
  return { kind: 'type', word, answer: word.en };
}
