// src/components/CommentModal.jsx

import React, { useState } from "react";

const CommentModal = ({ postId, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(postId, comment.trim());
      setComment("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-3">Write a comment</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment..."
          className="w-full p-2 border rounded mb-3"
        ></textarea>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
