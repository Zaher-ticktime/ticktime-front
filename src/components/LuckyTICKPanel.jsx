
import React from "react";

const LuckyTICKPanel = () => {
  return (
    <aside className="w-72 bg-white h-screen p-4 border-l shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-green-700">🎁 LuckyTICK</h2>
      <div className="space-y-4 text-sm">
        <p>با سوزاندن <strong>100 SilverTICK</strong> وارد قرعه‌کشی شوید!</p>
        <p>همچنین می‌توانید با پرداخت <strong>1 GoldenTICK</strong> شانس ویژه کسب کنید 🎯</p>

        <button className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition">
          شرکت در قرعه‌کشی
        </button>

        <hr />

        <h3 className="font-semibold mt-4 text-gray-700">🎉 برندگان اخیر</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>@CryptoQueen – 250 SilverTICK</li>
          <li>@mahsa_77 – 1 GoldenTICK</li>
          <li>@zahermostaghi – NFT خاص 🎨</li>
        </ul>
      </div>
    </aside>
  );
};

export default LuckyTICKPanel;
