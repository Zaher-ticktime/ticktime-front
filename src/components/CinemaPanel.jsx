
import React from "react";

const CinemaPanel = () => {
  const shows = [
    { title: "🎬 فیلم: The Rise of Web3", reward: "3 SilverTICK" },
    { title: "📺 سریال: Blockchain Hunters (S1E1)", reward: "2 SilverTICK" },
    { title: "🎞 مستند: Decentralized Dreams", reward: "1 SilverTICK" },
  ];

  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-purple-700">🎬 TickCinema</h2>
      <ul className="space-y-4 text-sm">
        {shows.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-purple-100 transition"
          >
            <div className="font-semibold mb-1">{item.title}</div>
            <div className="text-gray-600 mb-2">🎁 پاداش: {item.reward}</div>
            <button className="w-full bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-500">
              تماشا کن
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CinemaPanel;
