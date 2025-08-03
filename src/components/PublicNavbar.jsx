import React from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  const linkStyle = {
    color: "#0cf",
    textDecoration: "none",
    fontWeight: "bold",
    marginRight: "1rem"
  };

  return (
    <nav style={{ backgroundColor: "#111", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <Link to="/" style={linkStyle}>🏠 Home</Link>
      <Link to="/apps" style={linkStyle}>📱 Apps</Link>
      <Link to="/tickmarket-info" style={linkStyle}>🛍️ Market Info</Link>
      <Link to="/cinema-info" style={linkStyle}>🎬 Cinema Info</Link>
      <Link to="/mirror-info" style={linkStyle}>🪞 Mirror Info</Link>
      <Link to="/chat-info" style={linkStyle}>💬 Chat Info</Link>
      <Link to="/lucky-tick-info" style={linkStyle}>🎁 LuckyTICK</Link>

      {/* Dropdown for TICK Tokens */}
      <div style={{ position: "relative" }}>
        <span style={{ ...linkStyle, cursor: "pointer" }}>💠 TICK Tokens ▾</span>
        <div style={{
          position: "absolute",
          top: "2rem",
          background: "#222",
          padding: "0.5rem",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          zIndex: 100
        }}>
          <Link to="/silver-info" style={linkStyle}>🥈 Silver TICK</Link>
          <Link to="/golden-info" style={linkStyle}>🥇 Golden TICK</Link>
          <Link to="/diamond-info" style={linkStyle}>💠 Diamond TICK</Link>
        </div>
      </div>

      <Link to="/login" style={linkStyle}>🔐 Login</Link>
      <Link to="/register" style={linkStyle}>🆕 Register</Link>
    </nav>
  );
}