import Workspace from "../models/Workspace.js";

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