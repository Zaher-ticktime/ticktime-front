// SmartNavbar.jsx (با اضافه شدن LuckyTICK اصلی برای کاربران وارد شده)
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SmartNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTickMenu, setShowTickMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("tick_user"));
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tick_user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate("/");
  };

  const linkStyle = {
    color: "#0cf",
    textDecoration: "none",
    fontWeight: "bold",
    marginRight: "1rem",
    whiteSpace: "nowrap"
  };

  const dropdownStyle = {
    position: "absolute",
    top: "2.5rem",
    background: "#222",
    padding: "0.5rem",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    zIndex: 1000,
    right: 0
  };

  return (
    <nav style={{ backgroundColor: "#111", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", position: "sticky", top: 0, zIndex: 1000 }}>
      <Link to="/feed" style={linkStyle}>🏠 Home</Link>
      <Link to="/apps" style={linkStyle}>🎮 Apps</Link>
      <Link to="/tickmarket-info" style={linkStyle}>🛍️ Market Info</Link>
      <Link to="/cinema-info" style={linkStyle}>🎬 Cinema Info</Link>
      <Link to="/mirror-info" style={linkStyle}>🪞 Mirror Info</Link>
      <Link to="/chat-info" style={linkStyle}>💬 Chat Info</Link>
      <Link to="/lucky-tick-info" style={linkStyle}>🎁 LuckyTICK Info</Link>

      {/* TICK Dropdown */}
      <div style={{ position: "relative" }}>
        <span
          onClick={() => {
            setShowTickMenu(!showTickMenu);
            setShowProfileMenu(false);
          }}
          style={{ ...linkStyle, cursor: "pointer" }}
        >
          💎 TICK Tokens ▾
        </span>
        {showTickMenu && (
          <div style={dropdownStyle}>
            <Link to="/silver-info" style={linkStyle}>🥈 Silver TICK</Link>
            <Link to="/golden-info" style={linkStyle}>🥇 Golden TICK</Link>
            <Link to="/diamond-info" style={linkStyle}>💠 Diamond TICK</Link>
          </div>
        )}
      </div>

      {/* Avatar / Login */}
      <div style={{ position: "relative", marginLeft: "auto" }}>
        {!isLoggedIn ? (
          <Link to="/login" style={linkStyle}>🔐 Login</Link>
        ) : (
          <>
            <img
              src="https://i.pravatar.cc/32"
              alt="avatar"
              style={{ width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", border: "2px solid white" }}
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowTickMenu(false);
              }}
            />
            {showProfileMenu && (
              <div style={dropdownStyle}>
                <Link to="/profile" style={linkStyle}>👤 Profile</Link>
                <Link to="/wallet" style={linkStyle}>💼 Wallet</Link>
                <Link to="/vip-dashboard" style={linkStyle}>📊 VIP Panel</Link>
                <Link to="/meme-power" style={linkStyle}>⚡ Meme Power</Link>
                <Link to="/top-memes" style={linkStyle}>🏆 Top Memes</Link>
                <Link to="/submit-project" style={linkStyle}>📩 Submit Project</Link>
                <Link to="/myphotos" style={linkStyle}>🖼️ MyPhotos</Link>
                <Link to="/videos" style={linkStyle}>🎞️ Videos</Link>
                <Link to="/groups" style={linkStyle}>👥 Groups</Link>
                <Link to="/chat" style={linkStyle}>💬 Chat</Link>
                <Link to="/market" style={linkStyle}>🛒 Market</Link>
                <Link to="/cinema" style={linkStyle}>🎥 Cinema</Link>
                <Link to="/mirrorroom" style={linkStyle}>🪞 MirrorRoom</Link>
                <Link to="/lucky-tick" style={linkStyle}>🎁 LuckyTICK</Link>
                <button onClick={handleLogout} style={{ ...linkStyle, background: "none", border: "none", padding: 0, cursor: "pointer", color: "#f66" }}>
                  🚪 Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default SmartNavbar;


