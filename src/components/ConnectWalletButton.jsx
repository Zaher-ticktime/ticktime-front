import React from "react";
import { Button } from "@/components/ui/button";
import { useBlockchain } from "@/stores/useBlockchain";

export default function ConnectWalletButton() {
  const { address, connected, connect, disconnect } = useBlockchain();

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <>
          <span className="text-sm text-green-600">🟢 Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
          <Button variant="outline" onClick={disconnect}>Disconnect</Button>
        </>
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </div>
  );
}
