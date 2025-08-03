import React from "react";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";
import { useSeasonalWindow } from "@/stores/useSeasonalWindow";

export default function ConvertSilverToGold() {
  const silver = useWalletStore((s) => s.silverTICK);
  const addSilver = useWalletStore((s) => s.addSilver);
  const addGold = useWalletStore((s) => s.addGolden);
  const conversionAllowed = useSeasonalWindow((s) => s.getConversionStatus());

  const handleConvert = () => {
    if (silver >= 1000) {
      addSilver(-1000);
      addGold(1);
      alert("✅ You converted 1000 Silver TICK to 1 Golden TICK");
    } else {
      alert("❌ Not enough Silver TICK to convert.");
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleConvert} disabled={!conversionAllowed}>
        🔄 Convert 1000 Silver → 1 Golden TICK
      </Button>
      {!conversionAllowed && <p className="text-sm text-red-600">⏳ Conversion is only allowed during campaign or the first 24h of each season.</p>}
    </div>
  );
}
