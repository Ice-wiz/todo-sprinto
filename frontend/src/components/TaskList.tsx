import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, addTask, loading } = useTasks();
  const [text, setText] = useState("");

  const handleAdd = async () => {
    if (text.trim()) {
      await addTask(text);
      setText("");
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task"
          className="border p-2 flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">Add</button>
      </div>

      <div className="space-y-2">
        {tasks.map(task => <TaskItem key={task._id} task={task} />)}
      </div>
    </div>
  );
}
