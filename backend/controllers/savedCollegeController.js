import SavedCollege from "../models/SavedCollege.js";
import { findCollegeById } from "../data/collegesData.js";

const buildCollegePayload = (savedDoc) => {
  const collegeMeta = findCollegeById(savedDoc.collegeId) || {};
  return {
    id: savedDoc._id,
    collegeId: savedDoc.collegeId,
    savedAt: savedDoc.savedAt || savedDoc.createdAt,
    college: {
      name: savedDoc.collegeName || collegeMeta.name || "Unknown College",
      location: collegeMeta.location || "Location unavailable",
      rating: collegeMeta.rating || null,
      fees: collegeMeta.fees || null,
      type: collegeMeta.type || "",
      est: collegeMeta.est || null,
      cutoff: collegeMeta.cutoff || "",
      courses: collegeMeta.courses || [],
      logo: collegeMeta.logo,
    },
  };
};

export const listSavedColleges = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const savedColleges = await SavedCollege.find({ userId }).sort({ createdAt: -1 });
    const formatted = savedColleges.map(buildCollegePayload);

    res.json({ count: formatted.length, savedColleges: formatted });
  } catch (error) {
    console.error("Get saved colleges error:", error);
    res.status(500).json({ message: "Unable to load saved colleges" });
  }
};

export const removeSavedCollege = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!id) {
      return res.status(400).json({ message: "Saved college id is required" });
    }

    const savedCollege = await SavedCollege.findOne({ _id: id, userId });
    if (!savedCollege) {
      return res.status(404).json({ message: "Saved college not found" });
    }

    await savedCollege.deleteOne();

    res.json({ message: "College removed from saved list" });
  } catch (error) {
    console.error("Delete saved college error:", error);
    res.status(500).json({ message: "Unable to remove saved college" });
  }
};
