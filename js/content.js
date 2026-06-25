// content.js — exposes the course content and derives the flat list of cards.
import { BOOK1 } from './data/book1.js';
import { LESSON_CONTENT } from './data/book1_content.js';

// Merge the adapted teaching content (grammar sections + worked example
// sentences) onto each Book 1 lesson. Inline content on the lesson wins, so
// hand-authored lessons keep their own; the rest are filled from the module.
for (const lesson of BOOK1.lessons) {
  const extra = LESSON_CONTENT[lesson.number];
  if (!extra) continue;
  // Some lessons are fully realigned to the source course (their original
  // title/grammar/vocab were inaccurate) — those fields override when present.
  if (extra.titleEnglish) lesson.titleEnglish = extra.titleEnglish;
  if (extra.grammar) lesson.grammar = extra.grammar;
  if (extra.vocab?.length) lesson.vocab = extra.vocab;
  if (!lesson.sections?.length && extra.sections?.length) lesson.sections = extra.sections;
  if (!lesson.sentences?.length && extra.sentences?.length) lesson.sentences = extra.sentences;
}

export const BOOKS = [BOOK1];

export function getBook(num) {
  return BOOKS.find((b) => b.book === num);
}

export function getLesson(bookNum, lessonNum) {
  const book = getBook(bookNum);
  return book?.lessons.find((l) => l.number === lessonNum) || null;
}

// A stable card id ties a vocab word to its lesson + position.
export function cardId(bookNum, lessonNum, index) {
  return `b${bookNum}:l${lessonNum}:${index}`;
}

// Sentence cards get their own id namespace so they never collide with words.
export function sentenceId(bookNum, lessonNum, index) {
  return `b${bookNum}:l${lessonNum}:s${index}`;
}

// Build the flat list of all cards (words + sentences) across the loaded books.
export function allCards() {
  const cards = [];
  for (const book of BOOKS) {
    for (const lesson of book.lessons) {
      cards.push(...lessonCards(book.book, lesson.number));
      cards.push(...lessonSentenceCards(book.book, lesson.number));
    }
  }
  return cards;
}

// Vocab cards for one lesson.
export function lessonCards(bookNum, lessonNum) {
  const lesson = getLesson(bookNum, lessonNum);
  if (!lesson) return [];
  return (lesson.vocab || []).map((word, index) => ({
    id: cardId(bookNum, lessonNum, index),
    kind: 'word',
    book: bookNum,
    lesson: lessonNum,
    ...word,
  }));
}

// Example-sentence cards for one lesson (only present on enriched lessons).
export function lessonSentenceCards(bookNum, lessonNum) {
  const lesson = getLesson(bookNum, lessonNum);
  if (!lesson) return [];
  return (lesson.sentences || []).map((sentence, index) => ({
    id: sentenceId(bookNum, lessonNum, index),
    kind: 'sentence',
    book: bookNum,
    lesson: lessonNum,
    ...sentence,
  }));
}

// All review items (words + sentences) for a lesson — used by per-lesson review.
export function lessonItems(bookNum, lessonNum) {
  return [
    ...lessonCards(bookNum, lessonNum),
    ...lessonSentenceCards(bookNum, lessonNum),
  ];
}

// A lesson is "enriched" once it carries adapted teaching sections + sentences.
export function isEnriched(lesson) {
  return !!(lesson && (lesson.sections?.length || lesson.sentences?.length));
}

// The freely-distributed Book 1 lesson recordings (Dr. V. Abdur Rahim) hosted
// on the Internet Archive. Files follow MAA_BK1_VAR_L01.mp3 … _L23.mp3.
export const LESSON_AUDIO_BASE =
  'https://archive.org/download/MAA_BK1_VAR/MAA_BK1_VAR_L';

export function lessonAudioUrl(lessonNum) {
  return `${LESSON_AUDIO_BASE}${String(lessonNum).padStart(2, '0')}.mp3`;
}
