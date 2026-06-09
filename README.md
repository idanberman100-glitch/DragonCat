# 🐉🐱 The Spark of the Dragon-Cat

A storybook **and** platformer game made by Idan. Read the two-book story, or
jump into the game and play as Cinder the Dragon-Cat in 9 elemental forms (plus
his brother Spike) across Classic and Fighting modes.

## What's in this folder

| File | What it is |
| --- | --- |
| `index.html` | The **working** game + story. This is what gets played and deployed. |
| `the_spark_of_the_dragon_cat.html` | Idan's **original** file, kept exactly as-is (do not edit). |
| `server.js` | A tiny web server that serves the game. No extra libraries needed. |
| `package.json` | Tells Railway how to start the app (`npm start`). |

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
