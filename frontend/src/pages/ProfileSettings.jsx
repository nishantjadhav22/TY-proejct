import { useState, useEffect } from "react";
import {
  User,
  Shield,
  Bell,
  Palette,
  Save,
  Camera,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import '../styles/profileSettings.css';


export default function ProfileSettings({ userProfile, onUpdate }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    first_name: userProfile?.first_name || "",
    last_name: userProfile?.last_name || "",
    email: userProfile?.email || "",
    avatar_url: userProfile?.avatar_url || "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifications, setNotifications] = useState({
    email_notifications: true,
    push_notifications: true,
    marketing_emails: false,
    security_alerts: true,
  });

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    timezone: "UTC",
    currency: "USD",
  });

  const sections = [
    { id: "profile", label: "Profile Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Palette },
  ];

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleProfileUpdate = () => {
    if (!profileData.first_name || !profileData.last_name) {
      showMessage("First & last name are required", "error");
      return;
    }
    setLoading(true);
    // simulate API
    setTimeout(() => {
      showMessage("Profile updated successfully!");
      setLoading(false);
      if (onUpdate) onUpdate(profileData);
    }, 800);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage("All password fields are required", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }
    if (newPassword.length < 8) {
      showMessage("Password must be at least 8 characters", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      showMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
    }, 800);
  };

  const handleNotificationsUpdate = () => {
    showMessage("Notification preferences updated!");
  };

  const handlePreferencesUpdate = () => {
    showMessage("Preferences updated!");
  };

  return (
    <div className="profile-settings">
      {/* Message */}
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* Section Tabs */}
      <div className="section-tabs">
        {sections.map((sec) => (
          <button
            key={sec.id}
            className={activeSection === sec.id ? "active" : ""}
            onClick={() => setActiveSection(sec.id)}
          >
            <sec.icon size={16} />
            {sec.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="section-content">
        {/* Profile */}
        {activeSection === "profile" && (
          <>
            <div className="avatar-section">
              <div className="avatar">
                {profileData.first_name?.[0]}
                {profileData.last_name?.[0]}
                <button className="avatar-btn">
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <p>Upload a new avatar or change current one</p>
              </div>
            </div>

            <div className="form-grid">
              <div>
                <label>First Name *</label>
                <input
                  type="text"
                  value={profileData.first_name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, first_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Last Name *</label>
                <input
                  type="text"
                  value={profileData.last_name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label>Email</label>
              <input type="email" value={profileData.email} readOnly />
            </div>

            <div className="form-actions">
              <button onClick={handleProfileUpdate} disabled={loading}>
                <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}

        {/* Security */}
        {activeSection === "security" && (
          <>
            <div className="form-grid">
              <div>
                <label>Current Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              <button onClick={handlePasswordChange} disabled={loading}>
                <Lock size={16} /> Update Password
              </button>
            </div>
          </>
        )}

        {/* Notifications */}
        {activeSection === "notifications" && (
          <>
            {Object.keys(notifications).map((key) => (
              <div key={key} className="notification-item">
                <div>{key.replace("_", " ")}</div>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, [key]: !notifications[key] })
                  }
                  className={`toggle-btn ${
                    notifications[key] ? "on" : "off"
                  }`}
                >
                  <div className="toggle-circle" />
                </button>
              </div>
            ))}
            <div className="form-actions">
              <button onClick={handleNotificationsUpdate}>
                <Save size={16} /> Save Preferences
              </button>
            </div>
          </>
        )}

        {/* Preferences */}
        {activeSection === "preferences" && (
          <>
            <div className="form-grid">
              <div>
                <label>Theme</label>
                <select
                  value={preferences.theme}
                  onChange={(e) =>
                    setPreferences({ ...preferences, theme: e.target.value })
                  }
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label>Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
              <div>
                <label>Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) =>
                    setPreferences({ ...preferences, timezone: e.target.value })
                  }
                >
                  <option value="UTC">UTC</option>
                  <option value="Asia/Kolkata">India Standard Time</option>
                </select>
              </div>
              <div>
                <label>Currency</label>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    setPreferences({ ...preferences, currency: e.target.value })
                  }
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button onClick={handlePreferencesUpdate}>
                <Save size={16} /> Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
