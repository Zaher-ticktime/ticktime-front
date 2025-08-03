import React from "react";
import Silver from "../assets/logos/Silver_TICK.png";
function SilverInfo() {
  return (

    <div className="login-wrapper">
      <div className="coin-container">
         <img src={Silver} alt="Silver" className="coin silver" />
      
      </div>


      <div style={{ padding: "2rem" }}>
         <h1>🥈 SilverTICK Token</h1>
       <p>
        SilverTICK is the main activity token of TickTime. You earn it through:
       </p>
        <ul>
         <li>✅ Focused time tracking</li>
        <li>✅ Social activity (likes, posts, comments)</li>
         <li>✅ Mirror Room participation</li>
         <li>✅ Watching videos or ads</li>
        </ul>
       <p>
        SilverTICK is not tradable on external exchanges, but can be burned to receive GoldenTICK.
      </p> 
     </div>
    </div>
  );
}

export default SilverInfo;
