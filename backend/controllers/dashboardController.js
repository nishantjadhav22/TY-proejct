import WeeklyProgress from "../models/WeeklyProgress.js";
import Activity from "../models/Activity.js";

export const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized. User not found." });
    }

    const weeklyProgressDoc = await WeeklyProgress.findOne({
      user: user._id,
    });

    const recentActivity = await Activity.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      username: user.name,

      quizzes: user.quizzes?.length || 0,

      // ✅ FIXED: BOOKMARK COUNT
      colleges: user.savedCollegesCount || 0,

      skills: user.skills?.length || 0,
      achievements: user.achievements?.length || 0,

      weeklyProgress: weeklyProgressDoc?.data || [],
      recentActivity,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
