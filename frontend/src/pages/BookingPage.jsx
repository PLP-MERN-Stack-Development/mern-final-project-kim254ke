import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserBookings, updateBooking, deleteBooking, createBooking } from "../services/bookingAPI";
import { getServices } from "../services/serviceAPI";
import { getStylists } from "../services/stylistAPI";
import SlotPreviewModal from "../components/SlotPreviewModal";
import AddOnSuggest from "../components/AddOnSuggest";

export default function BookingPage() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // BookingForm states
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [category, setCategory] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [stylistId, setStylistId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // New state: multiple service selection
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getUserBookings(user._id, token);
        setBookings(data.reverse());
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedServices = await getServices();
        const fetchedStylists = await getStylists();
        setServices(fetchedServices);
        setStylists(fetchedStylists);
      } catch (err) {
        console.error("Error fetching services or stylists:", err);
      }
    })();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      await deleteBooking(id, token);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (HH:MM):");
    if (!newDate || !newTime) return;

    try {
      const booking = bookings.find(b => b._id === id);
      const updatedBooking = { ...booking, date: newDate, time: newTime };
      await updateBooking(updatedBooking, token);
      setBookings(bookings.map(b => b._id === id ? updatedBooking : b));
    } catch (err) {
      console.error("Failed to reschedule booking:", err);
    }
  };

  const serviceObj = services.find(s => s._id === serviceId);
  const stylistObj = stylists.find(s => s._id === stylistId);

  const handleAddOnSelect = (addon) => {
    setSelectedAddOns(prev => {
      if (prev.find(a => a.name === addon.name)) return prev.filter(a => a.name !== addon.name);
      return [...prev, addon];
    });
  };

  // Add service to selection list
  const addServiceToSelection = () => {
    if (!serviceId) return;
    const selected = services.find(s => s._id === serviceId);
    if (selectedServices.find(s => s._id === selected._id)) return; // avoid duplicates
    setSelectedServices([...selectedServices, { ...selected, stylistId, addOns: selectedAddOns }]);

    // Reset current selection
    setServiceId("");
    setStylistId("");
    setSelectedAddOns([]);
    setCategory("");
  };

  const openPreview = (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("You must be logged in to book a service. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    if (!date || !time || selectedServices.length === 0) {
      setMessage("Please select at least one service, date, and time");
      return;
    }
    setMessage("");
    setPreviewOpen(true);
  };

  const handleConfirm = async () => {
    if (!token) {
      setMessage("You must be logged in to book a service");
      return;
    }

    try {
      for (const s of selectedServices) {
        const bookingData = {
          serviceId: s._id,
          stylistId: s.stylistId || undefined,
          date,
          time,
          addOns: s.addOns || [],
        };
        await createBooking(bookingData, token);
      }

      setMessage("All bookings confirmed! 🎉");
      setSelectedServices([]);
      setServiceId("");
      setStylistId("");
      setDate("");
      setTime("");
      setCategory("");
      setSelectedAddOns([]);
      setPreviewOpen(false);

      const data = await getUserBookings(user._id, token);
      setBookings(data.reverse());
    } catch (err) {
      console.error("Booking failed:", err);
      setMessage(err.response?.data?.message || "Booking failed. Check login/token.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded shadow-md transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Book a Service</h3>

          {/* Selected Services List */}
          {selectedServices.length > 0 && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
              <h4 className="font-semibold mb-2">Selected Services</h4>
              <ul className="space-y-1">
                {selectedServices.map((s, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{s.name} {s.addOns?.length > 0 && `(Add-ons: ${s.addOns.map(a => a.name).join(", ")})`}</span>
                    <button
                      onClick={() => setSelectedServices(selectedServices.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            {/* Category Filter */}
            <select
              value={category}
              onChange={e => { setCategory(e.target.value); setServiceId(""); }}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Filter by category (optional)</option>
              {[...new Set(services.map(s => s.category))].map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Service Select */}
            <select
              value={serviceId}
              onChange={e => setServiceId(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Service</option>
              {services.filter(s => !category || s.category === category)
                .map(s => <option key={s._id} value={s._id}>{s.name} – KSh {s.price}</option>)}
            </select>

            {/* Stylist Select */}
            <select
              value={stylistId}
              onChange={e => setStylistId(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Any stylist (optional)</option>
              {stylists.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
            </select>

            {/* Date & Time */}
            <div className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Add-ons */}
            <AddOnSuggest service={serviceObj} onSelect={handleAddOnSelect} />
            {selectedAddOns.length > 0 && (
              <div className="mt-2">
                <div className="text-sm font-medium">Selected add-ons</div>
                <div className="flex gap-2 mt-2">
                  {selectedAddOns.map(a => (
                    <span key={a.name} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm text-gray-900 dark:text-gray-100">
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-3">
              <button
                 onClick={() => navigate("/services")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Service
              </button>
              <button
                onClick={openPreview}
                className="bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
              >
                Book Selected Services
              </button>
              <button
                onClick={() => { setServiceId(""); setCategory(""); setDate(""); setTime(""); setSelectedAddOns([]); }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>

            {message && <div className="text-sm mt-2 text-green-600 dark:text-green-400">{message}</div>}
          </div>

          <SlotPreviewModal
  open={previewOpen}
  onClose={() => setPreviewOpen(false)}
  slot={{ date, time }}
  selectedServices={selectedServices.map(s => ({
    ...s,
    stylistName: stylists.find(st => st._id === s.stylistId)?.name || undefined
  }))}
  onConfirm={handleConfirm}
/>
        </div>

        {/* Your Bookings Section */}
        <div>
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Bookings</h1>

          {loading && <p className="text-gray-700 dark:text-gray-200">Loading bookings...</p>}

          {!loading && bookings.length === 0 && (
            <p className="text-gray-700 dark:text-gray-200">You have no bookings yet.</p>
          )}

          {!loading && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map(b => (
                <div
                  key={b._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2 transition-colors"
                >
                  <p><span className="font-semibold">Service:</span> {b.service?.name}</p>
                  <p><span className="font-semibold">Stylist:</span> {b.stylist?.name}</p>
                  <p><span className="font-semibold">Date:</span> {b.date}</p>
                  <p><span className="font-semibold">Time:</span> {b.time}</p>
                  {b.addOns?.length > 0 && (
                    <p><span className="font-semibold">Add-ons:</span> {b.addOns.map(a => a.name).join(", ")}</p>
                  )}

                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleReschedule(b._id)}
                    >
                      Reschedule
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleCancel(b._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
