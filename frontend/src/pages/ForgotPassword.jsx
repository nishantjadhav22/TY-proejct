import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import "../styles/forgot.css";
import apiClient from "../services/apiClient";
import bgImage from "../assets/signin-bg.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post(
        "/api/auth/forgot-password",
        { email },
        { skipAuthRefresh: true }
      );

      toast.success(res.data.message || "Reset link sent!");
      setSent(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="forgot-page"
      style={{
        backgroundImage: `
          linear-gradient(rgba(11,15,26,0.65), rgba(11,15,26,0.65)),
          url(${bgImage})
        `,
      }}
    >
      <div className="forgot-card">
        {!sent ? (
          <>
            <h2>Forgot Password</h2>
            <p className="forgot-sub">
              Enter your registered email to receive a password reset link
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

<button
  type="submit"
  disabled={loading}
  className="reset-btn"
>
  {loading ? (
    <span className="btn-spinner-gradient" />
  ) : (
    "Send Reset Link"
  )}
</button>



            </form>

            <Link to="/signin" className="back-link">
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </>
        ) : (
          <div className="success-box">
            <h3>Check your email 📧</h3>
            <p>
              If an account exists with <b>{email}</b>, you’ll receive a reset
              link shortly.
            </p>

            <Link to="/signin" className="back-link">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
