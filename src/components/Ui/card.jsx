import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`border rounded-lg bg-white shadow p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
}



