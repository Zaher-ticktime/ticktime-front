import React, { useState } from "react";

const SendMemeModal = ({ postId, onClose, memePower, onSend }) => {
  const [confirming, setConfirming] = useState(false);

  const handleSend = () => {
    if (memePower <= 0) return;
    setConfirming(true);
    onSend(postId, 0.5);
    setTimeout(() => {
      setConfirming(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Send Meme</h2>
        <p className="text-sm text-gray-600 mb-2">
          Your Meme has <strong>{memePower}</strong> power.
        </p>
        {memePower > 0 ? (
          <>
            <p className="text-sm text-gray-700 mb-4">
              Sending this Meme will consume <strong>0.5</strong> power.
            </p>
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={confirming}
                className="px-4 py-2 text-sm rounded bg-green-600 text-white"
              >
                {confirming ? "Sending..." : "Send Meme"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-sm">❌ Meme is no longer usable.</p>
        )}
      </div>
    </div>
  );
};

export default SendMemeModal;

