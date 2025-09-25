// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Login from "./Pages/Login";
import Dashboard from "./Pages/DashBoard";
import Settings from "./Pages/Settings";
import UserManagement from "./Pages/UserManagement";
import Truique from "./Pages/Truique";
import Help from "./Pages/HelpSupport"


function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path='/' element={<Login />} />

        {/* Dashboard route */}
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Truqie route */}
        <Route path='/truique' element={<Truique />} />

        {/* Settings route */}
        <Route path='/settings' element={<Settings />} />

        {/* User Management route */}
        <Route path='/userManagement' element={<UserManagement />} />
        <Route path='/help' element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
