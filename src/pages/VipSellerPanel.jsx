import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Input from "@/components/Ui/input";
import Button from "@/components/Ui/button";
import { Card, CardContent } from "@/components/Ui/card";

export default function VipSellerPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    basePrice: "",
    baseDiscount: "0",
    extraDiscount: "0",
    burnRequired: "0",
    acceptsCash: true,
    acceptsGold: true,
    vip: true,
    projectOwned: false,
  });
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-vip" };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "vip_items"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data()).filter(i => i.sellerId === user.uid);
      setItems(data);
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAddItem = async () => {
    if (!form.name || !form.image || !form.basePrice) return alert("Please fill in all required fields.");
    await addDoc(collection(db, "vip_items"), {
      ...form,
      sellerId: user.uid,
      basePrice: parseFloat(form.basePrice),
      baseDiscount: parseFloat(form.baseDiscount),
      extraDiscount: parseFloat(form.extraDiscount),
      burnRequired: parseInt(form.burnRequired),
      createdAt: serverTimestamp(),
    });
    alert("✅ Item added to TickMarket!");
    setForm({
      name: "",
      image: "",
      basePrice: "",
      baseDiscount: "0",
      extraDiscount: "0",
      burnRequired: "0",
      acceptsCash: true,
      acceptsGold: true,
      vip: true,
      projectOwned: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">👑 VIP Seller Panel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Item Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Image URL" name="image" value={form.image} onChange={handleChange} />
          <Input label="Base Price (€)" name="basePrice" value={form.basePrice} onChange={handleChange} />
          <Input label="Base Discount %" name="baseDiscount" value={form.baseDiscount} onChange={handleChange} />
          <Input label="Extra Discount %" name="extraDiscount" value={form.extraDiscount} onChange={handleChange} />
          <Input label="Burn Required (SilverTICK)" name="burnRequired" value={form.burnRequired} onChange={handleChange} />
          <label><input type="checkbox" name="acceptsCash" checked={form.acceptsCash} onChange={handleChange} /> Accepts Cash</label>
          <label><input type="checkbox" name="acceptsGold" checked={form.acceptsGold} onChange={handleChange} /> Accepts GoldenTICK</label>
        </div>

        <Button onClick={handleAddItem} className="mt-4">➕ Add Item</Button>

        <h3 className="text-lg font-semibold pt-6">🧾 Your Items</h3>
        {items.length === 0 && <p className="text-gray-500">You have no items listed yet.</p>}

        {items.map((item, i) => (
          <Card key={i}>
            <CardContent className="space-y-1">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm">Price: €{item.basePrice}</p>
              <p className="text-xs text-gray-600">Cash: {item.acceptsCash ? "✔️" : "❌"} | Gold: {item.acceptsGold ? "✔️" : "❌"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
