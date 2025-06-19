import axios from "axios";
import type { Task } from "../context/TaskContext";

const API = "http://localhost:5000/api/tasks";

export const getTasks = async (token: string): Promise<Task[]> => {
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createTask = async (text: string, token: string): Promise<Task | null> => {
  try {
    const res = await axios.post(API, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>, token: string): Promise<Task | null> => {
  const res = await axios.put(`${API}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteTaskById = async (id: string, token: string) => {
  await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
