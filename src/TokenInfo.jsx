
import React from "react";
import Silver from "./assets/logos/Silver_TICK.png";
import Gold from "./assets/logos/Gold_TICK.png";
import Diamond from "./assets/logos/Diamond_TICK.png";
import "./TokenInfo.css";


export default function TokenInfo() {
  return (
    <div className="token-info">
      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "2rem" }}>💠 TickTime Tokens</h2>

      <div className="coin-row">
        <div className="coin">
          <img src={Silver} alt="Silver TICK" />
          <p>Silver TICK</p>
        </div>
        <div className="coin">
          <img src={Gold} alt="Gold TICK" />
          <p>Golden TICK</p>
        </div>
        <div className="coin">
          <img src={Diamond} alt="Diamond TICK" />
          <p>Diamond TICK</p>
        </div>
      </div>
    </div>
  );
}
