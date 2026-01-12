import mongoose from "mongoose";
import SavedCollege from "../models/SavedCollege.js";
import User from "../models/User.js";
import Activity from "../models/Activity.js";

// 🔖 Save / Unsave College (fully patched)
export const toggleSaveCollege = async (req, res) => {
  try {
    const { userId, collegeId, collegeName } = req.body;

    if (!userId || !collegeId || !collegeName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await SavedCollege.findOne({ userId, collegeId });

    if (existing) {
      await SavedCollege.deleteOne({ _id: existing._id });

      await User.findByIdAndUpdate(userId, {
        $pull: { colleges: collegeId }
      });

      // 🔥 Log activity for unbookmark
      try {
        await Activity.create({
          user: mongoose.Types.ObjectId(userId),
          type: "UNBOOKMARK",
          message: `You removed ${collegeName} from saved colleges`,
          icon: "bookmark"
        });
      } catch (e) {
        console.error("Activity log error:", e);
      }

      return res.json({ saved: false });
    }

    const savedCollege = await SavedCollege.create({
      userId,
      collegeId,
      collegeName
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { colleges: collegeId }
    });

    // 🔥 Log activity for bookmark
    try {
      await Activity.create({
        user: mongoose.Types.ObjectId(userId),
        type: "BOOKMARK",
        message: `You bookmarked ${collegeName}`,
        icon: "bookmark"
      });
    } catch (e) {
      console.error("Activity log error:", e);
    }

    res.json({ saved: true, savedCollege });
  } catch (err) {
    console.error("Save/Unsave college error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔖 Get saved colleges for current user only
export const getSavedColleges = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const savedColleges = await SavedCollege.find({ userId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const count = savedColleges.length;

    res.json({ count, savedColleges });
  } catch (err) {
    console.error("Get saved colleges error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔖 Get saved colleges count for a specific user
export const getSavedCollegesCount = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const count = await SavedCollege.countDocuments({ userId });
    const savedColleges = await SavedCollege.find({ userId }).populate(
      "userId",
      "name"
    );

    res.json({ count, savedColleges });
  } catch (err) {
    console.error("Count error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
