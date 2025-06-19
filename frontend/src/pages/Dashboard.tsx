import TaskList from "../components/TaskList";
import { useTasks } from "../context/TaskContext";

export default function Dashboard() {
  const { stats } = useTasks();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Tasks</h1>
      <p className="text-sm text-gray-600">
        Completed: {stats.completed} / {stats.total}
      </p>
      <TaskList />
    </div>
  );
}
