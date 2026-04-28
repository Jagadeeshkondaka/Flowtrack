import express from "express";
import { createWorkspace, getWorkspaces } from "../controller/workspaceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteWorkspace } from "../controller/workspaceController.js";

const router = express.Router();

router.post("/", protect, createWorkspace);
router.get("/", protect, getWorkspaces);
router.delete("/:id",protect, deleteWorkspace);

export default router;