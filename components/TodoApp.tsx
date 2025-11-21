"use client";

import { useMemo, useState } from "react";

type Filter = "all" | "active" | "completed";
export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const filterLabels: Record<Filter, string> = {
  all: "All",
  active: "Active",
  completed: "Completed"
};

const createTask = (text: string): Task => ({
  id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  text,
  completed: false
});

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string>("");

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  const remainingCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const handleAddTask = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setError("Add some details before capturing a task.");
      return;
    }

    setTasks((previous) => [createTask(trimmed), ...previous]);
    setDraft("");
    setError("");
  };

  const handleDelete = (id: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  const handleToggle = (id: string) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  return (
    <section className="flex flex-col gap-8" data-testid="todo-app">
      <div className="rounded-[32px] bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 p-[1px] shadow-glow">
        <div className="rounded-[32px] bg-slate-950/90 p-8">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-200">
              Task Flow
            </p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Plan the perfect day</h1>
            <p className="text-base text-slate-300">
              Capture thoughts instantly, keep priorities in sight, and glide through your checklists with satisfying feedback.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <label className="text-left text-sm font-medium text-indigo-200" htmlFor="todo-input">
              Task details
            </label>
            <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/80 p-4 shadow-inner shadow-slate-900/60 sm:flex-row sm:items-center">
              <input
                id="todo-input"
                aria-label="Task description"
                className="flex-1 rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                placeholder="Write the single next action..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleAddTask}
                disabled={!draft.trim()}
              >
                Add task
                <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
            {error && (
              <p role="status" className="text-sm font-medium text-rose-300">
                {error}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm uppercase tracking-widest text-slate-400">
                {remainingCount === 0 ? "All tasks are wrapped" : `${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} in flight`}
              </p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(filterLabels) as Filter[]).map((filterValue) => (
                  <button
                    key={filterValue}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      filterValue === filter
                        ? "border-indigo-400 bg-indigo-500/20 text-white"
                        : "border-slate-700 text-slate-400 hover:text-white"
                    }`}
                    onClick={() => setFilter(filterValue)}
                  >
                    {filterLabels[filterValue]}
                  </button>
                ))}
              </div>
            </div>

            <ul className="flex flex-col gap-3" data-testid="task-list">
              {filteredTasks.length === 0 && (
                <li className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 px-5 py-6 text-center text-slate-400">
                  Nothing here yet — highlight your first win above.
                </li>
              )}

              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-left text-base text-white transition hover:border-indigo-500/40 hover:bg-slate-900"
                >
                  <label className="flex flex-1 items-center gap-3">
                    <input
                      type="checkbox"
                      className="size-5 rounded border-2 border-slate-700 bg-slate-950 text-indigo-400 focus:ring-indigo-400"
                      checked={task.completed}
                      onChange={() => handleToggle(task.id)}
                    />
                    <span
                      className={`flex-1 text-lg transition ${
                        task.completed ? "text-slate-500 line-through" : "text-white"
                      }`}
                    >
                      {task.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-semibold uppercase tracking-wide text-rose-300 transition hover:text-rose-200"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoApp;
