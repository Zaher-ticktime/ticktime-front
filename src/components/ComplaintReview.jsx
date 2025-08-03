import React, { useState } from "react";
import { useSellerReputation } from "@/stores/sellerReputation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialComplaints = [
  { id: 1, seller: "user123", reason: "Did not deliver product", reviewed: false },
  { id: 2, seller: "user456", reason: "Sent wrong item", reviewed: false },
];

export default function ComplaintReview() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const update = useSellerReputation((s) => s.reportSeller);

  const handleApprove = (id) => {
    update();
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, reviewed: true } : c)));
  };

  const handleDismiss = (id) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, reviewed: true } : c)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">🚨 Complaint Review Panel</h2>
      {complaints.map((c) => (
        <Card key={c.id} className={c.reviewed ? "opacity-50" : ""}>
          <CardContent className="space-y-1">
            <p><strong>Seller:</strong> {c.seller}</p>
            <p><strong>Reason:</strong> {c.reason}</p>
            <div className="flex gap-2 mt-2">
              {!c.reviewed && <Button onClick={() => handleApprove(c.id)} variant="destructive">✅ Confirm Violation</Button>}
              {!c.reviewed && <Button onClick={() => handleDismiss(c.id)} variant="outline">Dismiss</Button>}
              {c.reviewed && <p className="text-sm text-green-700">Reviewed</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
