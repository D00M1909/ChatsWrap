import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password === "123") {
      navigate("/admin/dashboard");
    } else {
      alert("Incorrect admin password.");
    }
  }

  return (
    <div className="form-container">
      <h2 className="brand-title">Admin Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Enter Admin Panel</button>
      </form>
    </div>
  );
}

export default AdminLogin;
