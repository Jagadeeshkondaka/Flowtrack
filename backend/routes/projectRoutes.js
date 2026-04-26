import express from "express";
import { createProject, getProjects } from "../controller/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/:workspaceId", protect, getProjects);

export default router;