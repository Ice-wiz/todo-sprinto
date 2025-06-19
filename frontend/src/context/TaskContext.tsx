

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getTasks, createTask, updateTask, deleteTaskById } from "../apis/taskApi";
import { useAuth } from "./AuthContext";

export interface Task {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (text: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  stats: { completed: number; total: number };
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const result = await getTasks(token);
    if (result) setTasks(result);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (text: string) => {
    const newTask = await createTask(text, token!);
    if (newTask) setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = async (id: string) => {
    await deleteTaskById(id, token!);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const toggleTask = async (id: string, completed: boolean) => {
    const updated = await updateTask(id, { completed }, token!);
    if (updated) {
      setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
    }
  };

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
  }), [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, deleteTask, toggleTask, stats }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
