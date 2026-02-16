import { useEffect, useState } from "react";
import {
  User,
  Shield,
  Bell,
  Palette,
  Camera,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "../services/apiClient";
import { useUser } from "../context/UserContext";
import "../styles/profileSettings.css";

const tabs = [
  { id: "profile", label: "Profile Info", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Preferences", icon: Palette },
];

const defaultProfile = {
  firstName: "",
  lastName: "",
  email: "",
  profilePhoto: "",
};

const ProfileSettings = () => {
  const { setUser } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get("/api/profile");
        if (data?.profile) {
          setProfileForm({
            firstName: data.profile.firstName || "",
            lastName: data.profile.lastName || "",
            email: data.profile.email || "",
            profilePhoto: data.profile.profilePhoto || "",
          });
        }
      } catch (error) {
        console.error("Profile fetch failed", error);
        toast.error("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedUrl = await uploadProfilePhoto(file);
      setProfileForm((prev) => ({ ...prev, profilePhoto: uploadedUrl }));
      toast.success("Photo uploaded");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profileForm.firstName || !profileForm.lastName || !profileForm.email) {
      toast.error("All fields are required");
      return;
    }

    try {
      setSaving(true);
      const { data } = await apiClient.put("/api/profile", profileForm);
      if (data?.profile) {
        setUser(data.profile);
        toast.success("Profile updated");
      }
    } catch (error) {
      console.error("Profile update failed", error);
      const message = error.response?.data?.message || "Unable to save profile";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page loading-state">
        <Loader2 className="spin" size={28} />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div>
          <p className="eyebrow">Profile</p>
          <h1>Manage your account</h1>
          <p>Update personal information, manage preferences, and keep everything in sync.</p>
        </div>
        <div className="profile-avatar">
          {profileForm.profilePhoto ? (
            <img src={profileForm.profilePhoto} alt="Profile avatar" />
          ) : (
            <div className="avatar-fallback">
              {profileForm.firstName?.[0]}
              {profileForm.lastName?.[0]}
            </div>
          )}
          <label className="avatar-upload">
            <Camera size={16} />
            <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
            <span>{uploading ? "Uploading..." : "Upload"}</span>
          </label>
        </div>
      </header>

      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <section className="profile-card">
          <div className="form-grid">
            <label>
              <span>First Name</span>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => handleProfileChange("firstName", e.target.value)}
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => handleProfileChange("lastName", e.target.value)}
              />
            </label>
          </div>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
            />
          </label>
          <div className="actions">
            <button onClick={handleSaveProfile} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>
      )}

      {activeTab !== "profile" && (
        <section className="profile-card muted">
          <p>Coming soon. We are still wiring this section.</p>
        </section>
      )}
    </div>
  );
};

const uploadProfilePhoto = async (file) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing. Set REACT_APP_CLOUDINARY_* env vars.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json();
  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Upload failed");
  }

  return payload.secure_url;
};

export default ProfileSettings;
