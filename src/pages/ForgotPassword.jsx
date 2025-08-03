import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // یادت نره این Navbar توی پروژه‌ت باشه

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setType("success");
      setMessage("✅ A reset link has been sent to your email.");
    } catch (err) {
      setType("error");
      setMessage("❌ " + err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-start bg-neutral-900 text-white px-4 mt-24">

        <div className="bg-neutral-800 p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🔐 Forgot Your Password?
          </h2>

          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Email address:</label>
              <input
                type="email"
                className="w-full p-3 rounded-xl bg-neutral-700 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className={`w-full p-3 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 text-sm p-3 rounded text-center ${
                type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

