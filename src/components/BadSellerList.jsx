import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const blacklistedSellers = [
  { username: "user123", strikes: 3, goldenTICK: 80, diamond: false },
  { username: "user456", strikes: 4, goldenTICK: 40, diamond: false },
];

export default function BadSellerList() {
  return (
    <Card>
      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold text-red-600">🚫 Blacklisted Sellers</h3>
        {blacklistedSellers.map((s, i) => (
          <div key={i} className="border-b pb-2 text-sm">
            <p><strong>Seller:</strong> {s.username}</p>
            <p><strong>Confirmed Complaints:</strong> {s.strikes}</p>
            <p><strong>Golden TICK Left:</strong> {s.goldenTICK}</p>
            <p><strong>Diamond Status:</strong> {s.diamond ? "Active" : "Revoked"}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
