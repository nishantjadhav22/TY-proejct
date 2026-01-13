import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/reset.css";
import apiClient from "../services/apiClient";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(
        `/api/auth/reset-password/${token}`,
        { password },
        { skipAuthRefresh: true }
      );
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-box" onSubmit={submitHandler}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>

        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
