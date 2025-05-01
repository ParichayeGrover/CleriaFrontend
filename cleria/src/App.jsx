import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import About from './pages/About';
import Adminlogin from './pages/Adminlogin';
import Login_check from './pages/login_check';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import '@fontsource/inria-sans';

const App = () => {
  return (
    <Router>
      <HeaderWithConditionalRender/>

      <Routes>
        <Route path="/" element={
          
          <div className="bg-[url('/assets/bg.jpg')] bg-cover bg-center min-h-screen flex flex-col">
            <HeroSection />
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/admin-portal" element={<AdminDashboard />} />  {/* Dashboard Route */}
        <Route path="/login" element={<Login_check />} />
        <Route path="/login/admin" element={<Adminlogin/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

// Header with conditional rendering based on the route
function HeaderWithConditionalRender() {
  const location = useLocation();

  // Check if the current path is 'dashboard' or 'admin-dashboard', and hide the header
  if (location.pathname.startsWith('/admin-portal') || location.pathname.startsWith('/about')) {
    return null; // Do not render the header in dashboard routes
  }

  return <Header />; // Render the header for other routes (like home, login, signup)
}

export default App;
