import axios from "axios";
import { useState } from "react";
import IdVerify from "./IdVerify";
import { Link, redirect, useNavigate } from "react-router-dom";
function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Role",
    profileImage: null, 
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // handle input change (for text inputs)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle file change (for image input)
  const handleFileChange = (e) => {
    setForm({ ...form, profileImage: e.target.files[0] });
  };

  // password strength checker
  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) return setMessage("Enter your Name First!");
    if (!form.email) return setMessage("Enter your Email!");
    if (!isStrongPassword(form.password))
      return setMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
    if (form.password !== form.confirmPassword)
      return setMessage("Passwords not match!");
    if (form.role === "Role") return setMessage("Select your role");
    if (!form.profileImage) return setMessage("Please upload a profile image!");

    // 🔹 Prepare FormData for file + other fields
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message || "Registered successfully!");
        console.log("Image uploaded:", response.data.imageUrl);
      }
    } catch (error) {
      if (error.response) setMessage(error.response.data.message);
      else if (error.request) setMessage("No response from server.");
      else setMessage(error.message);
    }

    setTimeout(() => navigate("/verify-account"), 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
        encType="multipart/form-data" 
      >
        <h2 className="text-2xl font-bold text-center mb-2">Register</h2>

        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange} 
        />

        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        >
          <option selected disabled>
            Role
          </option>
          <option value="user">User</option>
          <option value="freelancer">Freelancer</option>
        </select>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Register
        </button>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
