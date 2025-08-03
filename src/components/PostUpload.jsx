// src/components/PostUpload.jsx

import React, { useState } from "react";

const PostUpload = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (text && fileUrl) {
      onSubmit({ text, image: fileUrl });
      setText("");
      setFileUrl("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-3">Create New Post</h2>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mb-3"
        />
        {fileUrl && (
          <img
            src={fileUrl}
            alt="preview"
            className="w-full h-auto rounded mb-3"
          />
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
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
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
