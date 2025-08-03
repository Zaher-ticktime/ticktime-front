import React from "react";
import Gold from "../assets/logos/Gold_TICK.png"; 

function GoldenInfo() {
  return ( 

    <div className="login-wrapper">
      <div className="coin-container">
         <img src={Gold} alt="Gold" className="coin gold" />
       
      </div>
     <div style={{ padding: "2rem" }}>
       <h1>🟡 GoldenTICK Token</h1>
       <p>
         GoldenTICK is the main tradable token of the TickTime ecosystem.
       </p>
       <ul>
         <li>💱 Can be traded or exchanged</li>
         <li>🔥 1 GoldenTICK = 1000 SilverTICK (burn required)</li>
         <li>🏷️ Used to access premium features</li>
         <li>🛍️ Used for marketplace payments</li>
       </ul>
      </div>
    </div>
  );
}

export default GoldenInfo;
