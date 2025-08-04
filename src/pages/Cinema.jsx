import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Button from "@/components/Ui/button";
import { Card, CardContent } from "@/components/Ui/card";
import Input from "@/components/Ui/input";

export default function TickCinema() {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cinema_items"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVideos(data);
    });
    const storedLikes = localStorage.getItem("liked_videos");
    if (storedLikes) setLiked(JSON.parse(storedLikes));
    const storedDislikes = localStorage.getItem("disliked_videos");
    if (storedDislikes) setDisliked(JSON.parse(storedDislikes));
  }, []);

  const handleLike = (vid) => {
    if (liked.includes(vid.id)) return alert("Already liked.");
    setLiked((prev) => {
      const updated = [...prev, vid.id];
      localStorage.setItem("liked_videos", JSON.stringify(updated));
      return updated;
    });
    alert("👍 Liked! +1 SilverTICK");
  };

  const handleDislike = (vid) => {
    if (disliked.includes(vid.id)) return alert("Already disliked.");
    setDisliked((prev) => {
      const updated = [...prev, vid.id];
      localStorage.setItem("disliked_videos", JSON.stringify(updated));
      return updated;
    });
    alert("👎 Disliked.");
  };

  const handleWatch = async (vid) => {
    alert("🎬 Watched! +3 SilverTICK");
    await addDoc(collection(db, "cinema_views"), {
      userId: user.uid,
      videoId: vid.id,
      watchedAt: serverTimestamp(),
      reward: 3,
    });
  };

  const handleSubmitComment = async (vid) => {
    if (!newComment.trim()) return;
    await addDoc(collection(db, "cinema_comments"), {
      userId: user.uid,
      videoId: vid.id,
      text: newComment,
      createdAt: serverTimestamp(),
    });
    alert("💬 Comment submitted. +1 SilverTICK");
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🎥 TickCinema</h2>

        {videos.length === 0 && <p className="text-gray-500">No videos available.</p>}

        {videos.map((vid) => (
          <Card key={vid.id}>
            <CardContent className="space-y-2">
              <video
                controls
                src={vid.url}
                className="w-full max-h-96 rounded"
                onPlay={() => handleWatch(vid)}
              />
              <h3 className="text-lg font-semibold">{vid.title}</h3>
              <p className="text-sm text-gray-600">{vid.description}</p>
              <div className="flex gap-2">
                <Button onClick={() => handleLike(vid)}>👍 Like</Button>
                <Button onClick={() => handleDislike(vid)} className="bg-red-100 text-red-600">👎 Dislike</Button>
              </div>
              <div className="text-xs text-gray-500">+3 for watch, +1 for like, comment</div>
              <div className="pt-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={() => handleSubmitComment(vid)} className="mt-1">💬 Submit Comment</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

