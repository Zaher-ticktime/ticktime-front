import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Input from "@/components/Ui/input";
import Button from "@/components/Ui/button";

const mockFriends = ["ali", "mina", "sara"];

export default function ChatPage() {
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [groupMode, setGroupMode] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    if (groupMode || !selectedFriend) return;
    const roomId = generateRoomId(user.uid, selectedFriend);
    const chatRef = collection(db, `private_chat/${roomId}/messages`);
    const q = query(chatRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setMessages(data);
    });
    return () => unsub();
  }, [groupMode, selectedFriend]);

  useEffect(() => {
    if (!groupMode) return;
    const chatRef = collection(db, "group_chat");
    const q = query(chatRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setMessages(data);
    });
    return () => unsub();
  }, [groupMode]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    if (groupMode) {
      await addDoc(collection(db, "group_chat"), {
        sender: user.uid,
        text,
        createdAt: serverTimestamp(),
      });
    } else {
      const roomId = generateRoomId(user.uid, selectedFriend);
      await addDoc(collection(db, `private_chat/${roomId}/messages`), {
        sender: user.uid,
        text,
        createdAt: serverTimestamp(),
      });
    }
    setText("");
  };

  const startCall = async (type) => {
    if (!selectedFriend) return alert("Select a friend to call.");
    const callType = type === "audio" ? "Voice" : "Video";
    const now = new Date().toISOString();
    await addDoc(collection(db, "calls"), {
      caller: user.uid,
      receiver: selectedFriend,
      type: callType,
      startedAt: now,
      duration: 5,
      reward: callType === "Voice" ? 5 : 7,
    });
    alert(`📞 ${callType} call started. You earned ${callType === "Voice" ? 5 : 7} SilverTICK!`);
  };

  const generateRoomId = (a, b) => {
    return [a, b].sort().join("_");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            💬 {groupMode ? "Group Chat" : selectedFriend ? `Chat with ${selectedFriend}` : "Select a Friend"}
          </h2>
          <Button onClick={() => {
            setGroupMode(true);
            setSelectedFriend("");
          }}>Switch to Group</Button>
        </div>

        {!groupMode && (
          <div className="flex gap-2 text-sm flex-wrap">
            {mockFriends.map((f) => (
              <Button key={f} onClick={() => {
                setSelectedFriend(f);
                setGroupMode(false);
              }} className={selectedFriend === f ? "bg-cyan-500 text-white" : "bg-white border"}>{f}</Button>
            ))}
          </div>
        )}

        {!groupMode && selectedFriend && (
          <div className="flex gap-4 mt-2">
            <Button onClick={() => startCall("audio")} className="bg-slate-200">📞 Voice Call</Button>
            <Button onClick={() => startCall("video")} className="bg-slate-200">🎥 Video Call</Button>
          </div>
        )}

        <div className="h-80 overflow-y-auto bg-white p-4 rounded shadow space-y-2">
          {messages.length === 0 && <p className="text-gray-400">No messages yet.</p>}
          {messages.map((m, i) => (
            <div key={i} className={`text-sm ${m.sender === user.uid ? "text-right" : "text-left"}`}>
              <span className="font-semibold">{m.sender}:</span> {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}
