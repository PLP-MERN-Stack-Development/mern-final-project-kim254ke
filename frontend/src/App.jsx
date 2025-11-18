import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage user={user} token={token} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </Router>
  );
}

export default App;
