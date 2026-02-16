import User from "../models/User.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  profilePhoto: user.profilePhoto || user.avatar || "",
});

export const getCurrentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ profile: sanitizeUser(user) });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Unable to load profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstName, lastName, email, profilePhoto } = req.body || {};

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "First name, last name and email are required" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail !== user.email) {
      const existingEmail = await User.findOne({ email: trimmedEmail });
      if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = trimmedEmail;
    }

    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.name = `${user.firstName} ${user.lastName}`.trim();
    if (profilePhoto !== undefined) {
      user.profilePhoto = profilePhoto;
      user.avatar = profilePhoto;
    }

    await user.save();

    res.json({ profile: sanitizeUser(user), message: "Profile updated" });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Unable to update profile" });
  }
};
