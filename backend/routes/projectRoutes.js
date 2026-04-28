import express from "express";
import { createProject, getProjects } from "../controller/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteProject } from "../controller/projectController.js";
import { addMembersToProject } from "../controller/projectController.js";
import { getProjectMembers } from "../controller/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/:workspaceId", protect, getProjects);
router.delete("/:id",protect, deleteProject);
router.patch("/:projectId/members", protect, addMembersToProject);
router.get("/:id/members", protect, getProjectMembers);
export default router;