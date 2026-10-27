# Pocketplan

A responsive personal budgeting app built with JavaScript and Vite. Add recurring monthly income and expenses, set a savings target and timeline, and get a plan based on your available surplus.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the address shown by Vite. `npm run build` creates a production build in `dist/`; `npm run preview` serves that build locally. Deploy `dist/` to any static website host. No backend, environment variables, or API keys are needed.

## Features

- Add and delete named monthly income and expense entries.
- See monthly totals and available savings immediately.
- Set a goal, existing savings, and a timeline of 1–60 months.
- See required monthly savings, budget shortfalls, and an alternative timeline when possible.
- Save automatically in this browser with localStorage, with visible errors if saving fails.
- Export a JSON backup on desktop or mobile.
- Responsive layouts, labeled inputs, keyboard focus indicators, and accessible goal progress.

Amounts are in USD. Entries represent a recurring monthly budget rather than a transaction history. Savings progress uses the already-saved amount you enter; it does not transfer funds or automatically increase over time. Data is specific to this browser and site address, does not sync between devices, and may be lost if browser storage is cleared. Export before clearing storage. Export files are backups for your own records; an import interface is not included.

## Checks

```sh
npm test
npm run build
npm run test:e2e
```

Browser tests run against Chromium at `/usr/bin/chromium` in the cloud environment. Elsewhere install Chromium and set `CHROMIUM_PATH` to its executable path. Tests exercise desktop and phone viewports, including adding/deleting entries, calculating plans, reload persistence, completed goals, deficits, validation, export, safe user input, and storage failures.

This is a planning tool. Suggestions are estimates, and you should only adjust expenses that are safe to change.
