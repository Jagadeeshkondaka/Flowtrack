import Comment from "../models/Comment.js";

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text, taskId } = req.body;

    const comment = await Comment.create({
      text,
      task: taskId,
      user: req.user._id
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS FOR TASK
export const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await Comment.find({ task: taskId })
      .populate("user", "name email");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};