import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-reset-otp`, { email });
        if(response.status == 200){
            setMessage(response.data.message);
        }
    } catch (error) {
        if(error.response){
            setMessage(error.response.data.message)
        }
        else if(error.request){
           setMessage("No response from server. Try again later.")
        }
        else(
          setMessage(error.message)
        )
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
        >
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Send Reset Link
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
export default ForgotPassword;