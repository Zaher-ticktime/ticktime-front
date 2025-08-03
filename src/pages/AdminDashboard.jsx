import React from "react";
import ComplaintReview from "./ComplaintReview";
import SellerStats from "@/components/SellerStats";
import BadSellerList from "@/components/BadSellerList";

export default function AdminDashboard() {
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">🛠️ Admin Dashboard</h2>

      <div className="space-y-4">
        <SellerStats />
        <ComplaintReview />
        <BadSellerList />
      </div>
    </div>
  );
}
