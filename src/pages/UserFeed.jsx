
import React, { useState, useEffect } from "react";
import StoryPanel from "../components/StoryPanel";
import PostUpload from "../components/PostUpload";
import PostCard from "../components/PostCard";

const UserFeed = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("tick_desktop_posts");
    return saved ? JSON.parse(saved) : [];
  });

  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem("tick_comments") || "{}"));
  const [rewardedComments, setRewardedComments] = useState(() => JSON.parse(localStorage.getItem("tick_rewarded_comments") || "{}"));
  const [likedPosts, setLikedPosts] = useState(() => JSON.parse(localStorage.getItem("tick_likes") || "{}"));
  const [dislikedPosts, setDislikedPosts] = useState(() => JSON.parse(localStorage.getItem("tick_dislikes") || "{}"));
  const [memePowers, setMemePowers] = useState(() => JSON.parse(localStorage.getItem("tick_memes") || "{}"));
  const [rewardMessage, setRewardMessage] = useState("");

  useEffect(() => localStorage.setItem("tick_desktop_posts", JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem("tick_comments", JSON.stringify(comments)), [comments]);
  useEffect(() => localStorage.setItem("tick_rewarded_comments", JSON.stringify(rewardedComments)), [rewardedComments]);
  useEffect(() => localStorage.setItem("tick_likes", JSON.stringify(likedPosts)), [likedPosts]);
  useEffect(() => localStorage.setItem("tick_dislikes", JSON.stringify(dislikedPosts)), [dislikedPosts]);
  useEffect(() => localStorage.setItem("tick_memes", JSON.stringify(memePowers)), [memePowers]);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim()) return;
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));

    if (!rewardedComments[postId]) {
      setRewardedComments(prev => ({ ...prev, [postId]: true }));
      setRewardMessage("🎉 You earned 2 SilverTICK for commenting!");
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  const handleLike = (postId) => {
    if (!likedPosts[postId]) {
      setLikedPosts(prev => ({ ...prev, [postId]: true }));
      setRewardMessage("🎉 You earned 1 SilverTICK for liking!");
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  const handleDislike = (postId) => {
    if (!dislikedPosts[postId]) {
      setDislikedPosts(prev => ({ ...prev, [postId]: true }));
      setRewardMessage("👎 Dislike registered (no reward unless justified)");
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  const handleSendMeme = (postId, power = 500) => {
    const reward = Math.floor(power / 500) * 2;
    setMemePowers(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + power
    }));
    if (reward > 0) {
      setRewardMessage(`🧠 You earned ${reward} SilverTICK for sending a meme!`);
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-2xl mx-auto px-4 pb-24">
        <StoryPanel />
        <div className="my-4">
          <PostUpload onUpload={handleNewPost} />
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No posts yet...</p>
        )}

        {posts.map((post) => (
          <div key={post.id} className="mb-6">
            <PostCard
              post={post}
              onLike={() => handleLike(post.id)}
              onDislike={() => handleDislike(post.id)}
              onComment={(id, text) => handleComment(id, text)}
              onSendMeme={() => handleSendMeme(post.id)}
            />

            {memePowers[post.id] && (
              <p className="text-sm text-green-700 font-semibold px-2 mt-1">
                ⚡ Meme Power: {memePowers[post.id].toFixed(1)}
              </p>
            )}

            {comments[post.id] && comments[post.id].length > 0 && (
              <div className="mt-2 text-sm text-gray-700 px-2">
                <div className="font-semibold mb-1">💬 {comments[post.id].length} comment(s)</div>
                <ul className="space-y-1">
                  {comments[post.id].map((c, idx) => (
                    <li key={idx} className="border-l-2 border-blue-400 pl-2">{c}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3 flex gap-2 px-2">
              <input
                type="text"
                placeholder="Write a comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleComment(post.id, e.target.value);
                }}
                className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        ))}

        {rewardMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-bounce">
            {rewardMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFeed;


