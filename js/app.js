// app.js — UI, routing, and the study session controller.
import {
  getState,
  update,
  resetState,
  exportState,
  importState,
} from './storage.js';
import {
  RATING,
  schedule,
  newCard,
  isDue,
  isNew,
  isoDate,
  nextIntervalLabels,
} from './srs.js';
import {
  BOOKS,
  getBook,
  getLesson,
  allCards,
  lessonCards,
} from './content.js';
import { buildLessonSteps, answerMatches } from './exercises.js';
import { speak, canSpeak } from './audio.js';

const BOOK_NUM = 1;
const app = document.getElementById('app');

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function todayKey() {
  return isoDate(new Date());
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v !== null && v !== undefined && v !== false) {
      node.setAttribute(k, v);
    }
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

function cardRecord(id) {
  return getState().srs[id] || null;
}

// A small speaker button that pronounces the given Arabic text.
function speakButton(text, extraClass = '') {
  if (!canSpeak()) return null;
  return el('button', {
    class: 'speak-btn ' + extraClass,
    title: 'Listen',
    'aria-label': 'Listen to pronunciation',
    onClick: (e) => { e.stopPropagation(); speak(text); },
  }, '🔊');
}

// Categorise the whole deck relative to today.
function deckStatus() {
  const cards = allCards();
  const settings = getState().settings;
  let due = 0;
  let newAvail = 0;
  let learned = 0;
  for (const c of cards) {
    const rec = cardRecord(c.id);
    if (isNew(rec)) {
      newAvail += 1;
    } else {
      learned += 1;
      if (isDue(rec)) due += 1;
    }
  }
  const newToday = newIntroducedToday();
  const newRemaining = Math.max(0, settings.newCardsPerDay - newToday);
  return {
    total: cards.length,
    due,
    learned,
    newAvail,
    newToday,
    newRemaining: Math.min(newRemaining, newAvail),
  };
}

function newIntroducedToday() {
  // Tracked precisely in stats.newByDay each time a brand-new card is rated.
  return getState().stats.newByDay?.[todayKey()] || 0;
}

function lessonProgress(lessonNum) {
  const cards = lessonCards(BOOK_NUM, lessonNum);
  if (!cards.length) return { total: 0, learned: 0, due: 0, pct: 0 };
  let learned = 0;
  let due = 0;
  for (const c of cards) {
    const rec = cardRecord(c.id);
    if (!isNew(rec)) {
      learned += 1;
      if (isDue(rec)) due += 1;
    }
  }
  return {
    total: cards.length,
    learned,
    due,
    pct: Math.round((learned / cards.length) * 100),
  };
}

/* ------------------------------------------------------------------ */
/* Stats / streak bookkeeping                                          */
/* ------------------------------------------------------------------ */

// Advance the daily streak (call whenever the user does any study activity).
function touchStreak(s) {
  const today = todayKey();
  if (s.stats.lastStudyDate !== today) {
    const yesterday = isoDate(new Date(Date.now() - 86400000));
    s.stats.streak = s.stats.lastStudyDate === yesterday ? s.stats.streak + 1 : 1;
    s.stats.lastStudyDate = today;
    s.stats.longestStreak = Math.max(s.stats.longestStreak, s.stats.streak);
  }
}

function recordReview(isNewCard) {
  update((s) => {
    const today = todayKey();
    s.stats.reviewsByDay[today] = (s.stats.reviewsByDay[today] || 0) + 1;
    s.stats.totalReviews += 1;
    if (isNewCard) {
      s.stats.newByDay = s.stats.newByDay || {};
      s.stats.newByDay[today] = (s.stats.newByDay[today] || 0) + 1;
    }
    touchStreak(s);
  });
}

// Award XP (from completing exercises) and keep the streak alive.
function recordXp(amount) {
  update((s) => {
    const today = todayKey();
    s.stats.xp = (s.stats.xp || 0) + amount;
    s.stats.xpByDay = s.stats.xpByDay || {};
    s.stats.xpByDay[today] = (s.stats.xpByDay[today] || 0) + amount;
    touchStreak(s);
  });
}

function xpToday() {
  return getState().stats.xpByDay?.[todayKey()] || 0;
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const routes = {
  '': renderDashboard,
  '#/': renderDashboard,
  '#/lessons': renderLessons,
  '#/lesson': renderLessonDetail, // #/lesson/<n>
  '#/learn': renderLearn,         // #/learn/<n>
  '#/review': renderReview,       // #/review or #/review/lesson/<n>
  '#/stats': renderStats,
  '#/settings': renderSettings,
};

function router() {
  const hash = location.hash || '#/';
  const parts = hash.split('/');
  const base = parts[0] === '' ? '#/' : `${parts[0]}/${parts[1] || ''}`.replace(/\/$/, '');
  const key =
    hash.startsWith('#/lesson/') ? '#/lesson' :
    hash.startsWith('#/learn/') ? '#/learn' :
    hash.startsWith('#/review') ? '#/review' :
    hash;
  const view = routes[key] || routes[base] || renderDashboard;
  app.innerHTML = '';
  app.scrollTop = 0;
  view(parts);
  highlightNav(key);
}

function highlightNav(key) {
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === key);
  });
}

function navigate(hash) {
  location.hash = hash;
}

/* ------------------------------------------------------------------ */
/* View: Dashboard                                                     */
/* ------------------------------------------------------------------ */

function renderDashboard() {
  const status = deckStatus();
  const stats = getState().stats;
  const book = getBook(BOOK_NUM);
  const lessonsState = getState().lessons;
  const lessonsDone = Object.values(lessonsState).filter((l) => l.completed).length;
  const studyCount = status.due + status.newRemaining;

  // Next lesson to learn = first one not yet completed.
  const nextLesson = book.lessons.find((l) => !lessonsState[l.number]?.completed) || null;

  const goal = getState().settings.dailyGoal || 30;
  const today = xpToday();

  app.append(
    el('section', { class: 'hero' },
      el('p', { class: 'eyebrow' }, 'Madinah Arabic · Book 1'),
      el('h1', { class: 'hero-title ar', dir: 'rtl' }, book.title),
      el('p', { class: 'hero-sub' }, 'Learn each lesson, earn XP completing exercises, and lock it in with spaced repetition.'),
    ),
    el('div', { class: 'stat-grid' },
      statCard('🔥', stats.streak, 'day streak'),
      statCard('⚡', stats.xp || 0, 'total XP'),
      statCard('📅', status.due, 'cards due'),
      statCard('📖', `${lessonsDone}/${book.lessons.length}`, 'lessons done'),
    ),
    dailyGoalPanel(today, goal),
    el('div', { class: 'cta-row' },
      nextLesson
        ? el('button', {
            class: 'btn-duo btn-duo-primary btn-lg',
            onClick: () => navigate(`#/learn/${nextLesson.number}`),
          }, `${lessonsDone ? 'Continue' : 'Start'} · Lesson ${nextLesson.number} →`)
        : el('button', {
            class: 'btn-duo btn-duo-primary btn-lg',
            onClick: () => navigate('#/lessons'),
          }, '🏆 All lessons done — practice more'),
      el('button', {
        class: 'btn btn-ghost btn-lg',
        disabled: studyCount === 0 ? '' : false,
        onClick: () => navigate('#/review'),
      }, studyCount > 0 ? `Review · ${studyCount} card${studyCount === 1 ? '' : 's'}` : 'No reviews due 🎉'),
    ),
    progressOverview(status),
  );
}

function dailyGoalPanel(today, goal) {
  const pct = Math.min(100, Math.round((today / goal) * 100));
  const reached = today >= goal;
  return el('div', { class: 'card panel goal-panel' },
    el('div', { class: 'panel-head' },
      el('h2', {}, reached ? '🌟 Daily goal reached!' : '🏁 Daily goal'),
      el('span', { class: 'muted' }, `${today} / ${goal} XP`),
    ),
    progressBar(pct),
  );
}

function statCard(icon, value, label) {
  return el('div', { class: 'stat-card' },
    el('div', { class: 'stat-icon' }, icon),
    el('div', { class: 'stat-value' }, String(value)),
    el('div', { class: 'stat-label' }, label),
  );
}

function progressOverview(status) {
  const pct = status.total ? Math.round((status.learned / status.total) * 100) : 0;
  return el('div', { class: 'card panel' },
    el('div', { class: 'panel-head' },
      el('h2', {}, 'Your vocabulary'),
      el('span', { class: 'muted' }, `${status.learned} / ${status.total} words seen`),
    ),
    progressBar(pct),
    el('p', { class: 'muted small' },
      `${status.newAvail} new words waiting · ${status.due} ready to review`),
  );
}

function progressBar(pct) {
  return el('div', { class: 'progress' },
    el('div', { class: 'progress-fill', style: `width:${pct}%` }),
  );
}

/* ------------------------------------------------------------------ */
/* View: Lessons list                                                  */
/* ------------------------------------------------------------------ */

function renderLessons() {
  const book = getBook(BOOK_NUM);
  app.append(el('h1', { class: 'page-title' }, 'Lessons'));
  const grid = el('div', { class: 'lesson-grid' });

  for (const lesson of book.lessons) {
    const prog = lessonProgress(lesson.number);
    const done = getState().lessons[lesson.number]?.completed;
    grid.append(
      el('button', {
        class: 'lesson-card' + (done ? ' is-done' : ''),
        onClick: () => navigate(`#/lesson/${lesson.number}`),
      },
        el('div', { class: 'lesson-card-top' },
          el('span', { class: 'lesson-num' }, String(lesson.number)),
          done ? el('span', { class: 'badge badge-done' }, '✓ done')
               : prog.due ? el('span', { class: 'badge badge-due' }, `${prog.due} due`)
               : null,
        ),
        el('div', { class: 'lesson-title ar', dir: 'rtl' }, lesson.titleArabic),
        el('div', { class: 'lesson-sub' }, lesson.titleEnglish),
        el('div', { class: 'lesson-meta' },
          el('span', { class: 'muted small' }, `${lesson.vocab.length} words`),
          prog.total ? progressBar(prog.pct) : null,
        ),
      )
    );
  }
  app.append(grid);
}

/* ------------------------------------------------------------------ */
/* View: Lesson detail                                                 */
/* ------------------------------------------------------------------ */

function renderLessonDetail(parts) {
  app.innerHTML = ''; // self-invoked on "mark complete"; clear before re-render
  const num = parseInt(parts[2], 10);
  const lesson = getLesson(BOOK_NUM, num);
  if (!lesson) {
    app.append(el('p', {}, 'Lesson not found.'));
    return;
  }
  const prog = lessonProgress(num);
  const done = getState().lessons[num]?.completed;
  const showTranslit = getState().settings.showTransliteration;

  app.append(
    el('div', { class: 'breadcrumb' },
      el('a', { href: '#/lessons' }, '← Lessons'),
    ),
    el('div', { class: 'lesson-header' },
      el('div', {},
        el('p', { class: 'eyebrow' }, `Lesson ${num}`),
        el('h1', { class: 'page-title ar', dir: 'rtl' }, lesson.titleArabic),
        el('p', { class: 'hero-sub' }, lesson.titleEnglish),
      ),
      done ? el('span', { class: 'badge badge-done lg' },
        '✓ Completed' + (getState().lessons[num]?.bestAccuracy ? ` · ${getState().lessons[num].bestAccuracy}%` : '')) : null,
    ),
    el('div', { class: 'cta-row' },
      el('button', {
        class: 'btn-duo btn-duo-primary btn-block',
        disabled: lesson.vocab.length ? false : '',
        onClick: () => navigate(`#/learn/${num}`),
      }, done ? '↻ Practice again' : '▶ Start lesson'),
    ),
    el('div', { class: 'card panel' },
      el('h2', {}, 'Grammar'),
      el('p', { class: 'grammar ar-inline', dir: 'auto' }, lesson.grammar),
    ),
    vocabTable(lesson, showTranslit),
    el('div', { class: 'cta-row' },
      el('button', {
        class: 'btn btn-ghost',
        disabled: lesson.vocab.length ? false : '',
        onClick: () => navigate(`#/review/lesson/${num}`),
      }, '🔁 Flashcard review'),
      el('button', {
        class: 'btn ' + (done ? 'btn-ghost' : 'btn-secondary'),
        onClick: () => {
          update((s) => {
            const prev = s.lessons[num] || {};
            s.lessons[num] = { ...prev, completed: !done,
              completedAt: !done ? new Date().toISOString() : null };
          });
          renderLessonDetail(parts);
        },
      }, done ? 'Mark as not done' : 'Mark complete'),
    ),
  );
}

function vocabTable(lesson, showTranslit) {
  const panel = el('div', { class: 'card panel' },
    el('div', { class: 'panel-head' },
      el('h2', {}, `Vocabulary (${lesson.vocab.length})`),
    ),
  );
  const list = el('div', { class: 'vocab-list' });
  lesson.vocab.forEach((w, i) => {
    const rec = cardRecord(`b${BOOK_NUM}:l${lesson.number}:${i}`);
    const state = isNew(rec) ? 'new' : isDue(rec) ? 'due' : 'learned';
    list.append(
      el('div', { class: 'vocab-row' },
        el('div', { class: 'vocab-ar-wrap' },
          speakButton(w.ar, 'vocab-speak'),
          el('div', { class: 'vocab-ar ar', dir: 'rtl' }, w.ar),
        ),
        el('div', { class: 'vocab-mid' },
          showTranslit ? el('div', { class: 'vocab-translit' }, w.translit) : null,
          el('div', { class: 'vocab-en' }, w.en),
        ),
        el('span', { class: `chip chip-${state}` }, state),
      )
    );
  });
  panel.append(list);
  return panel;
}

/* ------------------------------------------------------------------ */
/* View: Review session                                                */
/* ------------------------------------------------------------------ */

// Build the queue of cards to study.
function buildQueue(lessonNum) {
  const settings = getState().settings;
  const pool = lessonNum
    ? lessonCards(BOOK_NUM, lessonNum)
    : allCards();

  const dueCards = [];
  const newCards = [];
  for (const c of pool) {
    const rec = cardRecord(c.id);
    if (isNew(rec)) newCards.push(c);
    else if (isDue(rec)) dueCards.push(c);
  }
  // Shuffle due cards; keep new cards in lesson order.
  shuffle(dueCards);

  let newAllowance;
  if (lessonNum) {
    newAllowance = newCards.length; // studying a single lesson: allow all its new cards
  } else {
    newAllowance = Math.max(0, settings.newCardsPerDay - newIntroducedToday());
  }
  const queue = [...dueCards, ...newCards.slice(0, newAllowance)];
  shuffleInterleave(queue, dueCards.length);
  return queue;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Light interleave so new cards are sprinkled among due ones.
function shuffleInterleave(arr) {
  shuffle(arr);
  return arr;
}

let session = null;

function renderReview(parts) {
  let lessonNum = null;
  if (parts[2] === 'lesson') lessonNum = parseInt(parts[3], 10);

  const queue = buildQueue(lessonNum);
  if (!queue.length) {
    app.append(
      el('div', { class: 'empty-state' },
        el('div', { class: 'empty-emoji' }, '🎉'),
        el('h2', {}, 'Nothing to review right now'),
        el('p', { class: 'muted' }, lessonNum
          ? 'You have studied all the new words in this lesson. Come back when they are due.'
          : 'You are all caught up. New cards unlock as your daily limit resets.'),
        el('button', { class: 'btn btn-primary', onClick: () => navigate(lessonNum ? `#/lesson/${lessonNum}` : '#/') }, 'Back'),
      )
    );
    return;
  }

  session = {
    queue,
    index: 0,
    lessonNum,
    revealed: false,
    direction: 'ar-en', // front Arabic, back English
    answered: 0,
    again: 0,
    total: queue.length,
  };
  renderCard();
}

function renderCard() {
  app.innerHTML = '';
  const s = session;
  if (s.index >= s.queue.length) {
    return renderSessionDone();
  }
  const card = s.queue[s.index];
  const rec = cardRecord(card.id) || newCard();
  const labels = nextIntervalLabels(rec);
  const showTranslit = getState().settings.showTransliteration;
  const isNewCard = isNew(cardRecord(card.id));

  const progressPct = Math.round((s.index / s.total) * 100);

  const front = el('div', { class: 'flashcard-face flashcard-front' },
    isNewCard ? el('span', { class: 'chip chip-new card-flag' }, 'new') : null,
    el('div', { class: 'flash-ar ar', dir: 'rtl' }, card.ar),
    speakButton(card.ar, 'speak-lg'),
  );

  const back = el('div', { class: 'flashcard-back' + (s.revealed ? '' : ' hidden') },
    el('hr', { class: 'flash-divider' }),
    showTranslit ? el('div', { class: 'flash-translit' }, card.translit) : null,
    el('div', { class: 'flash-en' }, card.en),
    el('div', { class: 'flash-lesson muted small' }, `Lesson ${card.lesson}`),
  );

  const flashcard = el('div', { class: 'flashcard', onClick: () => { if (!s.revealed) reveal(); } },
    front, back,
    !s.revealed ? el('div', { class: 'flash-hint muted' }, 'Tap to reveal · or press Space') : null,
  );

  const controls = s.revealed
    ? el('div', { class: 'rating-row' },
        ratingBtn('Again', RATING.AGAIN, labels.AGAIN, 'again'),
        ratingBtn('Hard', RATING.HARD, labels.HARD, 'hard'),
        ratingBtn('Good', RATING.GOOD, labels.GOOD, 'good'),
        ratingBtn('Easy', RATING.EASY, labels.EASY, 'easy'),
      )
    : el('div', { class: 'rating-row' },
        el('button', { class: 'btn btn-primary btn-reveal', onClick: reveal }, 'Show answer'),
      );

  app.append(
    el('div', { class: 'review-top' },
      el('button', { class: 'btn btn-ghost btn-sm', onClick: () => navigate(s.lessonNum ? `#/lesson/${s.lessonNum}` : '#/') }, '✕ End'),
      el('div', { class: 'review-progress' },
        progressBar(progressPct),
      ),
      el('span', { class: 'muted small' }, `${s.index + 1} / ${s.total}`),
    ),
    el('div', { class: 'flashcard-wrap' }, flashcard),
    controls,
  );
}

function ratingBtn(label, rating, interval, cls) {
  return el('button', {
    class: `btn rate rate-${cls}`,
    onClick: () => rate(rating),
  },
    el('span', { class: 'rate-label' }, label),
    el('span', { class: 'rate-interval' }, interval),
  );
}

function reveal() {
  session.revealed = true;
  renderCard();
}

function rate(rating) {
  const s = session;
  const card = s.queue[s.index];
  const prevRec = cardRecord(card.id);
  const wasNew = isNew(prevRec);
  const updated = schedule(prevRec, rating);

  update((st) => {
    st.srs[card.id] = updated;
  });
  recordReview(wasNew);

  s.answered += 1;
  if (rating === RATING.AGAIN) {
    s.again += 1;
    // Requeue the lapsed card near the end of the session.
    s.queue.push(card);
    s.total += 1;
  }

  s.index += 1;
  s.revealed = false;
  renderCard();
}

function renderSessionDone() {
  const s = session;
  app.append(
    el('div', { class: 'empty-state' },
      el('div', { class: 'empty-emoji' }, '✅'),
      el('h2', {}, 'Session complete!'),
      el('p', { class: 'muted' }, `${s.answered} reviews · ${s.again} needed another look.`),
      el('div', { class: 'cta-row' },
        el('button', { class: 'btn btn-primary', onClick: () => navigate('#/') }, 'Back to dashboard'),
        s.lessonNum ? el('button', { class: 'btn btn-ghost', onClick: () => navigate(`#/lesson/${s.lessonNum}`) }, 'Back to lesson') : null,
      ),
    )
  );
  session = null;
}

/* ------------------------------------------------------------------ */
/* View: Learn — Duolingo-style teach-then-practice lesson player       */
/* ------------------------------------------------------------------ */

const XP_PER = 10;             // XP per correct exercise
const START_HEARTS = 5;
let lesson = null;             // active lesson-player session

const EXERCISE_KINDS = new Set(['choose-en', 'choose-ar', 'type', 'match']);
const isExercise = (step) => EXERCISE_KINDS.has(step.kind);

function renderLearn(parts) {
  const num = parseInt(parts[2], 10);
  const steps = buildLessonSteps(num);
  const meta = getLesson(BOOK_NUM, num);
  if (!steps.length || !meta) {
    app.append(el('p', {}, 'Lesson not found.'));
    return;
  }
  lesson = {
    lessonNum: num,
    steps,
    index: 0,
    total: steps.length,
    hearts: getState().settings.useHearts ? START_HEARTS : Infinity,
    xp: 0,
    correct: 0,
    answered: 0,
    graded: new Set(),    // word ids already pushed to SRS this session
    phase: 'asking',      // 'asking' | 'checked'
    selected: null,
    lastCorrect: null,
    match: null,
  };
  renderStep();
}

// Update a word's SRS schedule once, the first time it's practised this session.
function gradeWord(word, correct) {
  if (!word || lesson.graded.has(word.id)) return;
  lesson.graded.add(word.id);
  const prev = cardRecord(word.id);
  const wasNew = isNew(prev);
  const updated = schedule(prev, correct ? RATING.GOOD : RATING.AGAIN);
  update((st) => { st.srs[word.id] = updated; });
  recordReview(wasNew);
}

function endLearn() {
  const n = lesson?.lessonNum;
  lesson = null;
  navigate(n ? `#/lesson/${n}` : '#/lessons');
}

function learnHeader() {
  const ls = lesson;
  const pct = Math.round((ls.index / ls.total) * 100);
  return el('div', { class: 'learn-top' },
    el('button', { class: 'learn-close', title: 'Quit lesson', onClick: endLearn }, '✕'),
    el('div', { class: 'learn-progress' },
      el('div', { class: 'learn-progress-fill', style: `width:${pct}%` }),
    ),
    ls.hearts === Infinity
      ? null
      : el('div', { class: 'hearts' + (ls.hearts <= 1 ? ' low' : '') }, '❤️', el('span', {}, String(ls.hearts))),
  );
}

function renderStep() {
  app.innerHTML = '';
  const ls = lesson;
  if (ls.index >= ls.steps.length) return renderLessonComplete();
  const step = ls.steps[ls.index];

  let body, footer;
  if (step.kind === 'grammar') { body = grammarBody(step); footer = teachFooter('Got it'); }
  else if (step.kind === 'intro') { body = introBody(step); footer = teachFooter('Continue'); }
  else if (step.kind === 'choose-en') { body = chooseBody(step, 'en'); footer = exerciseFooter(step); }
  else if (step.kind === 'choose-ar') { body = chooseBody(step, 'ar'); footer = exerciseFooter(step); }
  else if (step.kind === 'type') { body = typeBody(step); footer = exerciseFooter(step); }
  else if (step.kind === 'match') { body = matchBody(step); footer = matchFooter(step); }

  app.append(
    el('div', { class: 'learn' },
      learnHeader(),
      el('div', { class: 'learn-body' }, body),
      footer,
    )
  );
}

/* --- Teaching steps --- */

function grammarBody(step) {
  const showTranslit = getState().settings.showTransliteration;
  const preview = el('div', { class: 'teach-vocab-preview' });
  step.lesson.vocab.slice(0, 6).forEach((w) =>
    preview.append(el('span', { class: 'teach-chip ar', dir: 'rtl' }, w.ar)));
  return el('div', { class: 'teach' },
    el('div', { class: 'teach-tag' }, `Lesson ${step.lesson.number}`),
    el('h1', { class: 'teach-title ar', dir: 'rtl' }, step.lesson.titleArabic),
    el('p', { class: 'teach-subtitle' }, step.lesson.titleEnglish),
    el('div', { class: 'teach-grammar card panel' },
      el('h2', {}, '📘 Grammar'),
      el('p', { class: 'grammar', dir: 'auto' }, step.lesson.grammar),
    ),
    el('p', { class: 'muted small center' }, "You'll learn these words next:"),
    preview,
  );
}

function introBody(step) {
  const w = step.word;
  const showTranslit = getState().settings.showTransliteration;
  if (getState().settings.autoAudio) setTimeout(() => speak(w.ar), 180);
  return el('div', { class: 'teach center' },
    el('div', { class: 'teach-tag' }, 'New word'),
    el('div', { class: 'intro-ar-row' },
      el('div', { class: 'intro-ar ar', dir: 'rtl' }, w.ar),
    ),
    speakButton(w.ar, 'speak-lg'),
    showTranslit ? el('div', { class: 'intro-translit' }, w.translit) : null,
    el('div', { class: 'intro-arrow' }, '↓'),
    el('div', { class: 'intro-en' }, w.en),
  );
}

function teachFooter(label) {
  return el('div', { class: 'learn-footer' },
    el('button', { class: 'btn-duo btn-duo-primary', onClick: advance }, label),
  );
}

/* --- Choice exercises --- */

function chooseBody(step, answerLang) {
  const ls = lesson;
  const w = step.word;
  const prompt = answerLang === 'en'
    ? 'Select the meaning'
    : 'Select the Arabic word';
  const promptWord = answerLang === 'en'
    ? el('div', { class: 'q-word ar', dir: 'rtl' }, w.ar)
    : el('div', { class: 'q-word-en' }, w.en);
  const translit = (answerLang === 'en' && getState().settings.showTransliteration)
    ? el('div', { class: 'q-translit' }, w.translit) : null;

  const grid = el('div', { class: 'choice-grid' });
  step.options.forEach((opt) => {
    let cls = 'choice' + (answerLang === 'ar' ? ' choice-ar' : '');
    if (ls.phase === 'checked') {
      if (opt === step.answer) cls += ' correct';
      else if (opt === ls.selected) cls += ' wrong';
    } else if (opt === ls.selected) cls += ' selected';
    grid.append(
      el('button', {
        class: cls,
        disabled: ls.phase === 'checked' ? '' : false,
        onClick: () => { lesson.selected = opt; renderStep(); },
      }, answerLang === 'ar' ? el('span', { class: 'ar', dir: 'rtl' }, opt) : opt)
    );
  });

  return el('div', { class: 'q' },
    el('h2', { class: 'q-prompt' }, prompt),
    el('div', { class: 'q-card' },
      promptWord,
      answerLang === 'en' ? speakButton(w.ar) : null,
      translit),
    grid,
  );
}

function typeBody(step) {
  const ls = lesson;
  const w = step.word;
  const input = el('input', {
    class: 'type-input', type: 'text', autocomplete: 'off', autocapitalize: 'none',
    spellcheck: 'false', placeholder: 'Type the meaning in English…',
    value: ls.selected || '',
    disabled: ls.phase === 'checked' ? '' : false,
  });
  input.addEventListener('input', () => { lesson.selected = input.value; });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (ls.phase === 'asking') checkType(step); else advance(); }
  });
  // focus after render
  setTimeout(() => input.focus(), 0);
  return el('div', { class: 'q' },
    el('h2', { class: 'q-prompt' }, 'Translate to English'),
    el('div', { class: 'q-card' },
      el('div', { class: 'q-word ar', dir: 'rtl' }, w.ar),
      speakButton(w.ar),
      getState().settings.showTransliteration ? el('div', { class: 'q-translit' }, w.translit) : null,
    ),
    input,
  );
}

function exerciseFooter(step) {
  const ls = lesson;
  if (ls.phase === 'checked') return feedbackFooter(step);
  const canCheck = step.kind === 'type' ? true : ls.selected != null;
  const onCheck = step.kind === 'type' ? () => checkType(step) : () => checkChoice(step);
  return el('div', { class: 'learn-footer' },
    el('button', {
      class: 'btn-duo btn-duo-primary',
      disabled: canCheck ? false : '',
      onClick: onCheck,
    }, 'Check'),
  );
}

function feedbackFooter(step) {
  const ls = lesson;
  const correct = ls.lastCorrect;
  return el('div', { class: 'learn-footer feedback ' + (correct ? 'ok' : 'bad') },
    el('div', { class: 'feedback-msg' },
      el('span', { class: 'feedback-icon' }, correct ? '✓' : '✕'),
      el('div', {},
        el('div', { class: 'feedback-title' }, correct ? randomPraise() : 'Correct answer:'),
        correct ? null : el('div', { class: 'feedback-answer' },
          step.kind === 'choose-ar'
            ? el('span', { class: 'ar', dir: 'rtl' }, step.answer)
            : step.answer),
      ),
    ),
    el('button', { class: 'btn-duo ' + (correct ? 'btn-duo-green' : 'btn-duo-red'), onClick: advance }, 'Continue'),
  );
}

const PRAISES = ['Nice!', 'Great job!', 'Excellent!', 'Well done!', 'Correct!', 'أحسنت! (Bravo!)'];
function randomPraise() { return PRAISES[Math.floor(Math.random() * PRAISES.length)]; }

function checkChoice(step) {
  const ls = lesson;
  if (ls.phase !== 'asking') return;
  applyResult(step, ls.selected === step.answer, step.word);
}

function checkType(step) {
  const ls = lesson;
  if (ls.phase !== 'asking') return;
  const val = app.querySelector('.type-input')?.value ?? ls.selected ?? '';
  ls.selected = val;
  applyResult(step, answerMatches(val, step.answer), step.word);
}

function applyResult(step, correct, word) {
  const ls = lesson;
  ls.answered += 1;
  if (correct) { ls.correct += 1; ls.xp += XP_PER; }
  else { ls.hearts -= 1; }
  gradeWord(word, correct);
  ls.lastCorrect = correct;
  ls.phase = 'checked';
  renderStep();
}

/* --- Match exercise --- */

function matchBody(step) {
  const ls = lesson;
  if (!ls.match) {
    ls.match = {
      left: step.pairs.map((p) => p.id),
      right: shuffle(step.pairs.map((p) => p.id)),
      leftSel: null,
      matched: new Set(),
      wrong: null,
    };
  }
  const m = ls.match;
  const byId = Object.fromEntries(step.pairs.map((p) => [p.id, p]));

  const tile = (id, side) => {
    const w = byId[id];
    const done = m.matched.has(id);
    let cls = 'match-tile';
    if (done) cls += ' matched';
    else if (m.leftSel === id && side === 'left') cls += ' selected';
    else if (m.wrong === id) cls += ' wrong';
    return el('button', {
      class: cls,
      disabled: done ? '' : false,
      onClick: () => onMatchTap(step, id, side),
    }, side === 'left'
      ? el('span', { class: 'ar', dir: 'rtl' }, w.ar)
      : w.en);
  };

  return el('div', { class: 'q' },
    el('h2', { class: 'q-prompt' }, 'Tap the matching pairs'),
    el('div', { class: 'match-cols' },
      el('div', { class: 'match-col' }, ...m.left.map((id) => tile(id, 'left'))),
      el('div', { class: 'match-col' }, ...m.right.map((id) => tile(id, 'right'))),
    ),
  );
}

function onMatchTap(step, id, side) {
  const ls = lesson;
  const m = ls.match;
  m.wrong = null;
  if (m.matched.has(id)) return;
  if (side === 'left') { m.leftSel = id; renderStep(); return; }
  // right side tapped
  if (m.leftSel == null) { renderStep(); return; }
  const byId = Object.fromEntries(step.pairs.map((p) => [p.id, p]));
  if (m.leftSel === id) {
    m.matched.add(id);
    gradeWord(byId[id], true);
    m.leftSel = null;
    if (m.matched.size === step.pairs.length) {
      ls.answered += 1; ls.correct += 1; ls.xp += XP_PER;
      ls.lastCorrect = true;
      ls.phase = 'checked';
    }
    renderStep();
  } else {
    m.wrong = id;
    m.leftSel = null;
    renderStep();
  }
}

function matchFooter(step) {
  const ls = lesson;
  if (ls.phase === 'checked') {
    return el('div', { class: 'learn-footer feedback ok' },
      el('div', { class: 'feedback-msg' },
        el('span', { class: 'feedback-icon' }, '✓'),
        el('div', { class: 'feedback-title' }, 'All matched!'),
      ),
      el('button', { class: 'btn-duo btn-duo-green', onClick: advance }, 'Continue'),
    );
  }
  return el('div', { class: 'learn-footer' },
    el('div', { class: 'muted small' }, `${ls.match ? ls.match.matched.size : 0} / ${step.pairs.length} matched`),
  );
}

/* --- Advance / completion --- */

function advance() {
  const ls = lesson;
  const step = ls.steps[ls.index];
  // Re-queue a wrongly-answered exercise so it must be completed.
  if (ls.phase === 'checked' && ls.lastCorrect === false && isExercise(step)) {
    ls.steps.push({ ...step });
    ls.total += 1;
  }
  ls.index += 1;
  ls.phase = 'asking';
  ls.selected = null;
  ls.match = null;
  ls.lastCorrect = null;

  if (ls.hearts <= 0) return renderOutOfHearts();
  renderStep();
}

function renderOutOfHearts() {
  app.append(
    el('div', { class: 'learn' },
      learnHeader(),
      el('div', { class: 'empty-state' },
        el('div', { class: 'empty-emoji' }, '💔'),
        el('h2', {}, 'Out of hearts'),
        el('p', { class: 'muted' }, 'No worries — this is about learning, not losing. Refill and keep going.'),
        el('div', { class: 'learn-footer' },
          el('button', { class: 'btn-duo btn-duo-primary', onClick: () => {
            lesson.hearts = START_HEARTS;
            if (lesson.index >= lesson.steps.length) renderLessonComplete();
            else renderStep();
          } }, 'Refill & continue'),
          el('button', { class: 'btn-duo btn-duo-ghost', onClick: endLearn }, 'Quit'),
        ),
      ),
    )
  );
}

function renderLessonComplete() {
  const ls = lesson;
  const accuracy = ls.answered ? Math.round((ls.correct / ls.answered) * 100) : 100;
  const earned = ls.xp;

  // Persist: award XP, mark lesson complete, store best accuracy.
  recordXp(earned);
  update((s) => {
    const prev = s.lessons[ls.lessonNum] || {};
    s.lessons[ls.lessonNum] = {
      completed: true,
      completedAt: new Date().toISOString(),
      bestAccuracy: Math.max(prev.bestAccuracy || 0, accuracy),
      timesCompleted: (prev.timesCompleted || 0) + 1,
    };
  });

  const goal = getState().settings.dailyGoal || 30;
  const today = xpToday();
  const goalPct = Math.min(100, Math.round((today / goal) * 100));
  const num = ls.lessonNum;
  lesson = null;

  app.append(
    el('div', { class: 'complete' },
      el('div', { class: 'complete-burst' }, '🎉'),
      el('h1', { class: 'complete-title' }, 'Lesson complete!'),
      el('p', { class: 'muted' }, `الدَّرْس ${num} · ${accuracy === 100 ? 'Flawless!' : 'Keep it up!'}`),
      el('div', { class: 'complete-stats' },
        completeStat('⚡', `+${earned}`, 'XP earned', 'gold'),
        completeStat('🎯', `${accuracy}%`, 'Accuracy', 'green'),
      ),
      el('div', { class: 'card panel goal-panel' },
        el('div', { class: 'panel-head' },
          el('h2', {}, '🏁 Daily goal'),
          el('span', { class: 'muted small' }, `${today} / ${goal} XP`),
        ),
        progressBar(goalPct),
        goalPct >= 100 ? el('p', { class: 'muted small' }, 'Daily goal reached — great work! 🌟') : null,
      ),
      el('div', { class: 'cta-row center' },
        num < getBook(BOOK_NUM).lessons.length
          ? el('button', { class: 'btn-duo btn-duo-primary', onClick: () => navigate(`#/learn/${num + 1}`) }, 'Next lesson →')
          : el('button', { class: 'btn-duo btn-duo-primary', onClick: () => navigate('#/lessons') }, 'Back to lessons'),
        el('button', { class: 'btn-duo btn-duo-ghost', onClick: () => navigate(`#/lesson/${num}`) }, 'Review words'),
      ),
    )
  );
}

function completeStat(icon, value, label, tone) {
  return el('div', { class: `complete-stat tone-${tone}` },
    el('div', { class: 'cs-icon' }, icon),
    el('div', { class: 'cs-value' }, value),
    el('div', { class: 'cs-label' }, label),
  );
}

/* ------------------------------------------------------------------ */
/* View: Stats                                                         */
/* ------------------------------------------------------------------ */

function renderStats() {
  const stats = getState().stats;
  const status = deckStatus();
  app.append(el('h1', { class: 'page-title' }, 'Progress'));

  app.append(
    el('div', { class: 'stat-grid' },
      statCard('⚡', stats.xp || 0, 'total XP'),
      statCard('🔥', stats.streak, 'current streak'),
      statCard('🏆', stats.longestStreak, 'best streak'),
      statCard('🎓', status.learned, 'words learned'),
    ),
  );

  // Last 14 days bar chart.
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = isoDate(d);
    days.push({ key, label: d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2), count: stats.reviewsByDay[key] || 0 });
  }
  const max = Math.max(1, ...days.map((d) => d.count));
  const chart = el('div', { class: 'chart' });
  for (const d of days) {
    chart.append(
      el('div', { class: 'chart-col' },
        el('div', { class: 'chart-bar-wrap' },
          el('div', {
            class: 'chart-bar' + (d.count ? '' : ' empty'),
            style: `height:${Math.round((d.count / max) * 100)}%`,
            title: `${d.count} reviews`,
          }),
        ),
        el('div', { class: 'chart-label' }, d.label),
      )
    );
  }
  app.append(
    el('div', { class: 'card panel' },
      el('div', { class: 'panel-head' }, el('h2', {}, 'Reviews · last 14 days')),
      chart,
    ),
  );

  // Per-lesson mastery.
  const book = getBook(BOOK_NUM);
  const rows = el('div', { class: 'mastery-list' });
  for (const lesson of book.lessons) {
    const p = lessonProgress(lesson.number);
    if (!p.total) continue;
    rows.append(
      el('div', { class: 'mastery-row', onClick: () => navigate(`#/lesson/${lesson.number}`) },
        el('span', { class: 'mastery-num' }, String(lesson.number)),
        el('div', { class: 'mastery-bar' }, progressBar(p.pct)),
        el('span', { class: 'muted small' }, `${p.learned}/${p.total}`),
      )
    );
  }
  app.append(
    el('div', { class: 'card panel' },
      el('div', { class: 'panel-head' }, el('h2', {}, 'Mastery by lesson')),
      rows,
    ),
  );
}

/* ------------------------------------------------------------------ */
/* View: Settings                                                      */
/* ------------------------------------------------------------------ */

function renderSettings() {
  const settings = getState().settings;
  app.append(el('h1', { class: 'page-title' }, 'Settings'));

  const newPerDay = el('input', {
    type: 'number', min: '0', max: '100', value: String(settings.newCardsPerDay), class: 'input',
  });
  newPerDay.addEventListener('change', () => {
    const v = Math.max(0, Math.min(100, parseInt(newPerDay.value, 10) || 0));
    update((s) => { s.settings.newCardsPerDay = v; });
    newPerDay.value = String(v);
  });

  const translitToggle = el('input', { type: 'checkbox', class: 'toggle' });
  translitToggle.checked = settings.showTransliteration;
  translitToggle.addEventListener('change', () => {
    update((s) => { s.settings.showTransliteration = translitToggle.checked; });
  });

  const themeSelect = el('select', { class: 'input' },
    el('option', { value: 'auto' }, 'Auto (system)'),
    el('option', { value: 'light' }, 'Light'),
    el('option', { value: 'dark' }, 'Dark'),
  );
  themeSelect.value = settings.theme;
  themeSelect.addEventListener('change', () => {
    update((s) => { s.settings.theme = themeSelect.value; });
    applyTheme();
  });

  const dailyGoal = el('input', {
    type: 'number', min: '10', max: '500', step: '10', value: String(settings.dailyGoal), class: 'input',
  });
  dailyGoal.addEventListener('change', () => {
    const v = Math.max(10, Math.min(500, parseInt(dailyGoal.value, 10) || 30));
    update((s) => { s.settings.dailyGoal = v; });
    dailyGoal.value = String(v);
  });

  const heartsToggle = el('input', { type: 'checkbox', class: 'toggle' });
  heartsToggle.checked = settings.useHearts;
  heartsToggle.addEventListener('change', () => {
    update((s) => { s.settings.useHearts = heartsToggle.checked; });
  });

  const audioToggle = el('input', { type: 'checkbox', class: 'toggle' });
  audioToggle.checked = settings.autoAudio;
  audioToggle.addEventListener('change', () => {
    update((s) => { s.settings.autoAudio = audioToggle.checked; });
  });

  const studyRows = [
    settingRow('Daily XP goal', 'Experience points to aim for each day.', dailyGoal),
    settingRow('New cards per day', 'How many new words to introduce in flashcard review.', newPerDay),
    settingRow('Hearts in lessons', 'Lose a heart on a wrong answer (Duolingo style). Off = relaxed.', heartsToggle),
    settingRow('Show transliteration', 'Display Latin-script pronunciation.', translitToggle),
    settingRow('Theme', 'Appearance of the app.', themeSelect),
  ];
  if (canSpeak()) {
    studyRows.splice(3, 0, settingRow('Auto-play audio',
      'Pronounce each new word automatically during lessons.', audioToggle));
  }

  app.append(
    el('div', { class: 'card panel' }, el('h2', {}, 'Study'), ...studyRows),
    resourcesPanel(),
    el('div', { class: 'card panel' },
      el('h2', {}, 'Data'),
      el('p', { class: 'muted small' }, 'All your progress is stored locally in this browser. Back it up here.'),
      el('div', { class: 'cta-row' },
        el('button', { class: 'btn btn-secondary', onClick: doExport }, '⬇ Export backup'),
        el('button', { class: 'btn btn-secondary', onClick: doImport }, '⬆ Import backup'),
        el('button', { class: 'btn btn-danger', onClick: doReset }, '🗑 Reset all progress'),
      ),
    ),
  );
}

// Links to the original free source materials (lessons, audio, PDFs).
function resourcesPanel() {
  const link = (href, title, desc) =>
    el('a', { class: 'resource', href, target: '_blank', rel: 'noopener' },
      el('div', { class: 'resource-title' }, title, el('span', { class: 'resource-ext' }, ' ↗')),
      el('div', { class: 'muted small' }, desc),
    );
  return el('div', { class: 'card panel' },
    el('h2', {}, 'Source materials'),
    el('p', { class: 'muted small' },
      'This app teaches the freely-distributed Madinah Arabic course. For the original lessons, recorded audio, and printable PDFs, open these:'),
    el('div', { class: 'resource-list' },
      link('https://www.madinaharabic.com/arabic-language-course/lessons/',
        'Madinah Arabic — Language Course',
        'The original interactive lessons with recorded audio and exercises.'),
      link('https://abdurrahman.org/arabic-learning/madina-arabic/',
        'abdurrahman.org — Madinah Arabic',
        'Free Book 1–3 PDFs, lesson audio (mp3), solutions and study notes.'),
    ),
  );
}

function settingRow(title, desc, control) {
  return el('div', { class: 'setting-row' },
    el('div', {},
      el('div', { class: 'setting-title' }, title),
      el('div', { class: 'muted small' }, desc),
    ),
    el('div', { class: 'setting-control' }, control),
  );
}

function doExport() {
  const blob = new Blob([exportState()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: `madinah-progress-${todayKey()}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function doImport() {
  const input = el('input', { type: 'file', accept: 'application/json' });
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importState(reader.result);
        alert('Backup imported successfully.');
        router();
      } catch (err) {
        alert('Could not read that backup file.');
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

function doReset() {
  if (confirm('This will erase all your progress, streaks, and review history. Continue?')) {
    resetState();
    navigate('#/');
    router();
  }
}

/* ------------------------------------------------------------------ */
/* Theme + keyboard                                                    */
/* ------------------------------------------------------------------ */

function applyTheme() {
  const theme = getState().settings.theme;
  document.documentElement.dataset.theme = theme;
}

function handleKeys(e) {
  if (lesson && location.hash.startsWith('#/learn/')) return handleLearnKeys(e);
  if (!session) return;
  if (!location.hash.startsWith('#/review')) return;
  if (!session.revealed) {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      reveal();
    }
    return;
  }
  const map = { Digit1: RATING.AGAIN, Digit2: RATING.HARD, Digit3: RATING.GOOD, Digit4: RATING.EASY, Space: RATING.GOOD, Enter: RATING.GOOD };
  if (e.code in map) {
    e.preventDefault();
    rate(map[e.code]);
  }
}

// Keyboard shortcuts inside the lesson player.
function handleLearnKeys(e) {
  const ls = lesson;
  const step = ls.steps[ls.index];
  if (!step) return;
  // Enter advances (continue / check / got-it).
  if (e.key === 'Enter') {
    e.preventDefault();
    if (!isExercise(step) || ls.phase === 'checked') return advance();
    if (step.kind === 'type') return checkType(step);
    if (ls.selected != null) return checkChoice(step);
    return;
  }
  // Number keys pick a choice option.
  if ((step.kind === 'choose-en' || step.kind === 'choose-ar') && ls.phase === 'asking') {
    const idx = parseInt(e.key, 10) - 1;
    if (idx >= 0 && idx < step.options.length) {
      e.preventDefault();
      lesson.selected = step.options[idx];
      renderStep();
    }
  }
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

window.addEventListener('hashchange', router);
window.addEventListener('keydown', handleKeys);
applyTheme();
router();
