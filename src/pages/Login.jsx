// File: Login.jsx
import React from "react";
import  { useState, useEffect } from "react";
import  { useNavigate } from "react-router-dom";
import "../Login.css";
import LogoMain from "../assets/logos/TickTimeLogo_Login.png";
import Silver from "../assets/logos/Silver_TICK.png";
import Gold from "../assets/logos/Gold_TICK.png";
import Diamond from "../assets/logos/Diamond_TICK.png";
import { Link } from "react-router-dom";

export default function Login() {
 
   
  const [isBeating, setIsBeating] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  

  useEffect(() => {
    setTimeout(() => {
      setLogoVisible(true);
    }, 300);
  }, []);

  return (



   <div className="login-wrapper">
      <div className="coin-container">
         <img src={Silver} alt="Silver" className="coin silver" />
        <img src={Gold} alt="Gold" className="coin gold" />
        <img src={Diamond} alt="Diamond" className="coin diamond" />
      </div>

     <div className="main-logo-wrapper">
        <img
        src={LogoMain}
       alt="TickTime Logo"
        className={`main-logo ${isBeating ? "heartbeat" : ""}`}
       onClick={() => setIsBeating(true)}
       onAnimationEnd={() => setIsBeating(false)}
       />
     </div>


      <div className="login-box">
        <h2>Login to TickTime</h2>
        <form className="login-form">
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
           <Link to="/forgot-password">Forgot Password?</Link>
           <span> | </span>
           <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

