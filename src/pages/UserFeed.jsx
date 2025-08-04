// UserFeed.jsx نسخه کامل شده با امکانات اقتصادی
import React, { useState, useEffect } from "react";
import StoryBar from "../components/StoryBar";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

const mockPosts = [
  {
    id: "post1",
    author: "Ali",
    content: "Check out this new update!",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: "post2",
    author: "Mina",
    content: "Feeling great today 💫",
    image: "https://via.placeholder.com/400x200",
  },
];

export default function UserFeed() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [reportedPosts, setReportedPosts] = useState([]);

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) return;
    setLikedPosts([...likedPosts, postId]);
    toast.success("+1 SilverTICK for Like 💖");
  };

  const handleDislike = (postId) => {
    if (dislikedPosts.includes(postId)) return;
    setDislikedPosts([...dislikedPosts, postId]);
    toast("Disliked. No reward unless justified.");
  };

  const handleSave = (postId) => {
    if (savedPosts.includes(postId)) return;
    setSavedPosts([...savedPosts, postId]);
    toast.success("Post saved 💾");
  };

  const handleShare = (postId) => {
    if (sharedPosts.includes(postId)) return;
    setSharedPosts([...sharedPosts, postId]);
    toast.success("+3 SilverTICK for Share 🔁");
  };

  const handleReport = (postId) => {
    if (reportedPosts.includes(postId)) return;
    const reason = prompt("Why are you reporting this post?");
    if (!reason || reason.length < 3) {
      toast.error("Report not submitted. Reason required.");
      return;
    }
    setReportedPosts([...reportedPosts, postId]);
    toast.success("Thanks for reporting. We'll review it 🚩");
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📣 Feed Loaded</h2>

      <Navbar />
      <div className="p-4 max-w-xl mx-auto">
        <StoryBar />

        {mockPosts.map((post) => (
          <div key={post.id} className="mb-4 bg-white shadow rounded p-3">
            <img src={post.image} alt="post" className="rounded mb-2" />
            <h3 className="font-semibold">{post.author}</h3>
            <p className="mb-2">{post.content}</p>

            <div className="flex gap-2 flex-wrap text-sm">
              <button onClick={() => handleLike(post.id)}>👍 Like</button>
              <button onClick={() => handleDislike(post.id)}>👎 Dislike</button>
              <button onClick={() => handleSave(post.id)}>💾 Save</button>
              <button onClick={() => handleShare(post.id)}>🔁 Share</button>
              <button onClick={() => handleReport(post.id)}>🚩 Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


