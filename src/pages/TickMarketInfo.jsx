import React from "react";

export default function TickMarketInfo() {
  return (
    <div style={{ padding: "2rem", color: "#fff", maxWidth: "800px", margin: "auto" }}>
      <h2>🛍 TickMarket Overview</h2>
      <p>
        TickMarket is the official marketplace of the TickTime ecosystem where users can purchase real or digital items using a mix of cash and TickTime tokens (Silver or Golden TICK).
      </p>
      <ul style={{ marginTop: "1rem" }}>
        <li>🪙 Pay with GoldenTICK or mix SilverTICK + fiat</li>
        <li>🔥 Burn SilverTICK for exclusive discounts</li>
        <li>📦 Shop digital products, services, and merchandise</li>
        <li>💎 DiamondTICK holders pay lower platform fees</li>
        <li>📲 Future integration with mobile app purchases</li>
      </ul>
    </div>
  );
}