import React, { useEffect, useState } from "react";
import { getServices } from "../services/serviceAPI";
import { getStylists } from "../services/stylistAPI";
import ServiceCard from "../components/ServiceCard";
import StylistCard from "../components/StylistCard";

const Home = () => {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch services
        const servicesData = await getServices();
        setServices(servicesData);

        // Fetch stylists
        const stylistsData = await getStylists();
        setStylists(stylistsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Stylists</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stylists.map((stylist) => (
          <StylistCard key={stylist._id} stylist={stylist} />
        ))}
      </div>
    </div>
  );
};

export default Home;
