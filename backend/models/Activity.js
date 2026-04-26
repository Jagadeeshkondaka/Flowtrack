import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  action: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  details: String
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);