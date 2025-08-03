import React, { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Navbar from "../components/Navbar";

const GT_RATE = 2.5;

const allItems = [
  {
    name: "Pro Membership",
    image: "https://via.placeholder.com/150",
    basePrice: 100,
    baseDiscount: 20,
    extraDiscount: 10,
    burnRequired: 250,
    acceptsGold: true,
    acceptsCash: true,
    projectOwned: true,
    seasonal: true,
  },
  {
    name: "Exclusive NFT",
    image: "https://via.placeholder.com/150",
    basePrice: 200,
    baseDiscount: 10,
    extraDiscount: 5,
    burnRequired: 150,
    acceptsGold: true,
    acceptsCash: true,
    projectOwned: false,
    seasonal: false,
  },
];

export default function SavedItems() {
  const [saved, setSaved] = useState([]);
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked_items")) || [];
    const filtered = allItems.filter((item) => liked.includes(item.name));
    setSaved(filtered);
  }, []);

  const handlePurchase = async (item, method, price, burned = 0) => {
    const confirmBuy = window.confirm(`Confirm purchase of ${item.name} using ${method}?`);
    if (!confirmBuy) return;
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      item: item.name,
      method,
      price,
      burned,
      createdAt: serverTimestamp(),
    });
    alert(`✅ Purchase successful using ${method}!`);
  };

  const handleBurn = async (item, price) => {
    await addDoc(collection(db, "burns"), {
      userId: user.uid,
      amount: item.burnRequired,
      item: item.name,
      createdAt: serverTimestamp(),
    });
    handlePurchase(item, "Cash + Burn", price, item.burnRequired);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">💖 Saved Items</h2>

        {saved.length === 0 && <p className="text-gray-500">You have no saved items.</p>}

        {saved.map((item, i) => {
          const priceAfterBase = item.basePrice * (1 - item.baseDiscount / 100);
          const priceAfterExtra = priceAfterBase * (1 - item.extraDiscount / 100);
          const tokenEquivalent = (item.basePrice / GT_RATE).toFixed(2);

          return (
            <Card key={i} className="flex flex-col sm:flex-row gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
              <CardContent className="space-y-2 w-full">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                {item.projectOwned && <p className="text-xs text-gray-500 italic">Offered by TickTime Project</p>}
                <p className="text-sm text-gray-600">Base Price: €{item.basePrice}</p>
                <p className="text-sm text-green-600">Discounted: €{priceAfterBase.toFixed(2)}</p>
                {item.extraDiscount > 0 && <p className="text-sm text-indigo-600">Final with Burn: €{priceAfterExtra.toFixed(2)}</p>}
                <p className="text-sm text-yellow-600">GoldenTICK: {tokenEquivalent} GT ≈ €{item.basePrice}</p>

                <div className="flex gap-2 flex-wrap">
                  {item.acceptsCash && (
                    <>
                      <Button onClick={() => handlePurchase(item, "Cash", priceAfterBase)}>Buy with Cash</Button>
                      {item.extraDiscount > 0 && (
                        <Button onClick={() => handleBurn(item, priceAfterExtra)} className="bg-gray-100 border">
                          Burn + Buy with Cash
                        </Button>
                      )}
                    </>
                  )}
                  {item.acceptsGold && (
                    <Button onClick={() => handlePurchase(item, "GoldenTICK", tokenEquivalent)} className="border border-yellow-400 text-yellow-600">
                      Buy with GoldenTICK
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
