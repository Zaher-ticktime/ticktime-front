import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Button from "@/components/Ui/button";
import Input from "@/components/Ui/input";

export default function MirrorRoom() {
  const [projects, setProjects] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    rewardPerAnswer: "5",
    maxParticipants: "50",
    vipRevenue: "1000",
    platformCut: 30
  });
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user", isVIP: true, balance: { silver: 2000 } };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "mirror_projects"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    });
    fetchSubmittedAnswers();
    return () => unsub();
  }, []);

  const fetchSubmittedAnswers = async () => {
    const q = query(collection(db, "mirror_answers"), where("userId", "==", user.uid));
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => doc.data());
    const result = {};
    data.forEach((a) => {
      result[a.projectId] = true;
    });
    setSubmitted(result);
  };

  const handleChange = (projectId, value) => {
    setAnswers((prev) => ({ ...prev, [projectId]: value }));
  };

  const handleSubmit = async (projectId) => {
    if (!answers[projectId] || answers[projectId].trim().length < 5) {
      return alert("Please write a meaningful response (at least 5 characters).");
    }
    if (submitted[projectId]) return alert("You've already submitted for this project.");

    await addDoc(collection(db, "mirror_answers"), {
      userId: user.uid,
      projectId,
      response: answers[projectId],
      anonymousProfile: `anon_${Math.floor(Math.random() * 100000)}`,
      createdAt: serverTimestamp(),
    });
    setSubmitted((prev) => ({ ...prev, [projectId]: true }));
    alert("✅ Response submitted anonymously. +5 SilverTICK");
  };

  const handleProjectUpload = async () => {
    if (!form.title || !form.description) return alert("Please fill in all fields.");
    await addDoc(collection(db, "mirror_projects"), {
      ...form,
      createdBy: user.uid,
      approved: false,
      rewardPerAnswer: parseInt(form.rewardPerAnswer),
      maxParticipants: parseInt(form.maxParticipants),
      expectedPayout: parseInt(form.rewardPerAnswer) * parseInt(form.maxParticipants),
      vipRevenue: parseInt(form.vipRevenue),
      platformCut: parseInt(form.platformCut),
      createdAt: serverTimestamp(),
    });
    alert("✅ Project submitted for review.");
    setForm({
      title: "",
      description: "",
      rewardPerAnswer: "5",
      maxParticipants: "50",
      vipRevenue: "1000",
      platformCut: 30
    });
  };

  if (user.balance.silver < 1700) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 text-center text-red-600 font-semibold">
        ❌ You need at least 1700 SilverTICK to enter the MirrorRoom.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🪞 MirrorRoom</h2>
        <p className="text-gray-600 text-sm">
          Answer anonymously. Your insight helps improve the network and rewards you with tokens.
        </p>

        {user.isVIP && (
          <div className="bg-white p-4 rounded shadow space-y-3">
            <h3 className="text-lg font-semibold">📤 Upload a Project (VIP Only)</h3>
            <Input placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Reward per Answer" value={form.rewardPerAnswer} onChange={(e) => setForm({ ...form, rewardPerAnswer: e.target.value })} />
            <Input placeholder="Max Participants" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })} />
            <Input placeholder="Revenue from Client (e.g. 1000)" value={form.vipRevenue} onChange={(e) => setForm({ ...form, vipRevenue: e.target.value })} />
            <Input placeholder="Platform Share (%)" value={form.platformCut} onChange={(e) => setForm({ ...form, platformCut: e.target.value })} />
            <Button onClick={handleProjectUpload}>Submit for Review</Button>
          </div>
        )}

        {projects.length === 0 && <p className="text-gray-500">No projects available right now.</p>}

        {projects.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow space-y-2">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            {!submitted[p.id] ? (
              <>
                <Input
                  placeholder="Your answer (anonymous)"
                  value={answers[p.id] || ""}
                  onChange={(e) => handleChange(p.id, e.target.value)}
                />
                <Button onClick={() => handleSubmit(p.id)} className="mt-2">Submit</Button>
              </>
            ) : (
              <p className="text-green-600 text-sm">✅ Response submitted. Thank you!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

