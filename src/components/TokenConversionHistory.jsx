import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const history = [
  { type: "Silver → Golden", amount: 1000, result: "✅ Success", date: "2024-07-01 09:23" },
  { type: "Golden → Diamond", amount: 1000, result: "✅ Success", date: "2024-04-01 10:00" },
  { type: "Silver → Golden", amount: 500, result: "❌ Failed", date: "2024-01-01 08:12" },
];

export default function TokenConversionHistory() {
  return (
    <Card>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">🔁 Token Conversion History</h3>
        {history.map((item, i) => (
          <div key={i} className="text-sm border-b py-2">
            <p><strong>{item.type}</strong> — {item.amount} TICK</p>
            <p className="text-gray-500">{item.date} · {item.result}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}