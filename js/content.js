// content.js — exposes the course content and derives the flat list of cards.
import { BOOK1 } from './data/book1.js';

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

// Build the flat list of all vocab cards across the loaded books.
export function allCards() {
  const cards = [];
  for (const book of BOOKS) {
    for (const lesson of book.lessons) {
      (lesson.vocab || []).forEach((word, index) => {
        cards.push({
          id: cardId(book.book, lesson.number, index),
          book: book.book,
          lesson: lesson.number,
          ...word,
        });
      });
    }
  }
  return cards;
}

export function lessonCards(bookNum, lessonNum) {
  const lesson = getLesson(bookNum, lessonNum);
  if (!lesson) return [];
  return (lesson.vocab || []).map((word, index) => ({
    id: cardId(bookNum, lessonNum, index),
    book: bookNum,
    lesson: lessonNum,
    ...word,
  }));
}
