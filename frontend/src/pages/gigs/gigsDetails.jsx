import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const GigsDetails = () => {
  const { id } = useParams(); 
  // const [id, setId] = useState('');
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchGig = async () => {

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        console.error("Error fetching gig details:", err);
        setError("Failed to load gig details");
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  },[id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="animate-pulse text-gray-600">Loading gig details...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!gig) {
    return <p className="text-center text-gray-500 mt-10">Gig not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Gig Image */}
        <div>
          <img
            src={gig.image || ""}
            alt={gig.title}
            className="rounded-lg w-full h-80 object-cover shadow-md"
          />
        </div>

        {/* Gig Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {gig.title}
          </h1>
          <p className="text-gray-600 mb-4">{gig.description}</p>

          <div className="mb-4">
            <span className="font-semibold text-gray-700">Category:</span>{" "}
            <span className="text-blue-600">{gig.category}</span>
          </div>

          <div className="mb-4">
            <span className="font-semibold text-gray-700">Price:</span>{" "}
            <span className="text-green-600 font-bold">${gig.budget}</span>
          </div>

          {gig.freelancer && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Freelancer Information
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span>{" "}
                {gig.freelancer.name || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {gig.freelancer.email || "Hidden"}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => alert("Apply functionality coming soon")}
            >
              Apply for Gig
            </button>
            <button
              className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-200 transition"
              onClick={() => Navigate('')}
            >
              Message Freelancer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigsDetails;
