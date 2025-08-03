import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎯 Welcome to TickTime</h1>
      <p>Select a section to enter:</p>

      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Link to="/dashboard">
          <button>📊 Go to Dashboard</button>
        </Link>
        <Link to="/profile">
          <button>👤 My Profile</button>
        </Link>
        <Link to="/wallet-dashboard">
          <button>👛 Wallet</button>
        </Link>
        <Link to="/tickmarket">
          <button>🛒 TickMarket</button>
        </Link>
        <Link to="/mirrorroom">
          <button>🪞 Mirror Room</button>
        </Link>
      </div>
    </div>
  );
}

