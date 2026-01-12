import mongoose from "mongoose";

const weeklyProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: [
    {
      day: String,
      value: Number,
    },
  ],
});

export default mongoose.model("WeeklyProgress", weeklyProgressSchema);
