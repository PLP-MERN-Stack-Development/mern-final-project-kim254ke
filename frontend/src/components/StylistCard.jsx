export default function StylistCard({ stylist }) {
    return (
      <div className="border rounded shadow p-4 hover:shadow-lg transition">
        <h3 className="font-semibold">{stylist.name}</h3>
        <p className="text-sm text-gray-600">{stylist.specialty}</p>
        <p className="text-purple-600 font-bold">{stylist.experience} yrs experience</p>
      </div>
    );
  }
  