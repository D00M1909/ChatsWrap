import React, { useState, useEffect } from "react";

function Admin() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chatswrap-accounts") || "{}");
    setUsers(data);
  }, []);

  function deleteUser(username) {
    const updated = { ...users };
    delete updated[username];
    setUsers(updated);
    localStorage.setItem("chatswrap-accounts", JSON.stringify(updated));
  }

  function clearMessages() {
    localStorage.setItem("chatswrap-messages", JSON.stringify([]));
    alert("All chat messages have been cleared.");
  }

  return (
    <div className="form-container">
      <h2 className="brand-title">Admin Panel - ChatsWrap</h2>
      <button onClick={clearMessages}>Clear All Chat Messages</button>

      <button
        onClick={() => (window.location.href = '/chat')}
        className="go-chat-btn"
        style={{ marginTop: '20px', display: 'block' }}
      >
        Go to Chatroom
      </button>

      <h3>Registered Users</h3>
      <ul className="admin-user-list">
        {Object.entries(users).map(([username, info], idx) => (
          <li key={idx}>
            <strong>{username}</strong> — Password: {info.password}
            <button onClick={() => deleteUser(username)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
