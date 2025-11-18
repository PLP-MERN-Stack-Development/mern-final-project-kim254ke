import BookingForm from "../components/BookingForm";
import Calendar from "../components/Calendar";

export default function Bookings() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <BookingForm />
        <Calendar />
      </div>
    </div>
  );
}
