import { useState, useEffect } from "react";
import { getServices } from "../services/serviceAPI";
import { createBooking } from "../services/bookingAPI";

export default function BookingForm({ userId, userToken }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService || !date || !time) {
      setMessage("Please select all fields");
      return;
    }

    try {
      const bookingData = {
        userId,
        serviceId: selectedService,
        date,
        time,
      };
      await createBooking(bookingData, userToken);
      setMessage("Booking successful! 🎉");
      setSelectedService("");
      setDate("");
      setTime("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Book a Service</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name} - KSh {service.price}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Book Now
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
