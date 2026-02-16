import mongoose from "mongoose";

const savedCollegeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    collegeId: {
      type: Number,
      required: true,
    },
    collegeName: {
      type: String,
      default: "",
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SavedCollege = mongoose.model("SavedCollege", savedCollegeSchema);

export default SavedCollege;
