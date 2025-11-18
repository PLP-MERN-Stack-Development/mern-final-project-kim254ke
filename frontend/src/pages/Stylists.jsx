import StylistCard from "../components/StylistCard";
import { useEffect, useState } from "react";
import { getStylists } from "../services/stylistAPI";

export default function Stylists() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      const data = await getStylists();
      setStylists(data);
    };
    fetchStylists();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Our Stylists</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stylists.map((stylist) => (
          <StylistCard key={stylist._id} stylist={stylist} />
        ))}
      </div>
    </div>
  );
}
