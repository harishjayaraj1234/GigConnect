import React, { useState, useEffect } from "react";
import GigCard from "../../components/Gigs/GigCard";
import axios from "axios";

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const data = [
      {
        id: 1,
        title: "Logo Design",
        category: "Design",
        location: "Bangalore",
        budget: 500,
        freelancer: "Alice",
      },
      {
        id: 2,
        title: "Website Development",
        category: "Development",
        location: "Mumbai",
        budget: 2000,
        freelancer: "Bob",
      },
      {
        id: 3,
        title: "SEO Optimization",
        category: "Marketing",
        location: "Delhi",
        budget: 1000,
        freelancer: "Charlie",
      },
    ];
    setGigs(data);
    setFilteredGigs(data);
  }, []);

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

  const handleApply =async (amount) => {

    const {data:keydata} = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment/getkey`)
    const {key} = keydata
    console.log(key);
    
    

    const {data:orderdata} = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`,{
        amount:"500"
    })
    const {order} = orderdata
    console.log(order)
    // alert(`Applied for: ${gig.title}`);

   
    const options = {
        key: key, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'GigConnect',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: `${import.meta.env.VITE_API_URL}/api/payment/verification`, // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Browse Gigs</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded flex-1"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} onApply={handleApply} />
          ))
        ) : (
          <p>No gigs found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;
