import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import About from './pages/About';
import Adminlogin from './pages/Adminlogin';
import Login_check from './pages/Login_check';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import '@fontsource/inria-sans';
import UserLogin from './pages/UserLogin';
import TreatmentDetails from './pages/TreatmentDetails';
import NewTreatment from './pages/NewTreatment';
// import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <HeaderWithConditionalRender />

      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-[url('/assets/bg.jpg')] bg-cover bg-center min-h-screen flex flex-col">
              <HeroSection />
            </div>
          }
        />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login_check />} />
        <Route path="/login/admin" element={<Adminlogin />} />
        <Route path="/admin-portal" element={<AdminDashboard />} />
        {/* <Route path="/admin-dashboard" element={<Dashboard />} /> */}

        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/treatment-details/:id" element={<TreatmentDetails />} />
        <Route path="/user-dashboard/new-treatment" element={<NewTreatment />} />

      </Routes>
    </Router>
  );
};

// ✅ Header with conditional rendering based on the route
function HeaderWithConditionalRender() {
  const location = useLocation();

  const hideHeaderRoutes = [
    '/admin-portal',
    '/admin-dashboard',
    '/user-dashboard',
    '/about'
  ];

  if (hideHeaderRoutes.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return <Header />;
}

export default App;
