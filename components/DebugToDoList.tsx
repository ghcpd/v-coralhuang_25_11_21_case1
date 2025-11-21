import React, { useState } from 'react';

type Task = { id: string; text: string; completed: boolean };

export default function DebugToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const text = input.trim();
    if (!text) return; // prevent empty strings
    const newTask: Task = { id: `${Date.now()}-${Math.random()}`, text, completed: false };
    setTasks((prev) => [...prev, newTask]);
    setInput('');
  };

  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTask = (index: number) => {
    setTasks((prev) => prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List (Debug)</h1>
      <div className="flex mb-4">
        <input
          data-testid="task-input"
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          data-testid="add-button"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <div data-testid="empty-state" className="text-gray-500">No tasks yet.</div>
      ) : (
        <ul>
          {tasks.map((task, idx) => (
            <li data-testid={`task-${idx}`} data-id={task.id} key={task.id} className="flex items-center mb-2">
              <input
                data-testid={`task-checkbox-${idx}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(idx)}
              />
              <span data-testid={`task-text-${idx}`} className={task.completed ? 'line-through ml-2' : 'ml-2'}>
                {task.text}
              </span>
              <button
                data-testid={`task-delete-${idx}`}
                className="ml-auto text-red-500"
                onClick={() => deleteTask(idx)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
