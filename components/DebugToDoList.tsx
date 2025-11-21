import React, { useState } from 'react';

export type Task = { id: string; text: string; completed: boolean };

export default function DebugToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    // Prevent adding empty or whitespace-only tasks
    if (!input.trim()) return;
    const newTask: Task = { id: String(Date.now()) + Math.random().toString(36).slice(2), text: input.trim(), completed: false };
    // Treat state as immutable
    setTasks((prev) => [...prev, newTask]);
    setInput('');
  };

  const deleteTask = (id: string) => {
    // Return a new array without the deleted item (immutable)
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    // Produce a new array and new task objects to avoid direct mutation
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">To-Do List (Debug)</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs doing?"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            data-testid="task-input"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:opacity-90"
            data-testid="add-button"
          >
            Add
          </button>
        </div>

        <ul data-testid="task-list">
          {tasks.length === 0 ? (
            <li className="text-sm text-slate-500">No tasks yet — add something above.</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  data-testid={`checkbox-${task.id}`}
                />
                <span className={`${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{task.text}</span>
                <button
                  className="ml-auto text-sm text-red-500 hover:underline"
                  onClick={() => deleteTask(task.id)}
                  data-testid={`delete-${task.id}`}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
