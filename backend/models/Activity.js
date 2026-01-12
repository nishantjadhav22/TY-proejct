import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Activity", activitySchema);
