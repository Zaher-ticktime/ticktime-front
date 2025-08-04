import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/Ui/card";

export default function MirrorAnswersAdmin() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "mirror_answers"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAnswers(data);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">📊 MirrorRoom Answers</h2>

        {answers.length === 0 && <p className="text-gray-500">No answers submitted yet.</p>}

        {answers.map((a) => (
          <Card key={a.id}>
            <CardContent className="space-y-1">
              <p className="text-sm text-gray-600">Project ID: {a.projectId}</p>
              <p className="text-sm text-gray-600">Anonymous: {a.anonymousProfile || "N/A"}</p>
              <p className="text-sm text-gray-800">{a.response}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
