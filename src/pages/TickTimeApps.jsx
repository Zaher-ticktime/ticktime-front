// 📁 src/pages/TickTimeApps.jsx
import React from "react";

export default function TickTimeApps() {
  return (
    <div style={{ padding: "2rem", color: "#fff", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>📱 TickTime Apps</h1>
      
       <h2 style={{ marginTop: "2rem" }}>📱 TickTime App</h2>
<p>The complete TickTime experience in one app. Access your profile, earn tokens, join chats, and explore all features in one place.</p>

<div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
  <button style={{ padding: "0.5rem 1rem", backgroundColor: "#444", color: "#fff", border: "none", borderRadius: "6px" }}>
    ⬇️ Download for Android (Coming soon)
  </button>
  <button style={{ padding: "0.5rem 1rem", backgroundColor: "#444", color: "#fff", border: "none", borderRadius: "6px" }}>
    ⬇️ Download for iOS (Coming soon)
  </button>
</div>

      {/* 🎬 TickTime Cinema */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2>🎬 TickTime Cinema</h2>
        <p>
          Watch short and long films, trailers, and user content. Earn Silver TICK for watching, liking, and commenting.
        </p>
        <div style={{ marginTop: "0.5rem" }}>
          <button style={buttonStyle}>⬇️ Download Mobile App (Coming soon)</button>
          <button style={buttonStyle}>🌐 Open Cinema Web</button>
        </div>
      </section>

      {/* 🛒 TickMarket */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2>🛒 TickMarket</h2>
        <p>
          Trade items or services using GoldenTICK. Burn SilverTICK for extra discounts. Sellers with more GoldenTICK get better deals.
        </p>
        <div style={{ marginTop: "0.5rem" }}>
          <button style={buttonStyle}>⬇️ Download Market App (Coming soon)</button>
          <button style={buttonStyle}>🌐 Open TickMarket Web</button>
        </div>
      </section>

      {/* 💬 TickTime Chat */}
      <section>
        <h2>💬 TickTime Chat</h2>
        <p>
          Stay connected via voice, video, and chat. Your social activity helps you earn too!
        </p>
        <div style={{ marginTop: "0.5rem" }}>
          <button style={buttonStyle}>⬇️ Download Chat App (Coming soon)</button>
          <button style={buttonStyle}>🌐 Open Chat Platform</button>
        </div>
      </section>
    </div>
  );
}

const buttonStyle = {
  padding: "0.5rem 1rem",
  marginRight: "1rem",
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "0.9rem",
  cursor: "pointer"
};
