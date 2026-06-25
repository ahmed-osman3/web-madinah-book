// exercises.js — builds a "teach then practice" step sequence for a lesson.
//
// The content core comes from the Madinah Arabic course: each lesson teaches a
// grammar point through adapted explanation *sections* and a set of worked
// *example sentences*, then drills both the new words and the sentences with a
// mix of interactive exercises (in the spirit of a Duolingo skill).

import {
  lessonCards,
  lessonSentenceCards,
  getLesson,
  isEnriched,
  allCards,
} from './content.js';

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

// Split an Arabic sentence into display tokens (words) for the word-bank
// "build the sentence" exercise.
export function tokenizeArabic(text) {
  return String(text).trim().split(/\s+/).filter(Boolean);
}

const WORD_PRACTICE_CAP = 10;     // max single-word drills per lesson
const SENTENCE_INTRO_CAP = 6;     // max worked sentences shown while teaching
const SENTENCE_PRACTICE_CAP = 6;  // max sentence drills per lesson

// Build the full ordered list of steps for a lesson.
export function buildLessonSteps(lessonNum) {
  const lesson = getLesson(1, lessonNum);
  if (!lesson) return [];

  const words = lessonCards(1, lessonNum);        // {id, kind, ar, translit, en, ...}
  const sentences = lessonSentenceCards(1, lessonNum);
  const globalPool = allCards().filter((c) => c.kind === 'word');

  const steps = [];

  // 1. TEACH — grammar sections (adapted prose). Fall back to the legacy
  //    single grammar paragraph for lessons not yet enriched.
  const sections = lesson.sections?.length
    ? lesson.sections
    : (lesson.grammar ? [{ heading: 'Grammar', body: lesson.grammar }] : []);
  sections.forEach((section, i) =>
    steps.push({ kind: 'rule', section, lesson, first: i === 0, index: i, count: sections.length })
  );

  // 2. TEACH — each new word in order.
  for (const w of words) steps.push({ kind: 'intro', word: w });

  // 3. TEACH — worked example sentences (the heart of the lesson content).
  const introSentences = sentences.slice(0, SENTENCE_INTRO_CAP);
  for (const s of introSentences) steps.push({ kind: 'sentence-intro', sentence: s });

  // 4. PRACTICE — word drills.
  const practiceWords = words.length > WORD_PRACTICE_CAP
    ? sample(words, WORD_PRACTICE_CAP)
    : shuffle([...words]);

  const exercises = [];
  practiceWords.forEach((w, i) => {
    const mode = i % 3;
    if (mode === 0) exercises.push(makeChooseEn(w, words, globalPool));
    else if (mode === 1) exercises.push(makeChooseAr(w, words, globalPool));
    else exercises.push(makeType(w));
  });

  // 5. PRACTICE — sentence drills (translate + build). These make the example
  //    sentences, not just isolated words, the thing being practised.
  const practiceSentences = sample(sentences, SENTENCE_PRACTICE_CAP);
  practiceSentences.forEach((s, i) => {
    if (i % 2 === 0 && sentences.length >= 4) exercises.push(makeTranslate(s, sentences));
    else exercises.push(makeBuild(s, sentences));
  });

  shuffle(exercises);

  // Sprinkle in word-match rounds for variety.
  if (words.length >= 4) {
    const matchRounds = words.length >= 8 ? 2 : 1;
    for (let r = 0; r < matchRounds; r++) {
      const pairs = sample(words, 4);
      if (pairs.length === 4) {
        const at = r === 0 ? Math.min(2, exercises.length) : Math.floor(exercises.length / 2);
        exercises.splice(at, 0, { kind: 'match', pairs });
      }
    }
  }

  steps.push(...exercises);
  return steps;
}

/* --- Word-drill builders --- */

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

/* --- Sentence-drill builders --- */

// Translate a whole Arabic sentence to English (multiple choice — typing a full
// sentence would be too punishing).
function makeTranslate(sentence, allSentences) {
  const distractors = sample(allSentences, 3, (s) => s.en === sentence.en).map((s) => s.en);
  const options = shuffle([sentence.en, ...distractors]);
  return { kind: 'translate', sentence, options, answer: sentence.en };
}

// Reconstruct the Arabic sentence from a shuffled word bank (Duolingo's
// signature exercise). A couple of decoy tokens are mixed in.
function makeBuild(sentence, allSentences) {
  const tokens = tokenizeArabic(sentence.ar);
  const own = new Set(tokens);
  const otherTokens = [];
  for (const s of allSentences) {
    if (s.id === sentence.id) continue;
    for (const t of tokenizeArabic(s.ar)) if (!own.has(t)) otherTokens.push(t);
  }
  const decoyCount = tokens.length <= 3 ? 1 : 2;
  const decoys = sample([...new Set(otherTokens)], decoyCount);
  const bank = shuffle([...tokens, ...decoys]);
  return { kind: 'build', sentence, tokens, bank, answer: tokens.join(' ') };
}
