import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../Login.css";
import LogoMain from "../assets/logos/TickTimeLogo_Login.png";
import Silver from "../assets/logos/Silver_TICK.png";
import Gold from "../assets/logos/Gold_TICK.png";
import Diamond from "../assets/logos/Diamond_TICK.png";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isBeating, setIsBeating] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLogoVisible(true);
    }, 300);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("⚠️ Please verify your email before logging in.");
        return;
      }

      navigate("/UserFeed"); 
    } catch (err) {
      console.error("Login error:", err.message);
      setError("❌ " + err.message);
    }
  };

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
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: "#f55", marginTop: "1rem" }}>{error}</p>}

        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span> | </span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}


