import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CreateGig = () => {
  const [gig, setGig] = useState({
    title: "",
    description: "",
    category: "",
    budget: 0,
    location: "",
    image: ""
  });

  const handleChange = (e) => {
    setGig({ ...gig, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gigs`,
        { ...gig},
        { withCredentials: true }
      );

      if (res) alert("Gig created successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create gig");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-3">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input name="budget" placeholder="Price" type="number" onChange={handleChange} className="border p-2 w-full" />
      <input name="location" placeholder="Location" type="text" onChange={handleChange} className="border p-2 w-full" />
      <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full" />
      <input name="image" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Gig</button>
    </form>
  );
};

export default CreateGig;
