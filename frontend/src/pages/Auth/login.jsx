import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUserRole }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message

    if (form.email && form.password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          form
        );

        console.log("Login response:", response.data);

        if (response.status === 200) {
          setMessage(response.data.message);

          // ✅ Assume backend sends role (e.g., freelancer, client, admin)
          const userRole = response.data.role || "freelancer"; // fallback
          const token = response.data.token;

          // Save in localStorage (optional but useful)
          localStorage.setItem("userRole", userRole);
          localStorage.setItem("token", token);

          // Set userRole in App.js state (if passed as prop)
          if (setUserRole) setUserRole(userRole);

          // ✅ Redirect to main dashboard
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message || "Login failed");
        } else if (error.request) {
          setMessage("No response from server. Try again later.");
        } else {
          setMessage(error.message);
        }
      }
    } else {
      setMessage("Please enter valid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>

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

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center mt-2">
          <Link to="/forgot-password" className="text-blue-600 underline">
            Forgot Password?
          </Link>
        </p>

        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;