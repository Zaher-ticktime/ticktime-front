// src/pages/LuckyTICK.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // اگه اسمش چیز دیگه‌ایه بگو تغییرش بدم

const LuckyTICK = () => {
  const [silverTickets, setSilverTickets] = useState(0);
  const [goldenTickets, setGoldenTickets] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  const handleBurnSilver = () => {
    if (hasEntered) return;
    setSilverTickets(prev => prev + 1);
    setHasEntered(true);
    alert("🔥 500 Silver TICK burned! You now have 1 ticket.");
  };

  const handleUseGolden = () => {
    if (hasEntered) return;
    setGoldenTickets(prev => prev + 3);
    setHasEntered(true);
    alert("🌟 1 Golden TICK used! You now have 3 tickets + bonus chance.");
  };

  // ساعت قرعه‌کشی بعدی (مثال ساده)
  const nextDraw = "2025-08-05 18:00";

  return (
    <>
      <Navbar /> {/* ✅ نمایش نوار بالا */}
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🎉 Welcome to LuckyTICK!</h1>

        <div className="mb-4 text-gray-700">
          <p>🎯 <strong>Next draw:</strong> {nextDraw}</p>
          <p>🎟️ <strong>Your Tickets:</strong> {silverTickets + goldenTickets}</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">🎫 Entry Options</h2>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Burn 500 Silver TICK = 1 Ticket</li>
              <li>Pay 1 Golden TICK = 3 Tickets + Bonus Chance</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">🔥 Enter Lottery</h2>
            <button
              onClick={handleBurnSilver}
              className={`${
                hasEntered ? 'opacity-50 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
              } text-white px-4 py-2 rounded-xl mr-3`}
              disabled={hasEntered}
            >
              Burn Silver TICK
            </button>

            <button
              onClick={handleUseGolden}
              className={`${
                hasEntered ? 'opacity-50 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white px-4 py-2 rounded-xl`}
              disabled={hasEntered}
            >
              Use Golden TICK
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold">📜 Rules</h2>
            <p className="text-gray-600 text-sm">
              - Each round allows only one entry per wallet. <br />
              - Tickets are not refundable. <br />
              - Winners will be chosen randomly based on ticket count. <br />
              - Golden TICK gives you a better chance!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LuckyTICK;


