import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  verifyRefreshToken,
  REFRESH_COOKIE_KEY,
} from "../utils/tokenUtils.js";

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  firstName: user.firstName || user.name?.split(" ")[0] || "",
  lastName: user.lastName || user.name?.split(" ").slice(1).join(" ") || "",
  email: user.email,
  profilePhoto: user.profilePhoto || user.avatar || "",
});

const issueSessionTokens = async (user, res) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = hashToken(refreshToken);
  await user.save();

  setRefreshTokenCookie(res, refreshToken);
  return accessToken;
};

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const trimmedName = name.trim();
    const [firstName, ...rest] = trimmedName.split(" ");
    const lastName = rest.join(" ");

    const user = await User.create({
      name: trimmedName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const accessToken = await issueSessionTokens(user, res);

    res.status(201).json({
      message: "User registered successfully",
      user: buildUserResponse(user),
      accessToken,
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = await issueSessionTokens(user, res);

    res.json({
      message: "Login successful",
      user: buildUserResponse(user),
      accessToken,
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User email for reset link:", user.email);

    const resetToken = crypto.randomBytes(32).toString("hex");

    // ✅ Use DB field names
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("Reset URL:", resetUrl);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   const info = await transporter.sendMail({
  from: `"CareerPilot Support" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: "Reset Your Password – CareerPilot",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h3>Password Reset Request</h3>

      <p>Dear User,</p>

      <p>
        We received a request to reset the password for your
        <strong>CareerPilot</strong> account.
      </p>

      <p>
        To proceed, please click the link below to create a new password.
        This link is valid for a limited time for security reasons.
      </p>

      <p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 10px 16px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 4px;">
          Reset Your Password
        </a>
      </p>

      <p>
        This link will expire in <strong>15 minutes</strong>.
      </p>

      <p>
        If you did not request a password reset, please ignore this email.
        Your account will remain secure, and no changes will be made.
      </p>

      <p>
        For any assistance, feel free to contact our support team.
      </p>

      <p>
        Best regards,<br />
        <strong>CareerPilot Support Team</strong><br />
        CareerPilot
      </p>
    </div>
  `,
});

    console.log("ENVELOPE TO:", info.envelope.to);

    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.log("Forgot Password Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // ✅ Match DB field names
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    // ✅ clear token after use
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log("Reset Password Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user: buildUserResponse(req.user) });
  } catch (error) {
    console.log("Profile fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.[REFRESH_COOKIE_KEY];
    if (!refreshToken) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const hashedIncomingToken = hashToken(refreshToken);
    if (!user.refreshToken || user.refreshToken !== hashedIncomingToken) {
      return res.status(401).json({ message: "Refresh token mismatch" });
    }

    const newRefreshToken = generateRefreshToken(user._id);
    user.refreshToken = hashToken(newRefreshToken);
    await user.save();

    setRefreshTokenCookie(res, newRefreshToken);

    const accessToken = generateAccessToken(user._id);

    res.json({
      accessToken,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.log("Refresh Token Error:", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.[REFRESH_COOKIE_KEY];
    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.id);

        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      } catch (innerError) {
        // Ignore errors from invalid or expired tokens during logout
        console.log("Logout token cleanup skipped:", innerError.message);
      }
    }
  } catch (error) {
    console.log("Logout Error:", error);
  } finally {
    clearRefreshTokenCookie(res);
    res.json({ message: "Logged out successfully" });
  }
};
