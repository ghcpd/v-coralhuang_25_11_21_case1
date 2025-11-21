import * as React from "react";
import { useState } from "react";

type Task = { id: number; text: string; completed: boolean };

export default function DebugToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    // Don't add empty values (trim spaces)
    const text = input.trim();
    if (!text) return;
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks((t) => [...t, newTask]);
    setInput("");
  };

  const deleteTask = (id: number) => {
    // Create a new array instead of mutating the original
    setTasks((t) => t.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    // Produce a new array and not mutate state in-place
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List (Debug)</h1>
      <div className="flex mb-4">
        <input
          className="border p-2 flex-1"
          value={input}
          aria-label="task-input"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2" onClick={addTask} aria-label="add-button">
          Add
        </button>
      </div>
      <ul aria-label="task-list">
        {tasks.map((task) => (
          <li className="flex items-center mb-2" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              aria-label={`toggle-${task.id}`}
            />
            <span className={task.completed ? "line-through ml-2" : "ml-2"}>{task.text}</span>
            <button className="ml-auto text-red-500" onClick={() => deleteTask(task.id)} aria-label={`delete-${task.id}`}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
