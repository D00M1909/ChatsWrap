import React from "react";
import { useNavigate } from "react-router-dom";

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

export default Home;
