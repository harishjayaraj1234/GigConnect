import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
  });

  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile-update`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center  h-auto">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Skills
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="E.g., React, Node.js, MongoDB"
              className="w-full border border-gray-300 rounded-lg p-2.5 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center font-medium ${
                message.includes("done") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;