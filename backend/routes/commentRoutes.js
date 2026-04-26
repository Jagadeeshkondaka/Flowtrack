import express from "express";
import { addComment, getComments } from "../controller/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addComment);
router.get("/:taskId", protect, getComments);

export default router;