import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import mongoose from "mongoose";
import Task from "../models/Task.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description, workspaceId,members } = req.body;

    // check if user is part of workspace
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace.members.includes(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      members:members||[],
      createdBy: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECTS BY WORKSPACE
export const getProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const projects = await Project.find({ workspace: workspaceId });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/projectController.js


export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // 🔐 Permission: only creator
    if (project.createdBy.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // 🔥 Cascade delete tasks
    await Task.deleteMany({ project: id });

    await Project.findByIdAndDelete(id);

    res.json({ message: "Project and its tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addMembersToProject = async (req, res) => {
  const { projectId } = req.params;
  const { members } = req.body;

  const project = await Project.findByIdAndUpdate(
    projectId,
    { $addToSet: { members: { $each: members } } },
    { new: true }
  );

  res.json(project);
};
export const getProjectMembers = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("members");
  res.json(project.members);
};