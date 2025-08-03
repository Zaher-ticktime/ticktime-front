import React from "react";
import Diamond from "../assets/logos/Diamond_TICK.png";

function DiamondInfo() {
  return (
    <div className="login-wrapper">
      <div className="coin-container">
         
        <img src={Diamond} alt="Diamond" className="coin diamond" />
      </div>
     <div style={{ padding: "2rem" }}>
       <h1>💎 DiamondTICK Token</h1>
       <p>
         DiamondTICK is a rare and privileged token in the TickTime ecosystem.
       </p>
       <ul>
         <li>🗳️ Grants voting power</li>
         <li>👑 Gives VIP access to special features</li>
        <li>🔐 Only obtainable through conversion from GoldenTICK</li>
         <li>🚫 Not transferable without approval</li>
       </ul>
     </div>
     </div>
  );
}

export default DiamondInfo;
