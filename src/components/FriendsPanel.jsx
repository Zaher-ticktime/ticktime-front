
import React from "react";

const FriendsPanel = () => {
  const friends = ["@mahsa_77", "@CryptoQueen", "@AliWeb3"];

  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-blue-700">🤝 Friends</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full p-2 border rounded"
        />
      </div>
      <ul className="space-y-3">
        {friends.map((friend, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center shadow-sm hover:bg-blue-50 transition"
          >
            <span>{friend}</span>
            <button className="text-sm text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-400">
              Message
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FriendsPanel;
