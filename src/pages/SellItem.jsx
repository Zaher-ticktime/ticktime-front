import React, { useState } from "react";
import { useWalletStore } from "@/stores/walletStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SellItem() {
  const golden = useWalletStore((s) => s.goldenTICK);
  const isVIP = false; // Placeholder for real VIP check
  const canSell = isVIP || golden >= 100;

  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.name && form.price && form.image && form.description) {
      setSubmitted(true);
    }
  };

  if (!canSell) {
    return <div className="p-4 text-center text-red-600">❌ You need to be VIP or have 100+ Golden TICK to sell items.</div>;
  }

  if (submitted) {
    return <div className="p-4 text-green-600 text-center">✅ Your item has been submitted for review and approval.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Sell an Item</h2>
          <Input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} />
          <Input name="price" placeholder="Price (€ or TICK)" value={form.price} onChange={handleChange} />
          <Input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <Textarea name="description" placeholder="Item Description" rows={4} value={form.description} onChange={handleChange} />
          <Button onClick={handleSubmit}>Submit for Approval</Button>
        </CardContent>
      </Card>
    </div>
  );
}
