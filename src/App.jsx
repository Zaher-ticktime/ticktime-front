import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import WelcomePage from "./pages/WelcomePage";
import TickTimeApps from "./pages/TickTimeApps";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import UserFeed from "./pages/UserFeed";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import MyPhotos from "./pages/MyPhotos";
import MyVideos from "./pages/MyVideos";
import MyPurchases from "./pages/MyPurchases";
import VipMemeMarket from "./pages/VipMemeMarket";
import CreateLimitedMeme from "./pages/CreateLimitedMeme";
import SubmitProject from "./pages/SubmitProject";
import AnswerProject from "./pages/AnswerProject";
import ProjectResults from "./pages/ProjectResults";
import MirrorRoom from "./pages/MirrorRoom";
import ForgotPassword from "./pages/ForgotPassword";
import Cinema from "./pages/Cinema";
import TickMarket from "./pages/TickMarket";
import LuckyTICK from "./pages/LuckyTICK";
import SilverInfo from "./pages/SilverInfo";
import GoldenInfo from "./pages/GoldenInfo";
import DiamondInfo from "./pages/DiamondInfo";
import TickMarketInfo from "./pages/TickMarketInfo";
import MirrorRoomInfo from "./pages/MirrorRoomInfo";
import CinemaInfo from "./pages/CinemaInfo";
import ChatInfo from "./pages/ChatInfo";
import LuckyTICKInfo from "./pages/LuckyTICKInfo";
import VIPDashboard from "./pages/VIPDashboard";
import TokenInfo from "./TokenInfo";
import TopMemesPage from "./pages/TopMemesPage";
import MobileFeed from "./components/MobileFeed"; // ✅ Your Mobile Feed Component
import SavedItems from "./pages/SavedItems";
import VipSellerPanel from "./pages/VipSellerPanel";
import ChatPage from "./pages/ChatPage";
import AdminMirrorPanel from "./pages/AdminMirrorPanel";
import MirrorAnswersAdmin from "./pages/MirrorAnswersAdmin";

import AdminCancelPanel from "./pages/AdminCancelPanel";
import { Toaster } from 'react-hot-toast';



export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
   <Toaster position="top-center" reverseOrder={false} />
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Layout><WelcomePage /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/dashboard" element={isLoggedIn ? <Layout><Dashboard /></Layout> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feed" element={isLoggedIn ? <Layout><UserFeed/></Layout> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Layout><Profile /></Layout> : <Navigate to="/" />} />
        <Route path="/wallet" element={isLoggedIn ? <Layout><Wallet /></Layout> : <Navigate to="/" />} />
        <Route path="/apps" element={<Layout><TickTimeApps /></Layout>} />
        <Route path="/myphotos" element={isLoggedIn ? <Layout><MyPhotos /></Layout> : <Navigate to="/" />} />
        <Route path="/myvideos" element={isLoggedIn ? <Layout><MyVideos /></Layout> : <Navigate to="/" />} />
        <Route path="/mypurchases" element={isLoggedIn ? <Layout><MyPurchases /></Layout> : <Navigate to="/" />} />
        <Route path="/vip-meme-market" element={isLoggedIn ? <Layout><VipMemeMarket /></Layout> : <Navigate to="/" />} />
        <Route path="/create-limited-meme" element={isLoggedIn ? <Layout><CreateLimitedMeme /></Layout> : <Navigate to="/" />} />
        <Route path="/submit-project" element={isLoggedIn ? <Layout><SubmitProject /></Layout> : <Navigate to="/" />} />
        <Route path="/projects/:id" element={isLoggedIn ? <Layout><AnswerProject /></Layout> : <Navigate to="/" />} />
        <Route path="/project-results/:id" element={isLoggedIn ? <Layout><ProjectResults /></Layout> : <Navigate to="/" />} />
        <Route path="/MirrorRoom" element={isLoggedIn ? <Layout><MirrorRoom /></Layout> : <Navigate to="/" />} />
        <Route path="/chat" element={isLoggedIn ? <Layout><ChatWrapper /></Layout> : <Navigate to="/" />} />
        <Route path="/cinema" element={<Layout><Cinema /></Layout>} />
        <Route path="/tickmarket" element={<Layout><TickMarket /></Layout>} />
        <Route path="/lucky-tick" element={<Layout><LuckyTICK /></Layout>} />
        <Route path="/silver-info" element={<Layout><SilverInfo /></Layout>} />
        <Route path="/golden-info" element={<Layout><GoldenInfo /></Layout>} />
        <Route path="/diamond-info" element={<Layout><DiamondInfo /></Layout>} />
        <Route path="/TickMarket-Info" element={<Layout><TickMarketInfo /></Layout>} />
        <Route path="/Mirror-Info" element={<Layout><MirrorRoomInfo /></Layout>} />
        <Route path="/Cinema-Info" element={<Layout><CinemaInfo /></Layout>} />
        <Route path="/Chat-Info" element={<Layout><ChatInfo /></Layout>} />
        <Route path="/lucky-tick-info" element={<Layout><LuckyTICKInfo /></Layout>} />
        <Route path="/vip-dashboard" element={isLoggedIn ? <Layout><VIPDashboard /></Layout> : <Navigate to="/" />} />
        <Route path="/tokens" element={<TokenInfo />} />
        <Route path="/mobile-feed" element={isLoggedIn ? <Layout><MobileFeed  /></Layout> : <Navigate to="/" />} />
        <Route path="/top-memes" element={isLoggedIn ? <Layout><TopMemesPage  /></Layout> : <Navigate to="/" />} />
    
        <Route path="/saved" element={isLoggedIn ? <Layout><SavedItems /></Layout> : <Navigate to="/" />} />
        <Route path="/admin/cancel-requests" element={isLoggedIn ? <Layout><AdminCancelPanel /></Layout> : <Navigate to="/" />} />
        <Route path="/vip/panel" element={isLoggedIn ? <Layout><VipSellerPanel /></Layout> : <Navigate to="/" />} />
        <Route path="/chat" element={isLoggedIn ? <Layout><ChatPage /></Layout> : <Navigate to="/" />} />
        <Route path="/admin/mirror" element={isLoggedIn ? <Layout><AdminMirrorPanel  /></Layout> : <Navigate to="/" />} />
        <Route path="/admin/mirror-answers" element={isLoggedIn ? <Layout><MirrorAnswersAdmin  /></Layout> : <Navigate to="/" />} />
        
        <Route path="/admin-cancel" element={isLoggedIn ? <Layout><AdminCancelPanel  /></Layout> : <Navigate to="/" />} />

      </Routes>
    </Router>
    

  );
}


 