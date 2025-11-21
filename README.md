# Debug To-Do List (Next.js + React + TypeScript + Tailwind)

This repository contains a small Next.js app that demonstrates a fixed, robust To-Do list component. The original `input.ts` showed a number of bugs; this project adds a corrected `DebugToDoList` component with tests and scripts.

Features fixed and verified by automated tests:
- Prevent adding empty / whitespace-only tasks
- Immutable updates of tasks (no direct mutation of state)
- Unique keys for list items
- Proper Tailwind CSS classes and UI polish

Quick start
1. Install dependencies: ./setup.sh
2. Start the dev server: yarn dev
3. Open http://localhost:3000

Testing
- Run tests: yarn test
- One-command verify: yarn verify

Scripts
- yarn dev — run Next.js dev server on port 3000
- yarn build — build production
- yarn start — start production server
- yarn test — run unit tests
- yarn verify — same as yarn test

Known issues
- This is a small demo focused on ensuring React state immutability and minimal bugs — not a full product.
