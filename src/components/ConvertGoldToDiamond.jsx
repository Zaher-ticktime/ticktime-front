import React from "react";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";
import { useDiamondConvertControl } from "@/stores/useDiamondConvertControl";

export default function ConvertGoldToDiamond() {
  const gold = useWalletStore((s) => s.goldenTICK);
  const addGold = useWalletStore((s) => s.addGolden);
  const addDiamond = useWalletStore((s) => s.addDiamond || (() => {}));
  const isAllowed = useDiamondConvertControl((s) => s.isAllowed());

  const handleConvert = () => {
    if (gold >= 1000) {
      addGold(-1000);
      addDiamond(1);
      alert("✅ You converted 1000 Golden TICK to 1 Diamond TICK");
    } else {
      alert("❌ Not enough Golden TICK to convert.");
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleConvert} disabled={!isAllowed}>
        💎 Convert 1000 Golden → 1 Diamond TICK
      </Button>
      {!isAllowed && <p className="text-sm text-red-600">⛔ Conversion is not available. Only enabled by the project.</p>}
    </div>
  );
}
