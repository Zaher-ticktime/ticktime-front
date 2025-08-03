import React, { useEffect, useState } from "react";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent } from "@/components/Ui/card";
import Navbar from "../components/Navbar";
import Button from "@/components/Ui/button";

export default function AdminCancelPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cancel_requests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    });
    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "cancel_requests", id), {
      status,
      reviewedAt: new Date().toISOString(),
    });
    alert(`✅ Request ${status}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🛠 Cancel Request Management</h2>

        {requests.length === 0 && <p className="text-gray-500">No cancellation requests found.</p>}

        {requests.map((r) => (
          <Card key={r.id}>
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">{r.item}</h3>
              <p className="text-sm">User ID: {r.userId}</p>
              <p className="text-sm text-gray-600">Method: {r.method}</p>
              <p className="text-sm">Status: <span className={`font-semibold ${r.status === "pending" ? "text-yellow-500" : r.status === "approved" ? "text-green-600" : "text-red-600"}`}>{r.status}</span></p>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => updateStatus(r.id, "approved")} className="bg-green-100 text-green-800 border border-green-300">Approve</Button>
                <Button onClick={() => updateStatus(r.id, "rejected")} className="bg-red-100 text-red-700 border border-red-300">Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
