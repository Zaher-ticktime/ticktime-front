
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; // در صورت نیاز می‌تونی اینو حذف کنی یا نگه داری

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0606ff" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* Sidebar اختیاری */}
        {/* <Sidebar /> */}

        {/* Main Content */}
        <main style={{ flex: 1, padding: "2rem", marginLeft: "0px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;