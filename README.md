# Next.js Tailwind Task Planner

A polished to-do list experience built with Next.js, React, and Tailwind CSS. It embraces delightful gradients, smooth spacing, and thoughtful validation so you can capture priorities quickly and keep daily goals on track.

## Project Structure
- `app/` — App Router entrypoint with a Tailwind-styled shell and supporting sections.
- `components/TodoApp.tsx` — Client component containing the task logic and UI.
- `__tests__/` — Jest + React Testing Library specs that lock in expected UX behaviors.
- `setup.sh` / `reset.sh` — Scripts for installing dependencies and resetting the workspace.

## Getting Started
1. Clone this repository inside your preferred workspace.
2. Run `./setup.sh` (or `bash setup.sh`) to install dependencies via Yarn.
3. Launch the development server with `yarn dev`.
4. Visit [http://localhost:3000](http://localhost:3000) to interact with the application.

> **Tip:** The dev server is already configured to run on port 3000 as required.

## Testing & Verification
- Run all automated checks with one command: `yarn verify`.
- `yarn test` executes the Jest suite, which covers:
  - Preventing empty task submissions with helpful feedback.
  - Ensuring state updates remain immutable and scoped to the affected task.
  - Verifying Tailwind gradient styles are applied to the primary call-to-action button.

## Usage Highlights
- Enter a task, press **Add task** (or hit Enter) to capture it instantly.
- Toggle completion via the checkbox to keep progress in sight.
- Use the quick filters (All / Active / Completed) to declutter the list.
- Delete items you no longer need to stay focused on what matters.

## Known Issues / Limitations
- Tasks are stored in component state only. Refreshing the page clears the list.
- There is no offline sync or multi-user persistence in this demo build.

## Resetting the Environment
If you need a clean slate, run `./reset.sh` to remove `node_modules`, `.next`, and the lockfile.
