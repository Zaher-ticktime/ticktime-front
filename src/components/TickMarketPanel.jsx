
import React from "react";

const TickMarketPanel = () => {
  const items = [
    { name: "T-Shirt TickTime", price: "10 GoldenTICK", discount: "20% with SilverTICK" },
    { name: "NFT Art: Focus Mode", price: "250 GoldenTICK", discount: "5% with SilverTICK" },
    { name: "Membership VIP", price: "500 GoldenTICK", discount: "50% with SilverTICK" },
  ];

  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-orange-700">🛍 TickMarket</h2>
      <ul className="space-y-4 text-sm">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-orange-100 transition"
          >
            <div className="font-semibold mb-1">{item.name}</div>
            <div className="text-gray-700">💰 قیمت: {item.price}</div>
            <div className="text-green-600">🎁 تخفیف: {item.discount}</div>
            <button className="w-full mt-2 bg-orange-600 text-white py-1 px-2 rounded hover:bg-orange-500">
              مشاهده / خرید
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TickMarketPanel;
