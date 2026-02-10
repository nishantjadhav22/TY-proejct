import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import apiClient, { storeSession } from "../services/apiClient";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const SignIn = ({ setUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ SAME AS OLD LOGIC
  const validate = () => {
    if (!email)
      return t("signin.emailRequired", "Email is required");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return t("signin.emailInvalid", "Invalid email format");

    if (!password)
      return t("signin.passwordRequired", "Password is required");

    if (password.length < 1)
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
      toast.error(validationError); // 🔥 OLD BEHAVIOR
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post(
        "/api/auth/login",
        { email, password },
        { skipAuthRefresh: true }
      );

      // ✅ OLD SAFETY CHECK
      const { user: userData, accessToken } = res.data || {};
      if (!userData || !accessToken) {
        throw new Error("Invalid authentication response");
      }

      storeSession(accessToken, userData);
      setUser(userData);

      toast.success("Login successful !");
      navigate("/");
    } catch (err) {
      // ✅ OLD ERROR LOGIC
      const msg =
        err.response?.data?.message ||
        t("signin.loginFailed", "Login failed. Try again.");

      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-hero">

        <div className="shape shape-left" />
        <div className="shape shape-right" />

        <div className="signin-container">

          <div className="cp-circle">CP</div>

          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">
            Sign in to continue your career journey
          </p>

          <div className="signin-card">
            <form onSubmit={handleSubmit}>

              <div className="input-box">
                <FiMail />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="input-box">
                <FiLock />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <div
                className="forgot"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your password?
              </div>

              <button className="signin-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In →"}
              </button>

            </form>
          </div>

          <p className="signup-text">
            Don’t have an account?
            <span onClick={() => navigate("/register")}>
              Sign Up Now
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
