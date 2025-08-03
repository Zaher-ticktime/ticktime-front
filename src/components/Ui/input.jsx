import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder, className = "" }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium text-sm text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      />
    </div>
  );
};

export default Input;

