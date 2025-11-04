import React from "react";
import CommonStyle from "../styles/CommonStyle.module.css";
import Header from "./HeaderSection";
import Hero from "./HeroSection";

function Home() {
  return (
    <div className="px-2">
      <Header/>
      <Hero/>
    </div>
  );
}

export default Home;
