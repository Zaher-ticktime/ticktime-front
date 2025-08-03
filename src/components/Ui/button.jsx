import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition ${className}`}
    >
      {children}
    </button>
  );
}
