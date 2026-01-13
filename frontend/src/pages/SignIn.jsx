import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import apiClient, { storeSession } from "../services/apiClient";
import { useTranslation } from "react-i18next";

/* 🔥 TOAST (ADDED) */
import toast from "react-hot-toast";

// ✅ FIX-1: Background image imported via React
import bgImage from "../assets/signin-bg.png";

const SignIn = ({ setUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email) return t("signin.emailRequired", "Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return t("signin.emailInvalid", "Invalid email format");
    if (!password)
      return t("signin.passwordRequired", "Password is required");
    if (password.length < 2)
      return t(
        "signin.passwordShort",
        "Password must be at least 6 characters"
      );
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      toast.error(validationError); // 🔥 ADDED
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post(
        "/api/auth/login",
        { email, password },
        { skipAuthRefresh: true }
      );

      const { user: userData, accessToken } = res.data || {};

      if (!userData || !accessToken) {
        throw new Error("Invalid authentication response");
      }

      storeSession(accessToken, userData);
      setUser(userData);

      toast.success("Login successful !"); // 🔥 ADDED
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        t("signin.loginFailed", "Login failed. Try again.");

      setError(msg);
      toast.error(msg); // 🔥 ADDED
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signin-page"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(11, 15, 26, 0.55),
            rgba(11, 15, 26, 0.55)
          ),
          url(${bgImage})
        `,
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="signin-header">
        <div className="signin-logo">CP</div>
        <h2>{t("signin.welcomeBack", "Welcome Back")}</h2>
        <p>
          {t(
            "signin.signInToContinue",
            "Sign in to continue your career journey"
          )}
        </p>
      </div>

      {/* ===== CARD ===== */}
      <div className="signin-card">
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className={`input-group ${email ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <label>{t("signin.emailLabel", "Email Address")}</label>
              <span className="input-icon">
                <FiMail />
              </span>
            </div>
          </div>

          {/* PASSWORD */}
          <div className={`input-group ${password ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <label>{t("signin.passwordLabel", "Password")}</label>

              {/* LEFT LOCK ICON */}
              <span className="input-icon">
                <FiLock />
              </span>

              {/* RIGHT EYE ICON */}
              <span
                className="input-icon clickable"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <span className="forgot"  onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}>
            {t("signin.forgotPassword", "Forgot your password?")}
          </span>

          <button
            className="signin-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? t("signin.signingIn", "Signing In...")
              : t("signin.signInButton", "Sign In →")}
          </button>
        </form>
      </div>

      {/* ===== SIGN UP ===== */}
      <p className="signup-text">
        {t("signin.noAccount", "Don’t have an account?")}{" "}
        <span onClick={() => navigate("/register")}>
          {t("signin.signUpNow", "Sign Up Now")}
        </span>
      </p>
    </div>
  );
};

export default SignIn;
