import { useState } from "react";
import { type Task, useTasks } from "../context/TaskContext";

export default function TaskItem({ task }: { task: Task }) {
  const { toggleTask, deleteTask, addTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      addTask(editText.trim());
      deleteTask(task._id);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center gap-3 border border-gray-200 p-3 rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id, !task.completed)}
          className="w-5 h-5 accent-blue-500"
        />

        {isEditing ? (
          <input
            className="border rounded px-3 py-1 w-full text-sm outline-blue-500 text-black"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit task..."
          />
        ) : (
          <span
            className={`flex-1 text-sm cursor-pointer transition ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
            onClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2 text-black">
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => deleteTask(task._id)}
          className="text-red-500 hover:text-red-700 text-lg px-2 transition"
          title="Delete"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
