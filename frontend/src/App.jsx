import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Stylists from "./pages/Stylists";
import AuthProvider from "./context/AuthContext.jsx";
import GlassmorphicSection from "./components/GlassmorphicSection";

function AppInner() {
  return (
    <>
      {/* Navbar is fixed (h-16), so we need top padding to avoid overlap */}
      <Navbar /> 

      <div className="pt-16 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <GlassmorphicSection />
              </>
            }
          />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}
