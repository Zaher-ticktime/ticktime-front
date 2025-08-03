import React from "react";
import { Button } from "@/components/ui/button";
import { useSellerReputation } from "@/stores/sellerReputation";

export default function ReportSellerButton() {
  const reportSeller = useSellerReputation((s) => s.reportSeller);

  const handleReport = () => {
    const confirmed = window.confirm("Are you sure you want to file a complaint against this seller?");
    if (confirmed) {
      reportSeller();
      alert("✅ Your complaint has been recorded and sent to the admin.");
    }
  };

  return (
    <Button variant="destructive" onClick={handleReport}>
      🛑 Report Seller
    </Button>
  );
}
