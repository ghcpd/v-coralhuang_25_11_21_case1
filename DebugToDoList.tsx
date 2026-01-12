"use client";

import * as React from "react";
import { useState } from "react";

interface Task {
  text: string;
  completed: boolean;
}

export default function DebugToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    // FIX 1: Empty string validation
    if (input.trim() === "") {
      return;
    }
    
    // FIX 2: Proper immutable state update
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    // FIX 3: Proper immutable deletion using filter
    setTasks(tasks.filter((_, idx) => idx !== index));
  };

  const toggleTask = (index: number) => {
    // FIX 4: Proper immutable state update using map
    setTasks(
      tasks.map((task, idx) =>
        idx === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
            <h1 className="text-4xl font-bold text-white text-center mb-2">
              ✨ My To-Do List
            </h1>
            <p className="text-indigo-100 text-center">
              Stay organized and productive
            </p>
          </div>

          {/* Input Section */}
          <div className="p-8">
            <div className="flex gap-3 mb-6">
              <input
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                placeholder="What do you need to do?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={addTask}
              >
                Add
              </button>
            </div>

            {/* Task List */}
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-400 text-lg">
                  No tasks yet. Add one to get started!
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task, idx) => (
                  // FIX 5: Added key prop
                  <li
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 animate-slide-in group"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(idx)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span
                      className={`flex-1 text-lg transition-all duration-200 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {task.text}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      onClick={() => deleteTask(idx)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Stats */}
            {tasks.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Total: <strong className="text-indigo-600">{tasks.length}</strong>
                  </span>
                  <span>
                    Completed:{" "}
                    <strong className="text-green-600">
                      {tasks.filter((t) => t.completed).length}
                    </strong>
                  </span>
                  <span>
                    Remaining:{" "}
                    <strong className="text-orange-600">
                      {tasks.filter((t) => !t.completed).length}
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Built with ❤️ using Next.js, React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
