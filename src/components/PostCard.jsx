import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const PostCard = ({ post, onComment, onLike, onDislike, onSendMeme }) => {
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [rewarded, setRewarded] = useState(false);

  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  const checkBlock = () => {
    const blockedUntil = localStorage.getItem("actionBlockedUntil");
    return blockedUntil && Date.now() < parseInt(blockedUntil);
  };

  const isUnreasonable = (text) => {
    return text.length < 5 || /\b(haha|bad|nonsense|trash|what)\b/i.test(text);
  };

  const updateBadReasonCounter = () => {
    let count = parseInt(localStorage.getItem("badReasons") || "0") + 1;
    localStorage.setItem("badReasons", count);

    if (count === 3) {
      alert("🚫 Due to 3 invalid reasons, you are blocked from this action for 7 days.");
      localStorage.setItem("actionBlockedUntil", Date.now() + 7 * 24 * 60 * 60 * 1000);
    } else if (count === 4) {
      alert("🔥 100 SilverTICK has been burned from your balance for repeated abuse.");
      // Add real burn token logic here
    }
  };

  const handleLike = () => {
    if (!rewarded && !liked && !checkBlock()) {
      onLike(post.id);
      setLiked(true);
      setRewarded(true);
    }
  };

  const handleDislike = () => {
    if (checkBlock()) {
      alert("⛔ You are temporarily blocked from disliking posts.");
      return;
    }
    const reason = prompt("⚠️ Please provide a reason for disliking:");
    if (!reason) {
      alert("❌ No reward without a reason. Dislike recorded silently.");
      return;
    }
    if (isUnreasonable(reason)) {
      updateBadReasonCounter();
      return;
    }
    if (!rewarded && !disliked) {
      onDislike(post.id);
      setDisliked(true);
      setRewarded(true);
      alert("✅ Valid dislike recorded. +5 SilverTICK");
    }
  };

  const handleReport = () => {
    if (checkBlock()) {
      alert("⛔ You are temporarily blocked from reporting.");
      return;
    }
    const reason = prompt("🚩 Please provide a reason for reporting:");
    if (!reason) {
      alert("❌ Report ignored: No reason provided.");
      return;
    }
    if (isUnreasonable(reason)) {
      updateBadReasonCounter();
      return;
    }
    alert("✅ Valid report submitted. +5 SilverTICK");
    // Add real report logic here
  };

  const handleComment = () => {
    if (!rewarded && newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment("");
      setRewarded(true);
    }
  };

  const handleInternalShare = async () => {
    if (localStorage.getItem(`shared_${post.id}`)) {
      alert("🔁 You've already shared this post.");
      return;
    }

    await addDoc(collection(db, "posts"), {
      username: user.uid,
      text: post.text,
      image: post.image,
      sharedFrom: post.username,
      createdAt: serverTimestamp(),
    });

    localStorage.setItem(`shared_${post.id}`, true);
    alert("✅ Post shared to your feed! +3 SilverTICK");
  };

  const handleExternalShare = () => {
    const shareURL = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(shareURL);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <p className="text-sm font-bold text-blue-600">@{post.username}</p>
      {post.sharedFrom && (
        <p className="text-xs text-gray-500 mb-1">🔁 Shared from @{post.sharedFrom}</p>
      )}
      {post.image && (
        <img src={post.image} alt="Post" className="w-full h-auto rounded mt-2 mb-2" />
      )}
      <p className="text-sm text-gray-700 mb-2">{post.text}</p>

      <div className="flex flex-wrap gap-4 text-xl text-gray-600 mb-2">
        <button onClick={handleLike} className={liked ? "text-green-500" : "hover:text-green-500"}>👍</button>
        <button onClick={handleDislike} className={disliked ? "text-red-500" : "hover:text-red-500"}>👎</button>
        <button onClick={handleReport} className="hover:text-red-600">🚩</button>
        <button onClick={() => onSendMeme(post.id)} className="hover:text-yellow-500">⚡</button>
        <button onClick={handleInternalShare} className="hover:text-purple-600">📤 Share to Feed</button>
        <button onClick={handleExternalShare} className="hover:text-blue-600">🌍 Share Outside</button>
      </div>

      <div className="mt-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
        />
        <button
          onClick={handleComment}
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded text-sm"
        >
          Send 💬
        </button>
      </div>
    </div>
  );
};

export default PostCard;

