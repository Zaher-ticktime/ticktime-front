import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent } from "@/components/Ui/card";
import Input from "@/components/Ui/input";
import Navbar from "../components/Navbar";

export default function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [rewarded, setRewarded] = useState(false);
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "user_videos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter(v => v.userId === user.uid);
      setVideos(data);
    });
    return () => unsub();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      await addDoc(collection(db, "user_videos"), {
        userId: user.uid,
        video: reader.result,
        createdAt: serverTimestamp(),
      });
      if (!rewarded) {
        alert("🎁 +2 SilverTICK for uploading your first video!");
        setRewarded(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleShare = async (video, index) => {
    if (localStorage.getItem(`shared_video_${index}`)) {
      alert("🔁 You've already shared this video.");
      return;
    }

    await addDoc(collection(db, "posts"), {
      username: user.uid,
      text: "Shared from My Videos",
      video: video.video,
      createdAt: serverTimestamp(),
    });

    localStorage.setItem(`shared_video_${index}`, true);
    alert("✅ Video shared to your feed! +1 SilverTICK");
  };

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "user_videos", videoId));
    alert("🗑 Video deleted successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">🎞️ My Videos</h2>
        <Input type="file" accept="video/*" onChange={handleUpload} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((v, index) => (
            <Card key={v.id}>
              <CardContent className="p-2">
                <video controls className="rounded w-full h-48 object-cover">
                  <source src={v.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="flex justify-between mt-2 text-sm">
                  <button
                    onClick={() => handleShare(v, index)}
                    className="text-purple-600 hover:underline"
                  >📤 Share</button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="text-red-500 hover:underline"
                  >🗑 Delete</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

