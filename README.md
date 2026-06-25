# Madinah Book 1 — Learn & Practice Arabic

A **free, offline, no-account** web app for learning and practicing
*Durus al-Lughah al-ʿArabiyyah* (the Madinah Arabic course), **Book 1**.

All 23 lessons — each taught through grammar explanations and **worked example
sentences**, then drilled Duolingo-style — plus progress tracking and
**spaced-repetition revision**, all running entirely in your browser. Your
progress is saved in `localStorage`; nothing is sent anywhere.

> The teaching content (grammar progression and example sentences) follows the
> free [Madinah Arabic Language Course](https://www.madinaharabic.com/arabic-language-course/lessons/),
> adapted into this app's own data: grammar explanations are rewritten in our
> own words, and the example sentences are from the underlying (freely
> distributed) *Durus al-Lughah* text by Dr. V. Abdur Rahim.

## Features

- 📚 **All 23 lessons of Book 1**, with the lesson sequence and topics following
  the Madinah Arabic course. Each lesson has step-by-step **grammar sections**, a
  set of **worked example sentences** (Arabic with full ḥarakāt, transliteration,
  English), and its vocabulary list.
- 🎮 **Duolingo-style lessons** — each lesson *teaches* the grammar, the new
  words, and the example sentences, then drills them with interactive exercises:
  multiple-choice (both directions), type-the-translation, tap-the-pairs
  matching, **translate-the-sentence**, and **build-the-sentence** from a word
  bank. Earn **XP**, keep **hearts**, get instant ✓/✗ feedback, and finish with a
  celebration screen and **daily-goal** progress.
- 🎧 **Audio** — the original Book 1 lesson recordings (Dr. V. Abdur Rahim, via
  the Internet Archive) play right inside each lesson, and every individual word
  has on-device pronunciation (Web Speech API) — so all vocabulary is voiced,
  even offline.
- 🔁 **Spaced repetition** — a built-in SM-2 scheduler (the algorithm behind
  Anki) introduces new words gradually and reviews them at expanding intervals.
  Answering exercises automatically feeds each word into the review schedule.
- 🌱 **Daily new-card limit** so you build vocabulary at a steady, sustainable pace.
- 🔥 **Streaks & progress** — daily review streak, a 14-day activity chart, and
  per-lesson mastery bars.
- ⌨️ **Keyboard friendly** — `Space` to reveal, `1`–`4` to rate (Again / Hard /
  Good / Easy).
- 💾 **Backup & restore** — export/import your whole progress as a JSON file.
- 📱 **Responsive** with light/dark themes.

## Running it

This is a static site (HTML/CSS/JS, no build step). Because it uses ES modules,
serve it over `http://` rather than opening `index.html` from the file system.

**Quick local run:**

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

…or any static server (`npx serve`, the VS Code Live Server extension, etc.).

**Deploy free on GitHub Pages:** push this repo and enable Pages on the branch —
the app works as-is with no configuration.

## How study works

- The **lesson** is the content core: open one to read its grammar sections and
  example sentences, then hit **Start lesson** for the teach-then-practice
  player. It teaches the rules, the new words, and the worked sentences, then
  drills all of them with word and sentence exercises.
- **Revision comes after.** Once you *finish* a lesson, its words **and**
  sentences flow into the **spaced-repetition** review (the home-screen
  **Review**). Lessons you haven't completed yet don't clutter your reviews.
- Each review item is a flashcard (Arabic → meaning). After revealing the
  answer, rate how well you knew it:
  - **Again** — forgot it; it comes back this session.
  - **Hard / Good / Easy** — schedules it further out the better you knew it.
- New review items are introduced up to your **daily limit** (change it in
  **Settings**).

## Project structure

```
index.html          App shell + navigation
css/styles.css      Styling (light/dark, responsive, Duolingo-style player)
js/
  app.js            UI, routing, study sessions, and the lesson player
  exercises.js      Builds the teach-then-practice exercise sequence
  srs.js            SM-2 spaced-repetition scheduling
  storage.js        localStorage persistence (load/save/export/import)
  content.js          Merges lesson content and derives word + sentence cards
  data/book1.js       Book 1 lessons: titles, grammar notes, and vocabulary
  data/book1_content.js  Adapted grammar sections + example sentences per lesson
```

## Extending it

The course content is plain data. `js/data/book1.js` holds each lesson's title,
grammar note, and vocabulary; `js/data/book1_content.js` holds the adapted
teaching **sections** and **example sentences** (and, for a few lessons whose
original topic was inaccurate, title/grammar/vocab overrides realigned to the
source course). The two are merged in `js/content.js` at load. To add Book 2,
create `js/data/book2.js` exporting the same shape and add it to the `BOOKS`
array — the lessons, cards, and scheduling all pick it up automatically.

## License

App code: MIT. The example sentences are from the freely-distributed *Durus
al-Lughah* (Madinah Arabic) text; grammar explanations are this project's own
adaptation of the topics taught in the free Madinah Arabic course.
