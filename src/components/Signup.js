import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("green");

  const colors = ["green", "red", "blue", "pink", "yellow"];

  function handleSignup(e) {
    e.preventDefault();
    if (username && password) {
      const users = JSON.parse(localStorage.getItem("chatswrap-accounts") || "{}");
      if (users[username]) {
        alert("Username already exists");
      } else {
        users[username] = { password, color };
        localStorage.setItem("chatswrap-accounts", JSON.stringify(users));
        alert("Signup successful!");
        navigate("/login");
      }
    } else {
      alert("Please fill all fields");
    }
  }

  return (
    <div className="form-container">
      <h2 className="brand-title">ChatsWrap</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="color-section">
          <label>Choose message color:</label>
          <div className="color-row">
            {colors.map(c => (
              <div
                key={c}
                className={`color-box ${c} ${color === c ? 'selected' : ''}`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate("/login")} className="link">
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

export default Signup;
