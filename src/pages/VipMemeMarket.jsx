// 📁 src/pages/VipMemeMarket.jsx
import React, { useState } from "react";

const initialMemes = [
  {
    id: 1,
    emoji: "🔥❤️",
    caption: "You’re the fire in the chain!",
    power: 100,
    creator: "zaher.time",
  },
  {
    id: 2,
    emoji: "😂👑",
    caption: "Royal LOLs only",
    power: 80,
    creator: "sara.tick",
  },
];

export default function VipMemeMarket() {
  const [memes, setMemes] = useState(initialMemes);
  const currentUser = "vipuser.tick"; // فرضی برای شبیه‌سازی

  const useMeme = (memeId) => {
    setMemes((prev) =>
      prev.map((m) =>
        m.id === memeId && m.power > 0
          ? { ...m, power: m.power - 10 }
          : m
      )
    );
    alert("✅ Meme used! 50% of power returned to you as reward.");
  };

  const boostMeme = (memeId, boostAmount = 20) => {
    setMemes((prev) =>
      prev.map((m) => {
        if (m.id === memeId) {
          const creatorBonus = Math.floor(boostAmount * 0.3);
          const updatedPower = m.power + boostAmount;
          alert(
            `⚡ Meme boosted by ${boostAmount} SilverTICK!\n🎁 Creator (${m.creator}) receives +${creatorBonus} bonus power.`
          );
          return { ...m, power: updatedPower };
        }
        return m;
      })
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto", color: "#fff" }}>
      <h2>🛍 Meme Market (VIP only)</h2>
      {memes.map((meme) => (
        <div
          key={meme.id}
          style={{ marginBottom: "1.5rem", border: "1px solid #333", borderRadius: "8px", padding: "1rem", backgroundColor: "#1a1a1a" }}
        >
          <h4>{meme.emoji} - <em>{meme.caption}</em></h4>
          <p>💎 Created by: {meme.creator}</p>
          <p>🔥 Power: {meme.power}</p>
          <button onClick={() => useMeme(meme.id)} style={buttonStyle}>Use Meme</button>
          <button onClick={() => boostMeme(meme.id)} style={{ ...buttonStyle, backgroundColor: "#0f0", marginLeft: "1rem" }}>Boost Meme</button>
        </div>
      ))}
    </div>
  );
}

const buttonStyle = {
  padding: "0.5rem 1.2rem",
  backgroundColor: "#0cf",
  color: "black",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};
