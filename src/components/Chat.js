import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

export default Chat;
