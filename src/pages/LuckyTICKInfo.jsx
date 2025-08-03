import React from "react";

export default function LuckyTICKInfo() {
  return (
    <div style={{ padding: "2rem", color: "#fff", maxWidth: "800px", margin: "auto" }}>
      <h2>🎉 Welcome to LuckyTICK</h2>
      <p>
        LuckyTICK is TickTime's seasonal lottery event! Users can join the draw by burning SilverTICK or paying with GoldenTICK tokens.
      </p>

      <h3>🎯 How to Participate</h3>
      <ul>
        <li>🔥 Burn 500 SilverTICK to enter the standard draw (once per season)</li>
        <li>💛 Pay 10 GoldenTICK to enter the premium draw (up to 3 entries)</li>
        <li>💱 GoldenTICK can be purchased from exchanges or other users</li>
      </ul>

      <h3>🏆 Prize Highlights</h3>
      <ul>
        <li>💰 Cash prizes in crypto</li>
        <li>🚗 Vehicles or luxury gifts</li>
        <li>💼 Honorary Project Manager role with token salary</li>
        <li>💎 Rare DiamondTICK or high-value NFTs</li>
      </ul>

      <p style={{ marginTop: "1rem" }}>
        The more GoldenTICK you spend, the higher your chances! SilverTICK entries are limited to once per season.
      </p>

      <p>
        👉 You must be logged in to access the full LuckyTICK dashboard and claim your rewards!
      </p>
    </div>
  );
}
