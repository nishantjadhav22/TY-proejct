import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import "../styles/reset.css";
import apiClient from "../services/apiClient";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const getStrength = () => {
  if (!password) return "";

  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length >= 8 && hasUpper && hasNumber && hasSpecial) {
    return "strong";
  }

  if (password.length >= 6 && (hasUpper || hasNumber)) {
    return "medium";
  }

  return "weak";
};


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post(
        `/api/auth/reset-password/${token}`,
        { password },
        { skipAuthRefresh: true }
      );

      setMsg(res.data.message || "Password reset successful");

      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-box" onSubmit={submitHandler}>
        <h2>Reset Password</h2>

        <p className="reset-sub">
          Create a strong new password for your account
        </p>

        <div className="input-group">
          <input
            type={show ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShow(!show)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <div className={`strength ${getStrength()}`}>
          Password strength: {getStrength()}
        </div>

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? <span className="btn-spinner" /> : "Reset Password"}
        </button>

        {msg && <p className="msg">{msg}</p>}

        <Link to="/signin" className="back-link">
          <ArrowLeft size={16} /> Back to Sign in
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
