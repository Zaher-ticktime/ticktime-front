import React from "react";
import { usePurchaseHistory } from "@/stores/purchaseHistory";
import { Card, CardContent } from "@/components/Ui/card";
import  Badge from "../components/Ui/Badge"; // ✅ این حتماً کار می‌کنه



export default function MyPurchases() {
  const purchases = usePurchaseHistory((state) => state.purchases);

  if (purchases.length === 0) {
    return <div className="p-4 text-center text-gray-500">You haven't purchased anything yet.</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">My Purchase History</h2>
      {purchases.map((item, index) => (
        <Card key={index}>
          <CardContent className="space-y-1">
            <p><strong>Item:</strong> {item.name}</p>
            <p><strong>Paid:</strong> {item.price} {item.currency}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
            <Badge variant="success">✅ Activated</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
