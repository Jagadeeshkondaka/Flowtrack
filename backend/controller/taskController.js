import mongoose from "mongoose";
import Task from "../models/Task.js";
// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body; // ✅ FIX

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo: assignedTo || null, // ✅ safe
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error); // 🔥 add this for debugging
    res.status(500).json({ message: error.message });
  }
};
// GET TASKS BY PROJECT
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK STATUS (🔥 KEY FEATURE)
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/taskController.js


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // assuming auth middleware

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // 🔐 Permission: only creator or assigned user
    if (
      task.createdBy.toString() !== userId &&
      task.assignedTo?.toString() !== userId
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};