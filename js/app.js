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

function recordReview(isNewCard) {
  update((s) => {
    const today = todayKey();
    s.stats.reviewsByDay[today] = (s.stats.reviewsByDay[today] || 0) + 1;
    s.stats.totalReviews += 1;
    if (isNewCard) {
      s.stats.newByDay = s.stats.newByDay || {};
      s.stats.newByDay[today] = (s.stats.newByDay[today] || 0) + 1;
    }
    // Streak update.
    if (s.stats.lastStudyDate !== today) {
      const yesterday = isoDate(new Date(Date.now() - 86400000));
      if (s.stats.lastStudyDate === yesterday) {
        s.stats.streak += 1;
      } else {
        s.stats.streak = 1;
      }
      s.stats.lastStudyDate = today;
      s.stats.longestStreak = Math.max(s.stats.longestStreak, s.stats.streak);
    }
  });
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const routes = {
  '': renderDashboard,
  '#/': renderDashboard,
  '#/lessons': renderLessons,
  '#/lesson': renderLessonDetail, // #/lesson/<n>
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
  const lessonsDone = Object.values(getState().lessons).filter((l) => l.completed).length;

  const studyCount = status.due + status.newRemaining;

  app.append(
    el('section', { class: 'hero' },
      el('p', { class: 'eyebrow' }, 'Madinah Arabic · Book 1'),
      el('h1', { class: 'hero-title ar', dir: 'rtl' }, book.title),
      el('p', { class: 'hero-sub' }, 'Learn every lesson, build your vocabulary, and lock it in with spaced repetition.'),
    ),
    el('div', { class: 'stat-grid' },
      statCard('🔥', stats.streak, stats.streak === 1 ? 'day streak' : 'day streak'),
      statCard('📅', status.due, 'cards due'),
      statCard('🌱', status.newRemaining, 'new today'),
      statCard('📖', `${lessonsDone}/${book.lessons.length}`, 'lessons done'),
    ),
    el('div', { class: 'cta-row' },
      el('button', {
        class: 'btn btn-primary btn-lg',
        disabled: studyCount === 0 ? '' : false,
        onClick: () => navigate('#/review'),
      }, studyCount > 0 ? `Study now · ${studyCount} card${studyCount === 1 ? '' : 's'}` : 'All caught up 🎉'),
      el('button', {
        class: 'btn btn-ghost btn-lg',
        onClick: () => navigate('#/lessons'),
      }, 'Browse lessons'),
    ),
    progressOverview(status),
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
      done ? el('span', { class: 'badge badge-done lg' }, '✓ Completed') : null,
    ),
    el('div', { class: 'card panel' },
      el('h2', {}, 'Grammar'),
      el('p', { class: 'grammar ar-inline', dir: 'auto' }, lesson.grammar),
    ),
    vocabTable(lesson, showTranslit),
    el('div', { class: 'cta-row' },
      el('button', {
        class: 'btn btn-primary',
        disabled: lesson.vocab.length ? false : '',
        onClick: () => navigate(`#/review/lesson/${num}`),
      }, 'Study this lesson'),
      el('button', {
        class: 'btn ' + (done ? 'btn-ghost' : 'btn-secondary'),
        onClick: () => {
          update((s) => {
            s.lessons[num] = {
              completed: !done,
              completedAt: !done ? new Date().toISOString() : null,
            };
          });
          renderLessonDetail(parts);
        },
      }, done ? 'Mark as not done' : 'Mark lesson complete'),
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
        el('div', { class: 'vocab-ar ar', dir: 'rtl' }, w.ar),
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
/* View: Stats                                                         */
/* ------------------------------------------------------------------ */

function renderStats() {
  const stats = getState().stats;
  const status = deckStatus();
  app.append(el('h1', { class: 'page-title' }, 'Progress'));

  app.append(
    el('div', { class: 'stat-grid' },
      statCard('🔥', stats.streak, 'current streak'),
      statCard('🏆', stats.longestStreak, 'best streak'),
      statCard('🔁', stats.totalReviews, 'total reviews'),
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

  app.append(
    el('div', { class: 'card panel' },
      el('h2', {}, 'Study'),
      settingRow('New cards per day', 'How many new words to introduce daily.', newPerDay),
      settingRow('Show transliteration', 'Display Latin-script pronunciation.', translitToggle),
      settingRow('Theme', 'Appearance of the app.', themeSelect),
    ),
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

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

window.addEventListener('hashchange', router);
window.addEventListener('keydown', handleKeys);
applyTheme();
router();
