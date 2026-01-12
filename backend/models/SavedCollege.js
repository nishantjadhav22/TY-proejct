import mongoose from "mongoose";

const savedCollegeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  collegeId: {
    type: Number,
    required: true
  },
  collegeName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SavedCollege = mongoose.model("SavedCollege", savedCollegeSchema);

export default SavedCollege;
