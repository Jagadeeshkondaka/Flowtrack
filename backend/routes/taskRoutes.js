import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus
} from "../controller/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.patch("/:id/status", protect, updateTaskStatus);

export default router;