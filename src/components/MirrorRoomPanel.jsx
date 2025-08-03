
import React from "react";

const MirrorRoomPanel = () => {
  const projects = [
    { title: "📊 نظر شما درباره تبلیغات و تمرکز چیست؟", reward: "5 SilverTICK" },
    { title: "🧠 کدام ساعت روز بیشترین بهره‌وری را دارید؟", reward: "3 SilverTICK" },
    { title: "📱 آیا اپلیکیشن موبایل TickTime را نصب می‌کنید؟", reward: "4 SilverTICK" },
  ];

  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-blue-900">🪞 MirrorRoom</h2>
      <ul className="space-y-4 text-sm">
        {projects.map((proj, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-blue-100 transition"
          >
            <div className="font-semibold mb-1">{proj.title}</div>
            <div className="text-gray-600">🎁 پاداش: {proj.reward}</div>
            <button className="w-full mt-2 bg-blue-900 text-white py-1 px-2 rounded hover:bg-blue-800">
              شرکت در پروژه
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default MirrorRoomPanel;
