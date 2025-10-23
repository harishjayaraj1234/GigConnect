import React from "react"
import WalletPage from "./components/wallet/walletPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar/>
        <Footer/>
      </div>
  );
}

export default App;
