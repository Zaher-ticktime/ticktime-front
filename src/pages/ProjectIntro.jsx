// 📁 src/pages/ProjectIntro.jsx
import React from "react";

export default function ProjectIntro() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌐 TickTime: The Trillion-Time Project</h1>

      <p style={{ marginBottom: "1rem" }}>
        TickTime is not just an app. It’s a movement. A decentralized platform that transforms your time into tangible value — whether you're studying, watching, socializing, commenting, or simply being focused.
      </p>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>🚀 Why “Trillion-Time”?</h2>
      <p>
        Globally, people spend trillions of hours online each year. TickTime aims to tokenize that time and redistribute its value back to users — not big tech companies. Every second matters.
      </p>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>💡 What Makes TickTime Unique?</h2>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li>🎯 Social-to-Earn: Rewarded for likes, comments, uploads</li>
        <li>🧠 Focus-to-Earn: Earn tokens for staying focused</li>
        <li>🎬 Watch-to-Earn: Earn from viewing sponsored content</li>
        <li>🛍️ Buy & Sell in TickMarket using GoldenTICK</li>
        <li>💬 Communicate & earn via Chat and MirrorRoom</li>
      </ul>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>🪙 The Token Ecosystem</h2>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li><strong>🥈 SilverTICK:</strong> Unlimited earnable token for daily actions. Must be burned to convert to GoldenTICK. Also usable for getting discounts in marketplace.</li>
        <li><strong>💛 GoldenTICK:</strong> Tradable token with fixed supply. Used in marketplace, premium access, and earning benefits for businesses.</li>
        <li><strong>💎 DiamondTICK:</strong> Limited supply. Grants ownership benefits, voting rights, early access, and even revenue share in special campaigns.</li>
      </ul>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>📈 Our Vision</h2>
      <p>
        Time is the most undervalued asset on Earth. We are here to change that. 
        By 2030, we envision a global ecosystem where time is a currency.
      </p>

      <p style={{ marginTop: "2rem" }}>Ready to turn your time into value?</p>
      <button style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "#ffd700", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
        🚀 Join the Trillion-Time Movement
      </button>
    </div>
  );
} 
