import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserInfo from "./pages/UserInfo";
import Experience from "./pages/Experience";
import Jobinterest from "./pages/Jobinterest";
import SkillSelection from "./pages/ SkillSelection";
import SavedJobs from "./components/SavedJobs"; 
import { LikedJobsProvider } from "./contexts/LikedJobsContext";
import Community from "./components/community";
import Searchjob from "./components/Searchjob";
import MyProfile from "./components/MyProfile";
import Logout from "./components/logout";
import RegisterNext from "./pages/RegisterNext";




export default function App() {
  return (
    <LikedJobsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/jobinterest" element={<Jobinterest />} />
        <Route path="/skillselection" element={<SkillSelection />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/searchjob" element={<Searchjob />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/registernext" element={<RegisterNext/>} />
      </Routes>
    </Router>
    </LikedJobsProvider>
  );
}