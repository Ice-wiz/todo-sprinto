import express, { Request, Response } from "express";
import Task from "../models/Task";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = express.Router();

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

router.post("/", async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    console.log(req.body,"bodyy")
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Task text is required" });

    const newTask = await Task.create({ text, user: req.userId });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

router.put("/:id", async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    console.log("hei")
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
