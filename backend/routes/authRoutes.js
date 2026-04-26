import express from "express";
import { login,register } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;