// MemePowerPage.jsx (Click to Expand Power Button)
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const MemePowerPage = () => {
  const [memes, setMemes] = useState([]);
  const [newMeme, setNewMeme] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");
  const [activeMemeId, setActiveMemeId] = useState(null);
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user", email: "test@tick.com" };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "memes"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      list.sort((a, b) => (b.power || 0) - (a.power || 0));
      setMemes(list);
    });
    return () => unsubscribe();
  }, []);

  const handleAddMeme = async () => {
    if (newMeme.trim() === "") return;
    await addDoc(collection(db, "memes"), {
      text: newMeme,
      createdBy: user.email,
      createdAt: serverTimestamp(),
      power: 0,
    });
    setNewMeme("");
  };

  const handlePowerUp = async (memeId) => {
    const powerRef = doc(db, "memes", memeId, "power", user.uid);
    const snap = await getDoc(powerRef);
    if (!snap.exists()) {
      await setDoc(powerRef, { value: 0.5, by: user.email });
      const memeRef = doc(db, "memes", memeId);
      const memeSnap = await getDoc(memeRef);
      const current = memeSnap.data().power || 0;
      await setDoc(memeRef, { power: current + 0.5 }, { merge: true });
      setRewardMessage("⚡ You gave 0.5 Power to this meme!");
      setTimeout(() => setRewardMessage(""), 3000);
    } else {
      setRewardMessage("❌ You already powered this meme.");
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 Meme Power</h1>

      <div className="mb-6">
        <input
          value={newMeme}
          onChange={(e) => setNewMeme(e.target.value)}
          placeholder="Write your meme..."
          className="w-full px-3 py-2 border rounded"
        />
        <button onClick={handleAddMeme} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          Submit Meme
        </button>
      </div>

      {memes.map((meme) => (
        <div key={meme.id} className="bg-gray-100 p-3 rounded mb-3 shadow">
          <p
            className="text-sm cursor-pointer hover:underline"
            onClick={() => setActiveMemeId(activeMemeId === meme.id ? null : meme.id)}
          >
            🧠 {meme.text}
          </p>
          <p className="text-xs text-gray-600">by {meme.createdBy}</p>
          <p className="text-xs">⚡ Power: {meme.power?.toFixed(1) || 0}</p>

          {activeMemeId === meme.id && (
            <button
              onClick={() => handlePowerUp(meme.id)}
              className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            >
              Power this Meme
            </button>
          )}
        </div>
      ))}

      {rewardMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-bounce">
          {rewardMessage}
        </div>
      )}
    </div>
  );
};

export default MemePowerPage;

