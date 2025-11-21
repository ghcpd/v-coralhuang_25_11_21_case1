# To-Do List (Next.js + Tailwind CSS)

A modern, responsive to-do list application built with **Next.js**, **React**, and **Tailwind CSS**. Includes automated tests using **Jest** and **React Testing Library** to validate core behaviors and bug fixes.

## Features
- Add, toggle, and delete tasks with immutable state updates
- Validation prevents empty/whitespace-only tasks
- Accessible UI with keyboard support (Enter to add)
- Stylish, responsive design using Tailwind CSS
- Automated tests to verify correctness (keys, classes, validation, behaviors)

## Project Structure
```
├─ pages/
│  ├─ _app.tsx        # Next.js app wrapper
│  └─ index.tsx       # Home page rendering the TodoApp
├─ components/
│  └─ TodoApp.tsx     # Main To-Do component (fixed version)
├─ styles/
│  └─ globals.css     # Tailwind directives & global styles
├─ __tests__/
│  └─ TodoApp.test.tsx # Jest + RTL tests
├─ input.ts           # Original buggy component (unchanged)
├─ package.json
├─ jest.config.js
├─ jest.setup.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ setup.sh
└─ reset.sh
```

## Setup
> Requires Node.js 18+.

```bash
./setup.sh
```
The script detects `yarn` if available, otherwise uses `npm`.

## Development Server
Start the Next.js dev server on port 3000:
```bash
nohup yarn dev -p 3000 > /tmp/nextjs.log 2>&1 &
# or
nohup npm run dev -- -p 3000 > /tmp/nextjs.log 2>&1 &
```
Verify it responds at http://localhost:3000 (HTTP 200). Inspect logs if needed:
```bash
tail -n 200 /tmp/nextjs.log
```

## Testing
Run the automated test suite:
```bash
yarn test
# or
npm test
```

### One-command verification
```bash
npm run verify
# or
yarn verify
```

The tests validate:
- Empty task validation
- Immutable state updates (behavioral assurance)
- React list keys present (no key warnings)
- Tailwind class correctness on the Add button
- Toggle and delete behaviors

## Usage
1. Type a task and click **Add** (or press **Enter**).
2. Toggle completion via the checkbox.
3. Delete tasks with the **Delete** button.
4. Remaining tasks counter updates automatically.

## Known Issues / Notes
- `input.ts` remains untouched as a reference to the original buggy component.
- Windows users may need Git Bash/WSL to run `*.sh` scripts.
- SSR is disabled for `TodoApp` via dynamic import to avoid hydration nuances for this demo.

## Reset
To clean the workspace and reinstall dependencies:
```bash
./reset.sh
```
