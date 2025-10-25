import React, { useState } from "react";
import axios from "axios";

const CreateGig = ({ freelancerId }) => {
  const [gig, setGig] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setGig({ ...gig, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/gigs", {
        ...gig,
        freelancerId, // attach the logged-in freelancer’s ID
      });
      alert("Gig created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create gig");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-3">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} className="border p-2 w-full" />
      <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full" />
      <input name="image" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Gig</button>
    </form>
  );
};

export default CreateGig;
