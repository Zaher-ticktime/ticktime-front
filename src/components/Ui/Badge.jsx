import React from "react";

export default function Badge({ children, color = "bg-cyan-400", className = "" }) {
  return (
    <span className={`text-black text-xs font-semibold px-2 py-1 rounded-full ${color} ${className}`}>
      {children}
    </span>
  );
}
