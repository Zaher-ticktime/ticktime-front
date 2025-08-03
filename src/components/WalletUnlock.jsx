
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export default function WalletUnlock({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUnlock = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      if (onUnlock) onUnlock();
    } catch (err) {
      setError("❌ رمز عبور اشتباه است");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto", color: "#fff" }}>
      <h2>🔐 Enter your password to access Wallet</h2>
      <form onSubmit={handleUnlock}>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "5px" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#00c853", color: "#fff", border: "none", borderRadius: "5px" }}>
          Unlock Wallet
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}
