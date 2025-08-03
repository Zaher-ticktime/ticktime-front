
import React from "react";

const CallsPanel = () => {
  const recentCalls = [
    { user: "@mahsa_77", type: "Voice", duration: "4:52" },
    { user: "@zahermostaghi", type: "Video", duration: "9:10" },
    { user: "@CryptoQueen", type: "Group Call", duration: "15:37" },
  ];

  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-teal-700">📞 Recent Calls</h2>
      <ul className="space-y-4 text-sm">
        {recentCalls.map((call, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-teal-100 transition"
          >
            <div className="font-semibold">{call.user}</div>
            <div className="text-gray-600">{call.type} – ⏱ {call.duration}</div>
            <button className="w-full mt-2 bg-teal-600 text-white py-1 px-2 rounded hover:bg-teal-500">
              برقراری تماس مجدد
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CallsPanel;
