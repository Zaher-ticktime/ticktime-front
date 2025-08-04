
import React, { useState } from 'react';

const StoryModal = ({ user, story, onClose }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [emojiSent, setEmojiSent] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(true);
    setLiked(false);
  };

  const handleEmoji = () => {
    setEmojiSent(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setCommentsList([...commentsList, comment]);
      setComment("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4 relative text-black">
        <button onClick={onClose} className="absolute top-2 right-2 text-black text-xl font-bold">×</button>
        <div className="flex items-center space-x-2 mb-4">
          <img src={user.profilePic} alt={user.username} className="w-10 h-10 rounded-full" />
          <h3 className="text-md font-semibold">{user.displayName}</h3>
        </div>
        <div className="mb-4">
          {story.type === "image" ? (
            <img src={story.url} alt="story" className="w-full h-64 object-contain rounded" />
          ) : (
            <video src={story.url} controls className="w-full h-64 rounded" />
          )}
        </div>
        <div className="flex justify-around mb-4">
          <button onClick={handleLike} className={`text-lg ${liked ? 'text-red-500' : 'text-gray-500'}`}>❤️</button>
          <button onClick={handleDislike} className={`text-lg ${disliked ? 'text-blue-500' : 'text-gray-500'}`}>👎</button>
          <button onClick={handleEmoji} className={`text-lg ${emojiSent ? 'text-yellow-500' : 'text-gray-500'}`}>😍</button>
        </div>
        <form onSubmit={handleCommentSubmit} className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="نظر بنویس..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">ارسال</button>
        </form>
        <div className="max-h-32 overflow-y-auto border-t pt-2">
          {commentsList.map((c, i) => (
            <p key={i} className="text-sm text-gray-700 mb-1">💬 {c}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryModal;