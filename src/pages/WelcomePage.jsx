
import React from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "../assets/logos/TickTimeLogo_Header.png";

export default function WelcomePage() {
  return (
    <div style={{ padding: "2rem", color: "#fff", textAlign: "center", maxWidth: "900px", margin: "auto" }}>
      <img src={HeaderLogo} alt="TickTime Logo" style={{ width: "160px", marginBottom: "1.5rem" }} />
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎯 Welcome to TickTime</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        TickTime is a decentralized social productivity platform that rewards your time and attention. Earn SilverTICK by staying active, focusing, commenting, and watching content. Convert tokens, join challenges, and access exclusive rewards.
      </p>

      <h2>🪙 Meet the TICK Tokens</h2>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
        <li>🥈 <strong>SilverTICK:</strong> Earned through activity and engagement</li>
        <li>💛 <strong>GoldenTICK:</strong> Obtain by burning 1000 SilverTICK or via marketplace</li>
        <li>💎 <strong>DiamondTICK:</strong> Reserved for VIPs and shareholders with exclusive access</li>
      </ul>

      <h2 style={{ marginTop: "2rem" }}>💡 How You Can Earn</h2>
      <ul style={{ listStyle: "disc", textAlign: "left", margin: "auto", maxWidth: "600px", marginBottom: "2rem" }}>
        <li>Focus daily and complete productivity tasks</li>
        <li>Upload useful photos or videos</li>
        <li>Get likes or comments from others</li>
        <li>Watch sponsored trailers in TickTime Cinema</li>
        <li>Answer surveys in MirrorRoom</li>
      </ul>

      <div style={{ marginBottom: "2rem" }}>
        <Link to="/register" style={buttonStyle}>📝 Register</Link>
        <Link to="/login" style={buttonStyle}>🔐 Login</Link>
      </div>

      <hr style={{ borderColor: "#333", margin: "2rem 0" }} />

      <h2>📲 Explore TickTime Apps</h2>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
        <li><Link to="/apps" style={linkStyle}>📱 TickTime Main App</Link></li>
        <li><Link to="/cinema" style={linkStyle}>🎬 TickTime Cinema</Link></li>
        <li><Link to="/tickmarket" style={linkStyle}>🛍 TickMarket</Link></li>
        <li><Link to="/chat" style={linkStyle}>💬 TickTime Chat</Link></li>
      </ul>

      <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "2rem" }}>
        🎉 Join TickTime now and convert your attention into real value. 
        Make friends, earn tokens, and grow your potential — all on a decentralized platform.
      </p>
    </div>
  );
}

const buttonStyle = {
  margin: "0.5rem",
  padding: "0.7rem 1.5rem",
  backgroundColor: "#0cf",
  color: "black",
  border: "none",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold"
};

const linkStyle = {
  color: "#0cf",
  textDecoration: "none",
  fontWeight: "bold"
};