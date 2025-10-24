import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login.jsx";
import Register from "./pages/Auth/Register";
import Chat from "./pages/Chatting/chat.jsx"
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import WalletPage from "./components/wallet/walletPage.jsx";
import IdVerify from "./pages/Auth/IdVerify.jsx";

function App() {
  return (
    <Routes>
      
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/verify" element={<IdVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/wallet" element={<WalletPage />} />

      {/* Chatting Routes */}
      <Route path="/Chat" element={<Chat />} />



      {/* Optional 404 route */}
      <Route
        path="*"
        element={<h2 className="text-center mt-10" >404 - Page Not Found</h2>}
      />
    </Routes>
  );
}

export default App;
