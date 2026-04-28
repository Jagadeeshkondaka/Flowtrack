import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  members: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);