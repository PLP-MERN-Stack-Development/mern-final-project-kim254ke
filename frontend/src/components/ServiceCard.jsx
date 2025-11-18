export default function ServiceCard({ service }) {
    return (
      <div className="border rounded shadow p-4 hover:shadow-lg transition">
        <h3 className="font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-600">{service.category}</p>
        <p className="text-purple-600 font-bold">KSh {service.price}</p>
        <p className="text-sm">Duration: {service.duration} mins</p>
      </div>
    );
  }
  