import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";

export default function GroupChat({ groupName = "TickTime Friends" }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const addSilver = useWalletStore((state) => state.addSilver);

  const sendMessage = () => {
    if (!text) return;
    const newMsg = { sender: "Me", content: text, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    const newCount = messageCount + 1;
    if (newCount % 2 === 0) addSilver(1);
    setMessageCount(newCount);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Group Chat: {groupName}</h2>
      <Card className="h-80 overflow-y-auto">
        <CardContent className="space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="bg-gray-100 rounded-xl px-3 py-2 text-sm">
              <strong>{msg.sender}:</strong> {msg.content} <span className="text-gray-400 text-xs float-right">{msg.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}