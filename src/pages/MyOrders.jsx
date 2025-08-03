import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent } from "@/components/Ui/card";
import Navbar from "../components/Navbar";
import Button from "@/components/Ui/button";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((o) => o.userId === user.uid);
      setOrders(data);
    });
    return () => unsub();
  }, []);

  const handleCancelRequest = async (order) => {
    const confirm = window.confirm("Do you want to request cancellation for this order?");
    if (!confirm) return;

    await addDoc(collection(db, "cancel_requests"), {
      userId: user.uid,
      orderId: order.id,
      item: order.item,
      method: order.method,
      reason: "User requested cancellation via dashboard.",
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("📩 Your cancellation request has been received. Our team will review it and contact you via email.");
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">🧾 My Orders</h2>

        <div className="flex gap-2 text-sm">
          <Button onClick={() => setFilter("all")} className={filter === "all" ? "bg-cyan-500 text-white" : "bg-white border"}>All</Button>
          <Button onClick={() => setFilter("pending")} className={filter === "pending" ? "bg-cyan-500 text-white" : "bg-white border"}>Pending</Button>
          <Button onClick={() => setFilter("approved")} className={filter === "approved" ? "bg-cyan-500 text-white" : "bg-white border"}>Approved</Button>
          <Button onClick={() => setFilter("rejected")} className={filter === "rejected" ? "bg-cyan-500 text-white" : "bg-white border"}>Rejected</Button>
        </div>

        {filteredOrders.length === 0 && <p className="text-gray-500">No orders found for this status.</p>}

        {filteredOrders.map((order, i) => (
          <Card key={order.id}>
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">{order.item}</h3>
              <p className="text-sm text-gray-600">Method: {order.method}</p>
              <p className="text-sm">Price: €{order.price}</p>
              {order.burned > 0 && (
                <p className="text-sm text-red-500">Burned: {order.burned} SilverTICK</p>
              )}
              <p className="text-sm font-medium text-gray-700">Status: {order.status || "pending"}</p>
              <div className="pt-2">
                <Button
                  onClick={() => handleCancelRequest(order)}
                  className="bg-yellow-100 text-yellow-800 border border-yellow-300"
                >
                  Request Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

