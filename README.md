# Protocols
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Static site generator for step-by-step routines.

Requires Node.js 23.6 or newer (uses native TypeScript stripping).

You can install it globally on your computer with:
```sh
npm install -g .
```

Then you can run it in a folder with your routines and upload the output to your hosting:
```sh
$ cd ~/routines
$ protocols
Generated 2 pages in /Users/anton/routines/output/
$ rsync -avz --delete output/ USER@HOST:/var/www/SITE/
$ rm -rf output/
```

The generated site is a PWA, so you can install it on your phone and use it like a native app - offline-capable and launched from your home screen.

- iOS (Safari): open the site, tap the Share button, then `Add to Home Screen`.
- Android (Chrome): open the site, tap the menu, then `Install app` (or `Add to Home Screen`).

## Routine
Each routine is just a markdown file. Like this:
```md
# My morning routine
Things I want to do early in the day.

## Shower
Take a nice cold shower.

## Wash your teeth
You will thank yourself later.

## Check your bag
- key
- driver license
- lunch

## Go to work and have a nice day
Be safe.
```

The first-level heading and the text below it are shown on the main screen.
![Main page](screenshots/main%20page.png)

Each section with a second-level heading becomes one step in the routine.

![First step](screenshots/first%20step.png)

When you finish all steps, you'll see a final screen.

![Final step](screenshots/final%20step.png)

## Install on your phone
The generated site is a PWA, so you can install it on your phone and use it like a native app — offline-capable and launched from your home screen.

- **iOS (Safari):** open the site, tap the Share button, then *Add to Home Screen*.
- **Android (Chrome):** open the site, tap the menu (⋮), then *Install app* (or *Add to Home Screen*).