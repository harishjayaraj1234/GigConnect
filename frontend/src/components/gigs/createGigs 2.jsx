import { useState } from "react";
import axios from "axios";

const CreateGig = ({ freelancerId }) => {
  const [gig, setGig] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null); 

  const handleChange = (e) => {
    setGig({ ...gig, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", gig.title);
    formData.append("description", gig.description);
    formData.append("price", gig.price);
    formData.append("category", gig.category);
    formData.append("freelancerId", freelancerId);
    if (image) formData.append("gigImage", image); 

    try {
      const res = await axios.post("http://localhost:4000/api/gigs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Gig created successfully");
      console.log(res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create gig");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 space-y-3 border rounded-lg shadow-md bg-white"
    >
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

    
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full rounded cursor-pointer"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-all"
      >
        Create Gig
      </button>
    </form>
  );
};

export default CreateGig;
