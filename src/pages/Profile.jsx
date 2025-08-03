
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const isVIP = true;
  const vipLevel = "Gold";

  const vipBadge = {
    Silver: { color: "#C0C0C0", emoji: "🥈" },
    Gold: { color: "#FFD700", emoji: "🥇" },
    Diamond: { color: "#00FFFF", emoji: "💎" }
  }[vipLevel];

  return (
    <div style={{
      maxWidth: "900px",
      margin: "3rem auto",
      padding: "2rem",
      background: "#1a1a1a",
      color: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.5)",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#0cf" }}>👤 My Profile</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
        <img
          src="/avatar.png"
          alt="avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "3px solid #0cf",
            objectFit: "cover"
          }}
        />
        <div>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Zaher Mostaghi</h2>
          <p style={{ marginBottom: "0.5rem", color: "#aaa" }}>zaher@example.com</p>

          {isVIP && (
            <span style={{
              background: vipBadge.color,
              padding: "0.4rem 0.8rem",
              borderRadius: "20px",
              fontWeight: "bold",
              color: "#000",
              fontSize: "0.85rem"
            }}>
              {vipBadge.emoji} {vipLevel} VIP
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
        <Link to="/myphotos" style={buttonStyle}>📸 My Photos</Link>
        <Link to="/myvideos" style={buttonStyle}>🎥 My Videos</Link>
        <Link to="/mypurchases" style={buttonStyle}>🛍 My Purchases</Link>
        <Link to="/lucky-results" style={buttonStyle}>🎁 Lucky Results</Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: "#0cf",
  color: "#000",
  textDecoration: "none",
  padding: "0.6rem 1rem",
  borderRadius: "6px",
  fontWeight: "bold",
  display: "inline-block",
  transition: "all 0.3s ease"
};

export default Profile;
