import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="dark-bg">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

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
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <p onClick={() => navigate("/")} className="link">Don't have an account? Sign up</p>
        <p onClick={() => navigate("/admin")} className="admin-link">Want to manage users or chats? <strong>Login as Admin</strong></p>
      </form>
    </div>
  );
}

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
        <input type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="color-section">
          <label>Choose message color:</label>
          <div className="color-row">
            {colors.map(c => (
              <div key={c} className={`color-box ${c} ${color === c ? 'selected' : ''}`} onClick={() => setColor(c)} />
            ))}
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate("/login")} className="link">Already have an account? Login</p>
      </form>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("chatswrap-user");

  return (
    <div className="container welcome">
      <h2>Welcome, {user}!</h2>
      <button onClick={() => navigate("/chat")}>Enter Chatroom</button>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const user = localStorage.getItem("chatswrap-user");
  const users = JSON.parse(localStorage.getItem("chatswrap-accounts") || "{}");
  const allUsernames = Object.keys(users);
  const navigate = useNavigate();

  
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("chatswrap-accounts") || "{}");
    if (!accounts[user]) {
      alert("Your account has been removed.");
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatswrap-messages") || "[]");
    setMessages(saved);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (input.trim() !== "") {
      const newMessage = {
        sender: user,
        text: input,
        color: users[user].color,
        replyTo: replyTo !== null ? messages[replyTo] : null
      };
      const updated = [...messages, newMessage];
      setMessages(updated);
      localStorage.setItem("chatswrap-messages", JSON.stringify(updated));
      setInput("");
      setReplyTo(null);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleReply(index) {
    setReplyTo(index);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div className="chatroom-full">
      <div className="chat-left">
        <h2 className="brand-title">ChatsWrap</h2>
        <div className="current-user">Logged in as: <strong>{user}</strong></div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message" style={{ borderLeftColor: msg.color }}>
              <strong style={{ color: msg.color }}>{msg.sender}:</strong>
              {msg.replyTo && (
                <div className="reply-box">
                  <em>Replying to {msg.replyTo.sender}: {msg.replyTo.text}</em>
                </div>
              )}
              <div>{msg.text}</div>
              <button className="reply-btn" onClick={() => handleReply(index)}>Reply</button>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        {replyTo !== null && (
          <div className="replying-to">
            Replying to <strong>{messages[replyTo]?.sender}</strong>: {messages[replyTo]?.text}
          </div>
        )}
        <div className="input-container">
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <div className="chat-right">
        <h3 className="brand-title">All Users</h3>
        <ul className="outlined-list">
          {allUsernames.map((u, i) => (
            <li key={i}><div className="user-squircle">{u}</div></li>
          ))}
        </ul>
        <div className="auth-buttons">
          <button onClick={() => navigate("/")}>New Signup</button>
          <button onClick={() => navigate("/login")}>New Login</button>
        </div>
      </div>
    </div>
  );
}

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
        <input type="password" placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Enter Admin Panel</button>
      </form>
    </div>
  );
}

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
        onClick={() => window.location.href='/chat'}
        className="go-chat-btn"
        style={{ marginTop: "20px", display: "block" }}
      >
        Go to Chatroom
      </button>

      <h3>Registered Users</h3>
      <ul className="admin-user-list">
        {Object.entries(users).map(([username, info], idx) => (
          <li key={idx}>
            <strong>{username}</strong> — Password: {info.password}
            <button onClick={() => deleteUser(username)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
