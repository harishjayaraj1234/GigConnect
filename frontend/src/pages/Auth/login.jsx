import axios from "axios";
import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login form data:", form);

    if (form.email && form.password) {
      

      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
          if(response.status == 200){
            setMessage(response.data.message);
          }
      } catch (error) {
          if(error.response){
              setMessage(error.response.data.message);
          }
          else if(error.request){
              setMessage("No response from server. Try again later.")
          }
          else{
              setMessage(error.message);
          }
          return;
      }

    } else {
      setMessage("Please enter valid credentials!");
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <Navbar /> */}
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

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
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
