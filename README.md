# Madinah Book 1 — Learn & Practice Arabic

A **free, offline, no-account** web app for learning and practicing
*Durus al-Lughah al-ʿArabiyyah* (the Madinah Arabic course), **Book 1**.

All 23 lessons, the vocabulary from every lesson, grammar notes, progress
tracking, and **spaced-repetition flashcards** — all running entirely in your
browser. Your progress is saved in `localStorage`; nothing is sent anywhere.

> The Madinah Arabic books by Dr. V. Abdur Rahim are freely distributed for
> teaching, so this content is copyright-free and safe to learn from and share.

## Features

- 📚 **All 23 lessons of Book 1** — each with a concise grammar explanation and
  its full vocabulary list (Arabic with full ḥarakāt, transliteration, English).
- 🔁 **Spaced repetition** — a built-in SM-2 scheduler (the algorithm behind
  Anki) introduces new words gradually and reviews them at expanding intervals.
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

- Open a **lesson** to read its grammar and browse the vocabulary, then hit
  **Study this lesson** to drill its words, or use **Review** on the home screen
  to study everything that's due across all lessons.
- Each word is a flashcard (Arabic → meaning). After revealing the answer, rate
  how well you knew it:
  - **Again** — forgot it; it comes back this session.
  - **Hard / Good / Easy** — schedules it further out the better you knew it.
- New words are introduced up to your **daily limit** (default 15, change it in
  **Settings**).

## Project structure

```
index.html          App shell + navigation
css/styles.css      Styling (light/dark, responsive)
js/
  app.js            UI, routing, and the study-session controller
  srs.js            SM-2 spaced-repetition scheduling
  storage.js        localStorage persistence (load/save/export/import)
  content.js        Derives flashcards from the course content
  data/book1.js     Book 1 lessons, grammar notes, and vocabulary
```

## Extending it

The content is plain data in `js/data/book1.js`. To add Book 2, create
`js/data/book2.js` exporting the same shape and add it to the `BOOKS` array in
`js/content.js` — the lessons, cards, and scheduling all pick it up automatically.

## License

App code: MIT. Course content is from the freely-distributed Madinah Arabic books.
