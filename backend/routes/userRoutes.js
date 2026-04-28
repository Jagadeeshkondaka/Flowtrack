import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔥 GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;