import React from "react";

export default function MirrorRoomInfo() {
  return (
    <div style={{ padding: "2rem", color: "#fff", maxWidth: "800px", margin: "auto" }}>
      <h2>🪞 What is Mirror Room?</h2>
      <p>
        Mirror Room is a private, anonymous space where users can participate in surveys, research, or idea challenges and earn SilverTICK as rewards.
      </p>
      <ul style={{ marginTop: "1rem" }}>
        <li>🔒 Anonymous participation</li>
        <li>📝 One-time submission per user per project</li>
        <li>🎯 Projects created by VIP users and approved by TickTime</li>
        <li>💎 VIPs earn 30% of the project’s total rewards</li>
        <li>📊 Answers are visible only to project initiators</li>
        <li>⚙️ TickTime controls reward amount and number of participants</li>
      </ul>
    </div>
  );
}