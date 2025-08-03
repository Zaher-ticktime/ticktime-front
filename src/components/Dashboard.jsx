import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // مسیر firebase.js خودتو دقیق بذار
import { useAuth } from "../contexts/AuthContext"; // اگه از context استفاده می‌کنی
import SilverTICK from "../contracts/SilverTICK.json";
import GoldenTICK from "../contracts/GoldenTICK.json";
import DiamondTICK from "../contracts/DiamondTICK.json";
import Navbar from "../components/Navbar";

const silverAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const goldenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const diamondAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export default function Dashboard() {
  const { currentUser } = useAuth(); // حتماً لاگین باید باشه
  const [balances, setBalances] = useState({
    silver: null,
    golden: null,
    diamond: null,
  });
  const [socialStats, setSocialStats] = useState({
    privateChats: 0,
    voiceCalls: 0,
    videoCalls: 0,
    groupsJoined: 0,
  });
  const [error, setError] = useState(null);

  // توکن‌ها
  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const wallet = currentUser?.walletAddress || "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // موقتی

        const silver = new ethers.Contract(silverAddress, SilverTICK.abi, provider);
        const golden = new ethers.Contract(goldenAddress, GoldenTICK.abi, provider);
        const diamond = new ethers.Contract(diamondAddress, DiamondTICK.abi, provider);

        const s = await silver.balanceOf(wallet);
        const g = await golden.balanceOf(wallet);
        const d = await diamond.balanceOf(wallet);

        setBalances({
          silver: ethers.formatUnits(s, 18),
          golden: ethers.formatUnits(g, 18),
          diamond: ethers.formatUnits(d, 18),
        });
      } catch (err) {
        console.error("❌ Token Error:", err);
        setError("Could not fetch token balances.");
      }
    };

    fetchBalances();
  }, [currentUser]);

  // آمار تماس و چت
  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;
      try {
        const ref = doc(db, "userStats", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setSocialStats(snap.data());
        }
      } catch (err) {
        console.error("❌ Firestore Error:", err);
        setError("Failed to fetch social activity.");
      }
    };

    fetchStats();
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 My TickTime Dashboard</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">{error}</div>
        )}

        {/* توکن‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">🥈 SilverTICK</h2>
            <p className="text-2xl text-gray-800">{balances.silver ?? "Loading..."}</p>
          </div>
          <div className="bg-yellow-100 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">🟡 GoldenTICK</h2>
            <p className="text-2xl text-gray-800">{balances.golden ?? "Loading..."}</p>
          </div>
          <div className="bg-blue-100 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">💎 DiamondTICK</h2>
            <p className="text-2xl text-gray-800">{balances.diamond ?? "Loading..."}</p>
          </div>
        </div>

        {/* آمار چت و تماس */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">💬 Social Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-gray-700 font-medium">Private Chats</p>
              <p className="text-2xl font-bold">{socialStats.privateChats}</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-4">
              <p className="text-gray-700 font-medium">Voice Calls</p>
              <p className="text-2xl font-bold">{socialStats.voiceCalls}</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-4">
              <p className="text-gray-700 font-medium">Video Calls</p>
              <p className="text-2xl font-bold">{socialStats.videoCalls}</p>
            </div>
            <div className="bg-yellow-100 rounded-xl p-4">
              <p className="text-gray-700 font-medium">Groups Joined</p>
              <p className="text-2xl font-bold">{socialStats.groupsJoined}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}





