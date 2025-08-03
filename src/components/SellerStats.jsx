import React from "react";
import { useSellerReputation } from "@/stores/sellerReputation";
import { Card, CardContent } from "@/components/ui/card";

export default function SellerStats() {
  const { goldenTICK, diamondLevel, strikeCount } = useSellerReputation();

  return (
    <Card>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">🧾 Seller Reputation</h3>
        <p>💰 Golden TICK: <strong>{goldenTICK}</strong></p>
        <p>❌ Complaints: <strong>{strikeCount}</strong></p>
        <p>💎 Diamond Status: {diamondLevel === 1 ? "Active" : "Revoked"}</p>
      </CardContent>
    </Card>
  );
}
