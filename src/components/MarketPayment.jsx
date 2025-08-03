import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";

export default function MarketPayment({ price = 100, goldOnly = false, silverRequired = 0, extraDiscount = 0 }) {
  const silver = useWalletStore((s) => s.silverTICK);
  const golden = useWalletStore((s) => s.goldenTICK);
  const updateSilver = useWalletStore((s) => s.addSilver);
  const updateGolden = useWalletStore((s) => s.addGolden);

  const [paid, setPaid] = useState(false);
  const [usedToken, setUsedToken] = useState(false);

  const finalPrice = usedToken && silver >= silverRequired
    ? price * (1 - extraDiscount / 100)
    : price;

  const handlePayWithCash = () => {
    setPaid(true);
  };

  const handleUseSilver = () => {
    if (silver >= silverRequired) {
      updateSilver(-silverRequired);
      setUsedToken(true);
    }
  };

  const handlePayWithGold = () => {
    if (golden >= price) {
      updateGolden(-price);
      setPaid(true);
    }
  };

  if (paid) return <div className="text-green-600">✅ Payment successful! Your item has been activated.</div>;

  return (
    <div className="space-y-2">
      {!goldOnly && (
        <>
          <p>💶 Cash Price: <strong>€{finalPrice.toFixed(2)}</strong></p>
          {extraDiscount > 0 && !usedToken && silver >= silverRequired && (
            <Button onClick={handleUseSilver}>🔥 Apply extra {extraDiscount}% discount (Burn {silverRequired} Silver TICK)</Button>
          )}
          <Button onClick={handlePayWithCash}>Pay with Cash</Button>
        </>
      )}

      {!goldOnly && <div className="text-center text-gray-500">— or —</div>}

      <Button variant="outline" onClick={handlePayWithGold} disabled={golden < price}>
        🥇 Pay with Golden TICK ({price} TICK)
      </Button>
    </div>
  );
}