import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Users, ImageIcon, Video, MessageCircle, Store, ShieldCheck, Film } from "lucide-react";
import { useWalletStore } from "@/stores/walletStore";

export default function UserDashboard() {
  const silver = useWalletStore((state) => state.silverTICK);
  const golden = useWalletStore((state) => state.goldenTICK);
  const navigate = useNavigate();

  const openExternal = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mt-8 space-y-6">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div>
            <p>Silver TICK: <strong>{silver}</strong></p>
            <p>Golden TICK: <strong>{golden}</strong></p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => openExternal("https://chat.ticktime.app")}> <MessageCircle className="h-4 w-4" /> Chatroom</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/mirror")}> <ShieldCheck className="h-4 w-4" /> Mirror Room</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => openExternal("https://market.ticktime.app")}> <Store className="h-4 w-4" /> TickMarket</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/wallet")}> <Wallet className="h-4 w-4" /> Connect Wallet</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/friends")}> <Users className="h-4 w-4" /> Friends</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/my-photos")}> <ImageIcon className="h-4 w-4" /> My Photos</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/my-videos")}> <Video className="h-4 w-4" /> My Videos</Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => openExternal("https://cinema.ticktime.app")}> <Film className="h-4 w-4" /> TickTime Cinema</Button>
        </CardContent>
      </Card>
    </div>
  );
}
