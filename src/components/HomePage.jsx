import React, { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

function HomePage() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [wallet, setWallet] = useState(null);
  const [registered, setRegistered] = useState(false);

  function handleRegister(e) {
    e.preventDefault();

    if (!email || !mobile) {
      alert("Email and mobile number are required.");
      return;
    }

    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
    setRegistered(true);

    localStorage.setItem("ticktime_user", JSON.stringify({
      email,
      mobile,
      address,
      walletPrivateKey: newWallet.privateKey,
      walletAddress: newWallet.address
    }));
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', minHeight: '100vh' }}>
      <h2>🎯 Register Your TickTime Profile</h2>

      {!registered ? (
        <form onSubmit={handleRegister}>
          <div>
            <label>Email:</label><br />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Mobile Number:</label><br />
            <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required />
          </div>
          <div>
            <label>Address (optional):</label><br />
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>Create Profile</button>
        </form>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>✅ Profile Created!</strong></p>
          {wallet && (
            <p>Wallet Address: <code>{wallet.address}</code></p>
          )}
          <p style={{ fontSize: '0.85rem', color: 'gray' }}>⚠️ Keep your private key safe!</p>
        </div>
      )}

      {/* لینک‌های ناوبری به صفحات دیگه */}
      <div style={{ marginTop: "2rem" }}>
        <h3>🔗 Go to other pages:</h3>
        <Link to="/dashboard"><button style={{ marginRight: "1rem" }}>Dashboard</button></Link>
        <Link to="/profile"><button style={{ marginRight: "1rem" }}>Profile</button></Link>
        <Link to="/silver"><button style={{ marginRight: "1rem" }}>Silver Info</button></Link>
        <Link to="/golden"><button style={{ marginRight: "1rem" }}>Golden Info</button></Link>
        <Link to="/diamond"><button>Diamond Info</button></Link>
      </div>
    </div>
  );
}

export default HomePage;
