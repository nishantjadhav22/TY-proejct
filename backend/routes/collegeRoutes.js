import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import SavedCollege from "../models/SavedCollege.js";
import COLLEGE_DATA, { findCollegeById } from "../data/collegesData.js";

const router = express.Router();

/* ===============================
   ✅ GET all colleges
=============================== */
router.get("/", (req, res) => {
  res.status(200).json(COLLEGE_DATA);
});

/* ===============================
   ✅ GET single college by id (UNCHANGED)
================================ */
router.get("/:id", (req, res) => {
  const college = findCollegeById(req.params.id);
  if (!college) return res.status(404).json({ message: "College not found" });
  res.json(college);
});

/* ===============================
   🔖 SAVE / UNSAVE COLLEGE (UPDATED)
================================ */
router.post("/bookmark", protect, async (req, res) => {
  try {
    const { collegeId } = req.body;
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const numericCollegeId = Number(collegeId);
    if (!collegeId || Number.isNaN(numericCollegeId)) {
      return res.status(400).json({ message: "College id is required" });
    }

    const college = findCollegeById(numericCollegeId);
    if (!college) return res.status(404).json({ message: "College not found" });

    const existing = await SavedCollege.findOne({ userId, collegeId: numericCollegeId });

    if (existing) {
      await SavedCollege.deleteOne({ _id: existing._id });
      return res.json({ saved: false });
    }

    await SavedCollege.create({
      userId,
      collegeId: numericCollegeId,
      collegeName: college.name
    });

    res.json({ saved: true });
  } catch (err) {
    console.error("Error in bookmark route:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ===============================
   📊 DASHBOARD COUNT (UPDATED)
================================ */
router.get("/bookmark/count", protect, async (req, res) => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const savedColleges = await SavedCollege.find({ userId });
    const count = savedColleges.length;

    res.json({ count, savedColleges: savedColleges.map(c => c.collegeId) });
  } catch (err) {
    console.error("Error in count route:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ===============================
   🔖 GET saved colleges for current user
   - Protected route
   - Uses `req.user.id` provided by `protect` middleware
================================= */
router.get("/bookmark", protect, async (req, res) => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const savedColleges = await SavedCollege.find({ userId }).sort({ createdAt: -1 });

    // Return full saved college documents so frontend can render properly
    res.json({ savedColleges });
  } catch (err) {
    console.error("Error fetching saved colleges:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
