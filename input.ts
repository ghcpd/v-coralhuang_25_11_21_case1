import * as React from "react";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    // Bug 1: No empty string check
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (index) => {
    // Bug 2: Splice mutates the original array, and index may be wrong
    tasks.splice(index, 1);
    setTasks(tasks);
  };

  const toggleTask = (index) => {
    // Bug 3: Directly mutating state
    tasks[index].completed = !tasks[index].completed;
    setTasks(tasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blu-500 text-white px-4 py-2 ml-2" onClick={addTask}>
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, idx) => (
          // Bug 4: Missing key prop
          <li className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(idx)}
            />
            <span className={task.completed ? "line-through ml-2" : "ml-2"}>
              {task.text}
            </span>
            <button
              className="ml-auto text-red-500"
              onClick={() => deleteTask(idx)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;