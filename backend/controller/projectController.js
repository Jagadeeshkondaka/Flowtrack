import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description, workspaceId } = req.body;

    // check if user is part of workspace
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace.members.includes(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
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