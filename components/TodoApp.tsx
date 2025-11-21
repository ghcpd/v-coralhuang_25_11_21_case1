import React, { useMemo, useState } from 'react';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter a task.');
      return;
    }
    setTasks((prev) => [...prev, { id: generateId(), text: trimmed, completed: false }]);
    setInput('');
    setError('');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const remainingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">
          To-Do List
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              data-testid="task-input"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition shadow-sm"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Task input"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>
          <button
            data-testid="add-button"
            className="sm:w-auto w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 text-white font-semibold px-5 py-3 rounded-xl transition transform hover:-translate-y-0.5 shadow-md disabled:shadow-none"
            onClick={addTask}
            disabled={!input.trim()}
            aria-label="Add task"
          >
            Add
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span data-testid="tasks-remaining">
            {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
          </span>
        </div>

        {tasks.length === 0 ? (
          <div
            data-testid="empty-state"
            className="text-center text-gray-400 text-sm py-10 border border-dashed border-gray-200 rounded-2xl"
          >
            Your list is empty. Add your first task!
          </div>
        ) : (
          <ul className="space-y-3" data-testid="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 shadow-sm transition hover:shadow-lg"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-400 cursor-pointer"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Toggle task ${task.text}`}
                />
                <span
                  className={`ml-3 flex-1 text-sm sm:text-base ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                >
                  {task.text}
                </span>
                <button
                  className="ml-3 text-red-500 hover:text-red-600 text-sm font-medium transition"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete task ${task.text}`}
                  data-testid="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
