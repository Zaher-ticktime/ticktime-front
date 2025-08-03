// 📁 src/components/MemeDisplay.jsx
import React from "react";

export default function MemeDisplay({ meme }) {
  if (!meme) return null;

  const { imageUrl, caption, power, user } = meme;

  return (
    <div style={{ border: "1px solid #333", borderRadius: "8px", padding: "1rem", backgroundColor: "#1a1a1a", marginBottom: "1.5rem" }}>
      <h4>🎭 Meme by {user || "anonymous"}</h4>
      <p>{caption}</p>
      <img src={imageUrl} alt="meme" style={{ width: "100%", borderRadius: "6px" }} />
      <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
        💥 Power Level: {power} SilverTICK burned
        <br />
        🎁 Reward potential: {Math.min(power, 5)} SilverTICK for viewers (if active)
      </div>
    </div>
  );
}
