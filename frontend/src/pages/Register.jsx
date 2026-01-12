import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useTranslation } from "react-i18next";

/* 🔥 TOAST (ADDED) */
import toast from "react-hot-toast";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(
        t("register.passwordMismatch", "Passwords do not match")
      ); // 🔥 ADDED
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { name, email, password }
      );

      if (res.status === 201) {
        toast.success(
          t(
            "register.accountCreated",
            "Account created successfully 🚀"
          )
        ); // 🔥 ADDED

        navigate("/signin");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          t("register.accountError", "Error creating account")
      ); // 🔥 ADDED
    }
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <div className="register-logo">CP</div>
        <h2>{t("register.createAccount", "Create Your Account")}</h2>
        <p>{t("register.signUpToContinue", "Start your career journey")}</p>
      </div>

      <div className="register-card">
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className={`input-group ${name ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <span className="input-icon"><FiUser /></span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>{t("register.fullName", "Full Name")}</label>
            </div>
          </div>

          {/* EMAIL */}
          <div className={`input-group ${email ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <span className="input-icon"><FiMail /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>{t("register.emailLabel", "Email Address")}</label>
            </div>
          </div>

          {/* PASSWORD */}
          <div className={`input-group ${password ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <span className="input-icon"><FiLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>{t("register.passwordLabel", "Password")}</label>
              <span
                className="input-icon clickable"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={`input-group ${confirmPassword ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <span className="input-icon"><FiLock /></span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>
                {t(
                  "register.confirmPasswordLabel",
                  "Confirm Password"
                )}
              </label>
              <span
                className="input-icon clickable"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <button className="register-btn" type="submit">
            {t("register.createAccountBtn", "Create Account →")}
          </button>
        </form>
      </div>

      <p className="signin-text">
        {t("register.alreadyAccount", "Already have an account?")}{" "}
        <span onClick={() => navigate("/signin")}>
          {t("register.signInNow", "Sign In")}
        </span>
      </p>
    </div>
  );
};

export default Register;
