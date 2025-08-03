
import React from "react";

const VIPDashboard = () => {
  const isVIP = true;
  const level = "Gold"; // می‌تونه Silver, Gold یا Diamond باشه

  const vipStyles = {
    Gold: { color: "#FFD700", label: "🥇 Gold Member" },
    Silver: { color: "#C0C0C0", label: "🥈 Silver Member" },
    Diamond: { color: "#00FFFF", label: "💎 Diamond VIP" }
  };

  const currentStyle = vipStyles[level] || { color: "#aaa", label: "🔓 Not VIP" };

  return (
    <div style={{
      background: "#111",
      color: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      maxWidth: "700px",
      margin: "2rem auto",
      boxShadow: "0 0 12px rgba(0,0,0,0.5)"
    }}>
      <h1 style={{ fontSize: "2rem", color: currentStyle.color }}>
        {currentStyle.label}
      </h1>

      {isVIP ? (
        <>
          <p style={{ marginTop: "1rem" }}>🎉 Welcome to your exclusive VIP space!</p>
          <ul style={{ marginTop: "1.5rem", lineHeight: "2rem" }}>
            <li>✅ Create exclusive MirrorRoom projects</li>
            <li>✅ Boost and manage VIP memes</li>
            <li>✅ Access to VIP-only analytics and voting</li>
            <li>✅ Early access to new platform features</li>
            <li>✅ Featured VIP badge on your profile</li>
          </ul>
        </>
      ) : (
        <>
          <p style={{ marginTop: "1rem", color: "#f66" }}>You are not a VIP yet.</p>
          <button style={{
            background: currentStyle.color,
            border: "none",
            padding: "0.7rem 1.5rem",
            borderRadius: "6px",
            marginTop: "1rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Upgrade to VIP
          </button>
        </>
      )}
    </div>
  );
};

export default VIPDashboard;