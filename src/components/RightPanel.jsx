import React from "react";

const RightPanel = () => {
  const suggestions = [
    "Suggested Friend: Mahsa",
    "Join Group: Crypto Lovers",
    "Trending: Meme of the Day",
  ];

  return (
    <aside className="w-72 bg-gray-50 h-screen p-4 border-l shadow-inner">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Suggestions</h2>
      <ul className="space-y-3">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="bg-white p-3 rounded-lg shadow hover:bg-blue-50 transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RightPanel;
