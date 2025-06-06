import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("chatswrap-accounts") || "{}");
    if (users[username] && users[username].password === password) {
      localStorage.setItem("chatswrap-user", username);
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="form-container large">
      <h2 className="brand-title">ChatsWrap</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate("/")} className="link">
          Don't have an account? Sign up
        </p>
        <p onClick={() => navigate("/admin")} className="admin-link">
          Want to manage users or chats? <strong>Login as Admin</strong>
        </p>
      </form>
    </div>
  );
}

export default Login;
