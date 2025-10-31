import React, { useState, useEffect } from "react";
import axios from "axios";


const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [message, setMessage] = useState("No gigs found");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  // Fetch gigs on mount
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gigs`, {
          withCredentials: true,
        });

        if (!response.data || response.data.length === 0) {
          setMessage("No gigs found.");
        } else {
          setGigs(response.data);
          setFilteredGigs(response.data);
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching gigs:", error);
        setMessage("Failed to load gigs. Please try again later.");
      }
    };

    fetchGigs();
  }, []);

  // Filter logic
  const handleFilter = () => {
    let result = gigs;

    if (location)
      result = result.filter((gig) =>
        gig.location.toLowerCase().includes(location.toLowerCase())
      );
    if (category)
      result = result.filter((gig) =>
        gig.category.toLowerCase().includes(category.toLowerCase())
      );
    if (budget) result = result.filter((gig) => gig.budget <= Number(budget));

    setFilteredGigs(result);
  };

  // Razorpay loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle apply/payment
  const handleApply = async (gig) => {
    try {
      // Step 1: Accept booking
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/booking/accept/${gig._id}`,
        { withCredentials: true }
      );

      if (!response) {
        setMessage("Booking acceptance failed.");
        return;
      }

      // Step 2: Load Razorpay SDK
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      // Step 3: Get key & create order
      const { data: keyData } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/payment/getkey`
      );
      const { key } = keyData;

      const { data: orderData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        { amount: gig.budget || 500 }
      );
      const { order } = orderData;

      // Step 4: Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "GigConnect",
        description: gig.title,
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_API_URL}/api/payment/verification`,
        prefill: {
          name: "Freelancer",
          email: "freelancer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in handleApply:", error);
      setMessage("Payment initiation failed. Please try again.");
    }
  };

  // JSX
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Browse Gigs</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded flex-1 min-w-[150px]"
        />
        <input
          type="number"
          placeholder="Max Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="p-2 border rounded w-32"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Gig list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <div
              key={gig._id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{gig.title}</h3>
              <p className="text-gray-600">{gig.category}</p>
              <p className="text-sm text-gray-500">📍 {gig.location}</p>
              <p className="text-sm font-medium mt-1">
                Budget: ₹{gig.budget}
              </p>
              <button
                onClick={() => handleApply(gig)}
                className="bg-blue-600 text-white px-4 py-1 rounded mt-3 hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          ))
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;
