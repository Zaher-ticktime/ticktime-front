import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent } from "@/components/Ui/card";
import Button from "@/components/Ui/button";
import Input from "@/components/Ui/input";
import Navbar from "../components/Navbar";

const GT_RATE = 2.5;

const projectItems = [
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

export default function TickMarket() {
  const [query, setQuery] = useState("");
  const [likedItems, setLikedItems] = useState([]);
  const [vipItems, setVipItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const stored = localStorage.getItem("liked_items");
    if (stored) {
      setLikedItems(JSON.parse(stored));
    }
    loadVipItems();
  }, []);

  const loadVipItems = async () => {
    const snap = await getDocs(collection(db, "vip_items"));
    const data = snap.docs.map((doc) => doc.data());
    setVipItems(data);
  };

  const handleLike = (itemName) => {
    let updated;
    if (likedItems.includes(itemName)) {
      updated = likedItems.filter((n) => n !== itemName);
    } else {
      updated = [...likedItems, itemName];
    }
    setLikedItems(updated);
    localStorage.setItem("liked_items", JSON.stringify(updated));
  };

  const allItems = [...projectItems, ...vipItems];
  const filtered = allItems.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));

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
      status: "pending",
    });
    alert(`✅ Purchase successful using ${method}!`);
  };

  const handleBurn = async (item, price, label) => {
    await addDoc(collection(db, "burns"), {
      userId: user.uid,
      item: item.name,
      amount: item.burnRequired,
      createdAt: serverTimestamp(),
    });
    handlePurchase(item, label, price, item.burnRequired);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🛒 TickMarket</h2>

        <Input
          placeholder="Search items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-1/2"
        />

        {filtered.map((item, i) => {
          const priceAfterBase = item.basePrice * (1 - item.baseDiscount / 100);
          const priceAfterExtra = priceAfterBase * (1 - item.extraDiscount / 100);
          const tokenEquivalent = (item.basePrice / GT_RATE).toFixed(2);

          return (
            <Card key={i} className="flex flex-col sm:flex-row gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
              <CardContent className="space-y-2 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <button onClick={() => handleLike(item.name)}>
                    {likedItems.includes(item.name) ? "💖" : "🤍"}
                  </button>
                </div>
                {item.projectOwned && <p className="text-xs text-gray-500 italic">Offered by TickTime Project</p>}
                {item.vip && !item.projectOwned && <p className="text-xs text-purple-600 italic">Sold by VIP Seller</p>}
                <p className="text-sm text-gray-600">Base Price: €{item.basePrice}</p>
                <p className="text-sm text-green-600">Base Discount: {item.baseDiscount}% → €{priceAfterBase.toFixed(2)}</p>
                {item.extraDiscount > 0 && (
                  <p className="text-sm text-indigo-600">
                    Extra {item.extraDiscount}% off with burning {item.burnRequired} SilverTICK → Final: €{priceAfterExtra.toFixed(2)}
                  </p>
                )}
                <p className="text-sm text-yellow-600">GoldenTICK Option: {tokenEquivalent} GT ≈ €{item.basePrice}</p>
                {item.seasonal && <p className="text-sm text-orange-600">🔥 Seasonal Bonus Active</p>}

                <div className="flex gap-2 flex-wrap">
                  {item.acceptsCash && (
                    <>
                      <Button onClick={() => handlePurchase(item, "Cash", priceAfterBase)}>Buy with Cash</Button>
                      {item.extraDiscount > 0 && (
                        <Button onClick={() => handleBurn(item, priceAfterExtra, "Cash + Burn")} className="bg-gray-100 border">
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


