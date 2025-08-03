// src/components/ReportModal.jsx

import React, { useState } from "react";

const ReportModal = ({ postId, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    const isValid = checkReason(reason);
    onSubmit(postId, isValid);
    onClose();
  };

  const checkReason = (text) => {
    const keywords = ["abuse", "spam", "violence", "fake", "harassment", "hate"];
    const lower = text.toLowerCase();
    return keywords.some((word) => lower.includes(word));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-3">Why are you reporting this post?</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Type your reason (e.g. spam, violence, fake...)"
          className="w-full p-2 border rounded mb-3"
        ></textarea>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-1 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
