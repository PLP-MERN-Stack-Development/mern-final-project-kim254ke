import { Link } from "react-router-dom";

export default function Navbar({ user, logout }) {
  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">GlamHub</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user && <Link to="/booking" className="hover:underline">Booking</Link>}
        {user ? (
          <button onClick={logout} className="hover:underline">Logout</button>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
}
