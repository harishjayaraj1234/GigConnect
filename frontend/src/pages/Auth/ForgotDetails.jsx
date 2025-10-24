import { useState } from "react";
import axios from "axios";
import { href, Navigate, useNavigate } from "react-router-dom";

function ForgotDetails() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");        
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
      e.preventDefault();
        try {
          
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {email, otp, password});
            
            if(response.status == 200){
                setMessage(response.data.message);
                setTimeout(() => {
                  navigate("/login")
                }, 1000)
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
      }

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
        >
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>

         <input
           type="email"
           placeholder="Enter your Email"
           className="w-full p-2 border rounded"
           onChange={(e) => setEmail(e.target.value)}
           value={email}
           required
         />
         <input
           type="text"
           placeholder="Enter OTP"
           className="w-full p-2 border rounded"
           onChange={(e) => setOtp(e.target.value)}
           value={otp}
           required
         />
         <input
           type="password"
           placeholder="Enter New Password"
           className="w-full p-2 border rounded"
           onChange={(e) => setPassword(e.target.value)}
           required
         />
     

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Submit
        </button>

      </form>
    </div>
  );
};
export default ForgotDetails;