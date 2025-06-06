import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Chat from "./components/Chat";
import AdminLogin from "./components/AdminLogin";
import Admin from "./components/Admin";

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

export default App;
