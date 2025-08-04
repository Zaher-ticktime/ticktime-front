
import React, { useState, useEffect } from "react";
import PostUpload from "./PostUpload";
import CommentModal from "./CommentModal";
import DislikeModal from "./DislikeModal";
import ReportModal from "./ReportModal";
import MemeModal from "./MemeModal";
import SendMemeModal from "./SendMemeModal";

const StoryBar = ({ stories }) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3 bg-white border-b border-gray-300 sticky top-12 z-40">
      <button className="flex flex-col items-center text-xs text-gray-600">
        <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-2xl">+</div>
        <span>Add</span>
      </button>
      {stories.map((story, index) => (
        <div key={index} className="flex flex-col items-center text-xs text-gray-800">
          <img src={story.avatar} className="w-14 h-14 rounded-full border-2 border-blue-500" alt={story.username} />
          <span>{story.username}</span>
        </div>
      ))}
    </div>
  );
};

const MobileFeed = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("tick_mobile_posts");
    return saved ? JSON.parse(saved) : [];
  });

  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem("tick_comments") || "{}"));
  const [rewardedComments, setRewardedComments] = useState(() => JSON.parse(localStorage.getItem("tick_rewarded_comments") || "{}"));
  const [likedPosts, setLikedPosts] = useState({});
  const [dislikedPosts, setDislikedPosts] = useState({});
  const [reportedPosts, setReportedPosts] = useState({});
  const [memePowers, setMemePowers] = useState(() => JSON.parse(localStorage.getItem("tick_memes") || "{}"));
  const [tokenStats, setTokenStats] = useState({ comments: 0, likes: 0, dislikes: 0, reports: 0, memes: 0 });

  const [showUpload, setShowUpload] = useState(false);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [activeDislikePost, setActiveDislikePost] = useState(null);
  const [activeReportPost, setActiveReportPost] = useState(null);
  const [activeMemePost, setActiveMemePost] = useState(null);
  const [activeSendMemePost, setActiveSendMemePost] = useState(null);
  const [rewardMessage, setRewardMessage] = useState("");

  const stories = [
    { username: "Ali", avatar: "https://placekitten.com/100/100" },
    { username: "Sara", avatar: "https://placekitten.com/101/100" },
    { username: "Nima", avatar: "https://placekitten.com/102/100" },
  ];

  useEffect(() => localStorage.setItem("tick_mobile_posts", JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem("tick_comments", JSON.stringify(comments)), [comments]);
  useEffect(() => localStorage.setItem("tick_rewarded_comments", JSON.stringify(rewardedComments)), [rewardedComments]);
  useEffect(() => localStorage.setItem("tick_memes", JSON.stringify(memePowers)), [memePowers]);

  const handleAddPost = (newPost) => {
    const fullPost = {
      id: Date.now(),
      username: "You",
      ...newPost
    };
    setPosts([fullPost, ...posts]);
  };

  const handleAddComment = (postId, commentText) => {
    setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), commentText] }));
    if (!rewardedComments[postId]) {
      setRewardedComments(prev => ({ ...prev, [postId]: true }));
      setTokenStats(prev => ({ ...prev, comments: prev.comments + 1 }));
      setRewardMessage("🎉 You earned 2 SilverTICK for commenting!");
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  const handleLike = (postId) => {
    if (!likedPosts[postId]) {
      setLikedPosts(prev => ({ ...prev, [postId]: true }));
      setTokenStats(prev => ({ ...prev, likes: prev.likes + 1 }));
      setRewardMessage("🎉 You earned 1 SilverTICK for liking!");
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  const handleMemeSubmit = (postId, power) => {
    setMemePowers(prev => ({ ...prev, [postId]: (prev[postId] || 0) + power }));
    const reward = Math.floor(power / 500) * 2;
    if (reward > 0) {
      setTokenStats(prev => ({ ...prev, memes: prev.memes + reward }));
      setRewardMessage(`🧠 You earned ${reward} SilverTICK for your meme!`);
      setTimeout(() => setRewardMessage(""), 3000);
    }
  };

  const handleSendMeme = (postId, cost) => {
    setMemePowers(prev => {
      const current = prev[postId] || 0;
      const updated = current - cost;
      const newState = { ...prev };
      if (updated <= 0) delete newState[postId];
      else newState[postId] = updated;
      return newState;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen pb-24">
      <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-50">
        <h1 className="text-xl font-bold">TickTime</h1>
        <button className="text-2xl">☰</button>
      </header>

      <StoryBar stories={stories} />

      <div className="bg-gray-100 px-4 py-2 text-sm text-gray-800 border-b">
        🪙 <strong>Tokens earned:</strong>
        <div className="mt-1 flex gap-4 flex-wrap">
          💬 Comments: {tokenStats.comments} ❤️ Likes: {tokenStats.likes} 👎 Dislikes: {tokenStats.dislikes} 🚩 Reports: {tokenStats.reports} 🤯 Memes: {tokenStats.memes}
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="p-3 border-b">
          <div className="font-semibold mb-2">@{post.username}</div>

          {post.fileType === "image" && post.fileUrl && (
            <img src={post.fileUrl} alt="post" className="w-full h-auto rounded-xl mb-2" />
          )}
          {post.fileType === "video" && post.fileUrl && (
            <video src={post.fileUrl} controls className="w-full h-auto rounded-xl mb-2" />
          )}

          {post.image && !post.fileUrl && (
            <img src={post.image} alt="post" className="w-full h-auto rounded-xl mb-2" />
          )}

          <p className="mb-2 text-sm">{post.text}</p>

          <div className="flex flex-wrap gap-2 text-sm mb-2">
            <button className="text-red-500" onClick={() => handleLike(post.id)}>❤️ Like</button>
            <button className="text-blue-500" onClick={() => setActiveCommentPost(post.id)}>💬 Comment</button>
            <button className="text-yellow-600" onClick={() => setActiveMemePost(post.id)}>🤯 Meme</button>
            <button className="text-green-600" onClick={() => setActiveSendMemePost(post.id)}>🪙 Send Meme</button>
            <button className="text-gray-400" onClick={() => setActiveDislikePost(post.id)}>👎 Dislike</button>
            <button className="text-black" onClick={() => setActiveReportPost(post.id)}>🚩 Report</button>
          </div>

          {memePowers[post.id] && (
            <div className="text-sm text-green-700 font-semibold mb-1">
              ⚡ Meme Power: {memePowers[post.id].toFixed(1)}
            </div>
          )}

          {comments[post.id] && comments[post.id].length > 0 && (
            <div className="mt-2 text-sm text-gray-700">
              <div className="font-semibold mb-1">💬 {comments[post.id].length} Comment(s)</div>
              <ul className="space-y-1">
                {comments[post.id].map((c, idx) => (
                  <li key={idx} className="border-l-2 border-blue-400 pl-2">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <button onClick={() => setShowUpload(true)} className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-xl text-2xl">＋</button>

      {showUpload && <PostUpload onClose={() => setShowUpload(false)} onSubmit={handleAddPost} />}
      {activeCommentPost && <CommentModal postId={activeCommentPost} onClose={() => setActiveCommentPost(null)} onSubmit={handleAddComment} />}
      {activeDislikePost && <DislikeModal postId={activeDislikePost} onClose={() => setActiveDislikePost(null)} onSubmit={() => {}} />}
      {activeReportPost && <ReportModal postId={activeReportPost} onClose={() => setActiveReportPost(null)} onSubmit={() => {}} />}
      {activeMemePost && <MemeModal postId={activeMemePost} onClose={() => setActiveMemePost(null)} onSubmit={handleMemeSubmit} />}
      {activeSendMemePost && (
        <SendMemeModal
          postId={activeSendMemePost}
          onClose={() => setActiveSendMemePost(null)}
          memePower={memePowers[activeSendMemePost] || 0}
          onSend={handleSendMeme}
        />
      )}

      {rewardMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-bounce">
          {rewardMessage}
        </div>
      )}
    </div>
  );
};

export default MobileFeed;



