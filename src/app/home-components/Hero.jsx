"use client";
import React from "react";
import { Gideon_Roman } from "next/font/google";

// Load the Gideon Roman font
const gideon = Gideon_Roman({
  subsets: ["latin"],
  weight: ["400"],
});

function Hero() {
  return (
    <div className="overflow-hidden">
      <div className="hero-interface  w-full h-screen bg-black flex justify-center items-center overflow-hidden">
        
        {/* Center Text */}
        <p className="text-white font-extrabold absolute top-[40%] z-10 text-[4vw] text-center leading-none">
          PREMIUM ANIMATED EXPERIENCE FOR <br />
          <span className={`${gideon.className} font-bold`}>VISIONARY BRANDS</span>
        </p>

        {/* Bottom Highlights */}
        <div className="absolute bottom-5 w-[97%] flex justify-between items-center z-10">
          <p className="text-white text-[1.1vw] font-bold">
            <span className={`${gideon.className} font-bold`}>CAPTIVATE ELEGANCE</span>
          </p>
          <p className="text-white text-[1.1vw] font-bold">
            <span className={`${gideon.className} font-bold`}>ENGAGE PRESTIGIOUS</span>
          </p>
          <p className="text-white text-[1.1vw] font-bold">
            <span className={`${gideon.className} font-bold`}>CONVERT EXCELLENCE</span>
          </p>
        </div>

        {/* Background Video */}
        <video
          className="w-full brightness-60"
          loop
          autoPlay
          muted
          src="https://www.fundamental.bg/videos/hero-video.webm"
        ></video>
      </div>
    </div>
  );
}

export default Hero;
