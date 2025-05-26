import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

const Spinner = ({ className = "w-24 h-24" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <Lottie
      animationData={loaderAnimation}
      loop
      autoplay
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);

export default Spinner;