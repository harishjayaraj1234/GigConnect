import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function IdVerify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [type, setType] = useState("email")
  const [message, setMessage] = useState(""); 
  const [userRole, setUserRole] = useState('');
  const [button , setButtonText] = useState("Send OTP")
  const [placeholder, setPlaceholder] = useState("Enter Your Email")

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(email.length == 6){
        try {
          const otp = email;
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-account`, { otp },{ withCredentials: true });
          if(response.status == 200){
              setMessage(response.data.message);
              console.log(response.data.user.role)
              await localStorage.setItem("userRole", response.data.user.role)
              navigate('/login')
              
              // navigate(`/${response.data.user.role == "user" ? "client" : response.data.user.role == "freelancer" ? "freelancer" : "admin" }-dashboard`)
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
    }else{
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-verify-otp`, { email },{ withCredentials: true });
        if(response.status == 200){
            setMessage(response.data.message);
            setPlaceholder("Enter OTP")
            setType('number')
            setEmail("");
            setButtonText("Verify")

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
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
        >
        <h2 className="text-2xl font-bold text-center mb-2">Verify Your Account</h2>

        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          {button}
        </button>

        <p className="text-sm mt-2 text-center">  
          <Link to="/login" className="text-blue-600 underline">
            Skip for Now
          </Link>
        </p>
      </form>
    </div>
  );
}
export default IdVerify;
