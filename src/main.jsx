// 📁 src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // خیلی مهمه! این باعث میشه App.jsx اجرا شه
import './index.css';     // اگه فایل استایل داری

console.log("✅ Main.jsx is running!");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* اینم خیلی مهمه که App.jsx وصل بشه */}
  </React.StrictMode>
);


