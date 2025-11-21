# To-Do List (Debug) — Next.js + Tailwind

This project is a minimal Next.js app with a corrected To-Do List component for debugging. It implements fixes for common issues found in the original `input.ts` such as: preventing empty tasks, maintaining immutable updates, fixing a Tailwind typo, and adding key props.

## Features
- Prevent adding empty tasks
- Immutable state updates (no splice or direct mutation)
- Each task uses a unique `id` and `key` prop
- Correct Tailwind class (bg-blue-500)
- Automated tests with Jest + React Testing Library to validate behavior and code-quality checks

## Setup
1. Install dependencies:

```bash
./setup.sh
```

2. Start dev server (runs on port 3000):

```bash
npm run dev
```

3. Run tests / verification:

```bash
npm run verify
```

## Usage
Type a task into the input and click `Add`. You can toggle completion with the checkbox, and remove tasks with Delete.

## Known Issues
- This is a minimal demo/prototype and does not include persistence (no localStorage or backend), nor advanced accessibility checks.
