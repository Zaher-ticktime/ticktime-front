
import React, { useState, useEffect } from "react";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("walletAddress");
    if (saved) setWalletAddress(saved);
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address);
      } catch (err) {
        console.error("❌ User rejected connection:", err);
      }
    } else {
      alert("🦊 Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
  };

  return (
    <div style={{
      background: "#111",
      color: "#0cf",
      padding: "1rem",
      borderRadius: "6px",
      maxWidth: "400px",
      margin: "2rem auto",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)"
    }}>
      <h2 style={{ marginBottom: "1rem" }}>🔗 Connect your Wallet</h2>
      {walletAddress ? (
        <>
          <p>✅ Connected: <strong>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</strong></p>
          <button onClick={disconnectWallet} style={{
            background: "#f66",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1rem"
          }}>
            Disconnect
          </button>
        </>
      ) : (
        <button onClick={connectWallet} style={{
          background: "#0cf",
          color: "#000",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
