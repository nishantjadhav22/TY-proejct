import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ================= PROFILE =================
    avatar: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    goal: {
      type: String,
      default: "",
    },

    // ================= DASHBOARD STATS =================
    quizzes: [
      {
        quizName: String,
        score: Number,
        totalQuestions: {
          type: Number,
          default: 0,
        },
        date: { type: Date, default: Date.now },
      },
    ],

    colleges: [
      {
        name: String,
        savedAt: { type: Date, default: Date.now },
      },
    ],

    skills: [
      {
        name: String,
        level: String,
      },
    ],

    achievements: [
      {
        title: String,
        date: { type: Date, default: Date.now },
      },
    ],

    role: {
      type: String,
      default: "user",
    },

    /* ===============================
       🔖 ADDED FOR BOOKMARK SYSTEM
    ================================ */

    savedColleges: [
      {
        collegeId: {
          type: Number,
        },
        collegeName: {
          type: String,
        },
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    savedCollegesCount: {
      type: Number,
      default: 0,
    },

    /* ===============================
       🔐 ADDED FOR FORGOT PASSWORD
    ================================ */

    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
