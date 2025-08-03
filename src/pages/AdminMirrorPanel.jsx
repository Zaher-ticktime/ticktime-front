import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function AdminMirrorPanel() {
  const [pendingProjects, setPendingProjects] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "mirror_projects"), (snap) => {
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => !p.approved);
      setPendingProjects(data);
    });
    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "mirror_projects", id), {
      approved: status,
      reviewedAt: new Date().toISOString(),
    });
    alert(status ? "✅ Approved" : "❌ Rejected");
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🛠 Admin Mirror Projects</h2>

        {pendingProjects.length === 0 && <p className="text-gray-500">No pending projects for review.</p>}

        {pendingProjects.map((p) => (
          <Card key={p.id}>
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="text-xs text-gray-500">Reward per answer: {p.rewardPerAnswer}</p>
              <p className="text-xs text-gray-500">Max participants: {p.maxParticipants}</p>
              <p className="text-xs text-gray-500">VIP revenue: €{p.vipRevenue} / Platform cut: {p.platformCut}%</p>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => updateStatus(p.id, true)} className="bg-green-100 text-green-700 border">Approve</Button>
                <Button onClick={() => updateStatus(p.id, false)} className="bg-red-100 text-red-700 border">Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
