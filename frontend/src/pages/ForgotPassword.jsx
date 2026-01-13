import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import "../styles/forgot.css";
import apiClient from "../services/apiClient";

import bgImage from "../assets/signin-bg.png";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post(
        "/api/auth/forgot-password",
        { email },
        { skipAuthRefresh: true }
      );
      toast.success(res.data.message || "Reset link sent to your email");
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
          linear-gradient(
            rgba(11, 15, 26, 0.55),
            rgba(11, 15, 26, 0.55)
          ),
          url(${bgImage})
        `,
      }}
    >
      <div className="forgot-card">
        <h2>{t("forgot.title", "Forgot Password")}</h2>
        <p className="forgot-sub">
          {t(
            "forgot.subtitle",
            "Enter your registered email to receive reset link"
          )}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t("forgot.email", "Email address")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? t("forgot.sending", "Sending...")
              : t("forgot.send", "Send Reset Link")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
