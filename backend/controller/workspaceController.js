import Workspace from "../models/Workspace.js";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

// CREATE WORKSPACE
export const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    const workspace = await Workspace.create({
      name,
      owner: req.user._id,
      members: [req.user._id]
    });

    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER WORKSPACES
export const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      members: req.user._id
    });

    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/workspaceController.js


export const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid workspace ID" });
    }

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    // 🔐 Only owner can delete workspace
    if (workspace.owner.toString() !== userId) {
      return res.status(403).json({ error: "Only owner can delete workspace" });
    }

    // 🔥 Get all projects inside workspace
    const projects = await Project.find({ workspace: id });

    const projectIds = projects.map((p) => p._id);

    // 🔥 Delete all tasks under those projects
    await Task.deleteMany({
      project: { $in: projectIds },
    });

    // 🔥 Delete all projects
    await Project.deleteMany({ workspace: id });

    // 🔥 Delete workspace
    await Workspace.findByIdAndDelete(id);

    res.json({
      message: "Workspace, all projects, and all tasks deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};