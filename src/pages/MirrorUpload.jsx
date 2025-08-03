import React, { useState } from "react";
import  Card, {CardContent } from "@/components/ui/card";
import Input  from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import  Button  from "@/components/ui/button";

export default function MirrorUpload() {
  const isVIP = true; // Placeholder for actual VIP check
  const [form, setForm] = useState({ title: "", reward: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.title && form.reward && form.description) {
      setSubmitted(true);
    }
  };

  if (!isVIP) {
    return <div className="p-4 text-center text-red-600">❌ Only VIP users can upload projects to Mirror Room.</div>;
  }

  if (submitted) {
    return <div className="p-4 text-green-600 text-center">✅ Project submitted for review. You'll be notified upon approval.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">📤 Upload Mirror Room Project</h2>
          <Input name="title" placeholder="Project Title" value={form.title} onChange={handleChange} />
          <Input name="reward" placeholder="Reward per response (Silver TICK)" value={form.reward} onChange={handleChange} />
          <Textarea name="description" placeholder="Project Description / Questions Summary" rows={4} value={form.description} onChange={handleChange} />
          <Button onClick={handleSubmit}>Submit for Review</Button>
        </CardContent>
      </Card>
    </div>
  );
}
