
import React from "react";

const NotificationsPanel = () => {
  const notifications = [
    "🎉 شما 3 SilverTICK بابت کامنت دریافت کردید!",
    "📢 بازار TickMarket به‌روزرسانی شد.",
    "🎬 یک فیلم جدید به TickCinema اضافه شد.",
    "🔔 دعوت‌نامه دوستی جدید از Mahsa_77",
  ];

  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Notifications</h2>
      <ul className="space-y-3">
        {notifications.map((note, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-blue-50 transition"
          >
            {note}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotificationsPanel;
