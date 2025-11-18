import { useState, useEffect } from "react";
import { getUserBookings, cancelBooking } from "../services/bookingAPI";

export default function Calendar({ userId, userToken }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings(userId, userToken);
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId, userToken]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id, userToken);
      fetchBookings(); // Refresh after cancel
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((b) => (
            <li key={b._id} className="border p-2 rounded flex justify-between items-center">
              <span>{b.date} at {b.time} - {b.service.name}</span>
              <button
                onClick={() => handleCancel(b._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
