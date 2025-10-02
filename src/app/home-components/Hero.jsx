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
      <div className="hero-interface w-full h-screen bg-black flex justify-center items-center overflow-hidden relative">
        
        {/* Center Text */}
        <p className="text-white font-extrabold absolute top-[40%] z-10 text-[4vw] md:text-[4vw] text-center leading-none px-4 md:px-0 sm:text-[6vw]">
          PREMIUM ANIMATED EXPERIENCE FORS <br />
          <span className={`${gideon.className} font-bold`}>VISIONARY BRANDS</span>
        </p>

        {/* Bottom Highlights - Desktop */}
        <div className="hidden md:flex absolute bottom-5 w-[97%] justify-between items-center z-10">
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

        {/* Bottom Highlight - Mobile (Single centered) */}
        <div className="md:hidden absolute bottom-8 w-full flex justify-center items-center z-10 px-4">
          <p className="text-white text-[4vw] sm:text-[3.5vw] font-bold">
            <span className={`${gideon.className} font-bold`}>CONVERT EXCELLENCE</span>
          </p>
        </div>

        {/* Background Video */}
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover brightness-[0.6]"
          loop
          autoPlay
          muted
          playsInline
          src="https://www.fundamental.bg/videos/hero-video.webm"
        ></video>
      </div>
    </div>
  );
}

export default Hero;