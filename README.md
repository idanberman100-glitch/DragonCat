# 🐉🐱 The Spark of the Dragon-Cat

A storybook **and** platformer game made by Idan. Read the two-book story, or
jump into the game and play as Cinder the Dragon-Cat in 9 elemental forms (plus
his brother Spike) across Classic and Fighting modes.

## What's in this folder

The game is now split into separate pages, so each one is small and easy to edit
in Gemini Canvas on its own (and a broken edit in one can't break the others).

| File | What it is |
| --- | --- |
| `index.html` | The **home menu** — links to the books and the game. |
| `book1.html` | Book 1 story (text + pictures). |
| `book2.html` | Book 2 story (text + pictures). |
| `game.html` | The platformer game (both Classic & Fighting modes — one engine). |
| `images/` | Put the book pictures here (see `images/README.md`). |
| `i18n.js` | The language engine (English / Hebrew / Spanish) + the language buttons. |
| `locales/he.json`, `locales/es.json` | The Hebrew and Spanish translations. |
| `the_spark_of_the_dragon_cat.html` | Idan's **original** file, kept exactly as-is (do not edit). |
| `server.js` | A tiny web server that serves the pages. No extra libraries needed. |
| `package.json` | Tells Railway how to start the app (`npm start`). |

### How the pages connect

- `index.html` → **Story Mode** lists the books → opens `book1.html` / `book2.html`.
- `index.html` → **Game Mode** → pick a mode and hero → opens
  `game.html?mode=fighting&start=0&form=fire` (the choice is passed in the link).
- Every book and the game has a button to go back to `index.html`.

To edit just the story, Idan opens `book1.html` (or `book2.html`) in Canvas.
To edit the game, he opens `game.html`. The home menu rarely needs changing.

## Languages (English / Hebrew / Spanish)

The story works in three languages. There are language buttons (**EN / ES / עב**)
in the top corner of every story page; the choice is remembered. Hebrew shows
right-to-left automatically. You can also link straight to a language with
`?lang=he` or `?lang=es` (e.g. `book1.html?lang=he`).

**How it works (offline translation):** the **English** text stays written
straight inside the HTML — so Idan keeps writing English in Gemini Canvas like
always. Each piece of text has a small tag, e.g. `data-i18n="Book1.p1"`. The
Hebrew and Spanish versions live in `locales/he.json` and `locales/es.json`,
matched up by those tags. No internet translation service is used.

**Important — keep translations in sync:** if Idan changes an English sentence
in Canvas, the Hebrew/Spanish for that sentence won't update by itself. Anything
that doesn't have a translation simply **falls back to English**, so the page
never breaks — it just shows English for that bit until the translation is added.
To translate a new line, find its `data-i18n="..."` tag and add the same key with
the translated text to `locales/he.json` and `locales/es.json`.

## What was fixed

The original file was **cut off near the end**, so the game never ran — a
JavaScript error stopped *all* the code from loading (even the menu buttons).
The fixes, applied only to `index.html`, were:

1. Completed the cut-off `draw()` function (trophy + the player character drawing).
2. Added the missing `gameLoop()` that runs the game every frame.
3. Closed the `<script>`, `<body>`, and `<html>` tags.
4. Fixed a small typo: `stroke()` → `ctx.stroke()` (it would have crashed the
   Flare hero's super move).

## Run it on your computer

You need [Node.js](https://nodejs.org) installed (version 18 or newer). Then:

```bash
npm start
```

Open your browser to **http://localhost:3000**.

(You can also just double-click `index.html` to play without a server.)

## Put it online with Railway

1. Push this folder to GitHub (see below).
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
3. Pick this repository. Railway auto-detects Node.js and runs `npm start`.
4. When it finishes, open **Settings → Networking → Generate Domain** to get a
   public link you can share. 🎉

Railway provides the `PORT` automatically — `server.js` already listens on it.

## Push to GitHub

```bash
git init
git add .
git commit -m "The Spark of the Dragon-Cat"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
