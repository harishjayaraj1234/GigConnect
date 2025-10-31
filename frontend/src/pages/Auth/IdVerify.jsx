import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function IdVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [button, setButtonText] = useState("Send OTP");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpSent) {
      // STEP 1: Send OTP
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/send-verify-otp`,
          { email },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setMessage(response.data.message);
          setIsOtpSent(true);
          setButtonText("Verify OTP");
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Error sending OTP. Try again later."
        );
      }
    } else {
      // STEP 2: Verify OTP
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-account`,
          { otp },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setMessage(response.data.message);
          setTimeout(() => {
            navigate("/forgot-details", { state: { email } });
          }, 1000);
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Error verifying OTP. Try again later."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify Your Account
        </h2>

        {!isOtpSent ? (
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        ) : (
          <input
            type="number"
            placeholder="Enter OTP"
            className="w-full p-2 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {button}
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

export default IdVerify;
