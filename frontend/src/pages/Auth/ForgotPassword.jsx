import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonStyle from "../../styles/CommonStyle.module.css";
import axios from "axios";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = Send OTP, 2 = Verify OTP, 3 = Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- Step 1: Send OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/send-reset-otp`,
        { email }
      );

      if (response.data.success) {
        setMessage(response.data.message || "OTP sent to your email.");
        setStep(2);
      } else {
        setMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error sending OTP. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { email, otp }
      );

      console.log("Frontend received:", response.data);

      if (response.data.success) {
        setMessage(response.data.message || "OTP verified successfully!");
        setStep(3);
      } else {
        setMessage(response.data.message || "Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("OTP verify error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Reset Password ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        { email, otp, password }
      );

      console.log("Reset response:", response.data);

      if (response.data.success) {
        setMessage(response.data.message || "Password reset successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error resetting password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={CommonStyle["forgot-page"]}>
      <form
        onSubmit={
          step === 1
            ? handleSendOtp
            : step === 2
            ? handleVerifyOtp
            : handleResetPassword
        }
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transform transition duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Forgot Password 🔐
        </h2>

        {step === 1 && (
          <>
            <p className="text-gray-600 text-center mb-4 text-sm">
              Enter your registered email address to receive an OTP.
            </p>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-600 text-center mb-4 text-sm">
              An OTP has been sent to{" "}
              <span className="font-semibold">{email}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-gray-600 text-center mb-4 text-sm">
              OTP verified ✅ — now reset your password
            </p>
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </>
        )}

        {message && (
          <p
            className={`mt-4 text-sm text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition transform ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
        >
          {loading
            ? "Processing..."
            : step === 1
            ? "Send OTP"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </button>

        <p className="text-sm text-center mt-4">
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            ⬅ Back to Login
          </Link>
        </p>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Having trouble?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Contact Support
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
