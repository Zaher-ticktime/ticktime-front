// Wallet with Withdraw to Bank feature
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };
  const [burns, setBurns] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [balance, setBalance] = useState({
    silver: 2450,
    gold: 113,
    diamond: 3,
    cash: 48.7,
  });

  const sendCode = () => {
    if (!phone || phone.length < 6) return alert("📱 Enter valid phone number");
    alert("📲 Code sent to your phone (mocked: 999999)");
    setCodeSent(true);
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) return alert("Enter a valid amount");
    if (amount > balance.cash) return alert("Insufficient cash balance");
    if (!accountNumber || !phone || confirmCode !== "999999") return alert("Fill all fields correctly and enter the correct confirmation code");

    await addDoc(collection(db, "withdraw_requests"), {
      userId: user.uid,
      amount,
      accountNumber,
      phone,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    setBalance((prev) => ({ ...prev, cash: prev.cash - amount }));
    alert("✅ Withdraw request submitted. Await admin approval.");
    setWithdrawAmount("");
    setAccountNumber("");
    setPhone("");
    setConfirmCode("");
    setCodeSent(false);
  };

  const handleUnlock = () => {
    const savedPIN = localStorage.getItem("wallet_pin") || "12345";
    if (pin === savedPIN) {
      setUnlocked(true);
    } else {
      alert("❌ Incorrect PIN");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gray-100 pb-24">
        <Navbar />
        <div className="p-6 max-w-sm mx-auto mt-20 text-center bg-white shadow rounded">
          <h2 className="text-lg font-bold mb-2">🔐 Enter 5-digit Wallet PIN</h2>
          <Input
            type="password"
            maxLength={5}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="e.g. 12345"
            className="text-center"
          />
          <Button onClick={handleUnlock} className="mt-4">Unlock Wallet</Button>
          <p className="text-sm text-blue-600 cursor-pointer mt-3" onClick={() => navigate("/wallet/forgot-pin")}>Forgot PIN?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">💰 Wallet Dashboard</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">SilverTICK</p>
            <h3 className="text-2xl font-semibold text-gray-800">{balance.silver}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">GoldenTICK</p>
            <h3 className="text-2xl font-semibold text-yellow-600">{balance.gold}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">DiamondTICK</p>
            <h3 className="text-2xl font-semibold text-purple-700">{balance.diamond}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">💶 Cash Balance</p>
            <h3 className="text-2xl font-semibold text-green-700">€{balance.cash.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white mt-6 p-4 rounded shadow space-y-3">
          <h3 className="text-lg font-semibold">📤 Request Withdrawal</h3>
          <Input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Amount in €" type="number" />
          <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Your Bank Account / IBAN" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your Phone Number" />
          <div className="flex gap-2 items-center">
            <Button onClick={sendCode}>Send Code</Button>
            {codeSent && <Input value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} placeholder="Enter Code" />}
          </div>
          <Button onClick={handleWithdraw}>Submit Withdrawal Request</Button>
        </div>

      </div>
    </div>
  );
}

