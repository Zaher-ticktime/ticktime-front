import React from "react";

export default function Textarea({ value, onChange, placeholder, className = "" }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      rows={4}
    />
  );
}


