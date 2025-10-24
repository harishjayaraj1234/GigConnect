import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/forgot-password", { email });
      setMessage("✅ OTP sent to your email!");
      console.log("OTP sent:", data);
      localStorage.setItem("resetEmail", email);
      setTimeout(() => navigate("/verify-otp"), 1200);
    } catch (err) {
      setMessage("Error sending OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Send OTP
        </button>

        <p className="text-sm text-center mt-2">
          <Link to="/login" className="text-blue-600 underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
