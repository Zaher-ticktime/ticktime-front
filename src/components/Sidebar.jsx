
import React from "react";
import FriendsPanel from "./FriendsPanel";
import NotificationsPanel from "./NotificationsPanel";
import ChatPanel from "./ChatPanel";
import TickMarketPanel from "./TickMarketPanel";
import CinemaPanel from "./CinemaPanel";
import MirrorRoomPanel from "./MirrorRoomPanel";

export default function Sidebar({ activePanel, onClose }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "280px",
      height: "100vh",
      backgroundColor: "#222",
      color: "#fff",
      padding: "1rem",
      overflowY: "auto",
      zIndex: 2000,
      boxShadow: "2px 0 10px rgba(0,0,0,0.5)"
    }}>
      <button onClick={onClose} style={{
        background: "#f66",
        color: "#fff",
        border: "none",
        padding: "0.4rem 1rem",
        borderRadius: "6px",
        marginBottom: "1rem",
        cursor: "pointer"
      }}>
        Close
      </button>

      {activePanel === "friends" && <FriendsPanel />}
      {activePanel === "notifications" && <NotificationsPanel />}
      {activePanel === "chat" && <ChatPanel />}
      {activePanel === "tickmarket" && <TickMarketPanel />}
      {activePanel === "cinema" && <CinemaPanel />}
      {activePanel === "mirror" && <MirrorRoomPanel />}
    </div>
  );
}