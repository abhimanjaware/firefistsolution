import React, { useState, useEffect } from "react";
import { Gideon_Roman } from "next/font/google";

const gideon = Gideon_Roman({
  subsets: ["latin"],
  weight: ["400"],
});

function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="footer-container" style={{marginTop:"10vw"}}>
      <div className="footer-interface min-h-[55vh] md:min-h-[65vh] lg:h-[80vh] flex justify-center w-full relative text-center bg-black overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 w-full h-full object-cover opacity-70 saturate-150 blur-[2px] md:blur-md md:scale-125"
          src="https://www.fundamental.bg/videos/footer-video.webm"
          poster="/fallback-poster.jpg"
        ></video>

        {/* START A PROJECT Button */}
        <div className="flex absolute top-[20%] md:top-[30%] items-center justify-center w-full px-4">
          <div className="w-[140px] sm:w-[180px] md:w-[200px] hover:w-[180px] sm:hover:w-[200px] md:hover:w-[280px] relative h-[6.5vh] sm:h-[7.5vh] md:h-[10vh] flex justify-center items-center rounded-2xl cursor-pointer group overflow-hidden z-[50] transition-all duration-500 ease-in-out">
            {/* Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-white to-green-400 rounded-2xl transition-all duration-500 ease-in-out ${
                isMobile ? "blur-[30px]" : "group-hover:blur-[100px]"
              }`}
            ></div>
            {/* Text */}
            <p className="relative text-xs sm:text-sm md:text-[1vw] text-black font-semibold z-10 transition-all duration-500 ease-in-out group-hover:tracking-wider group-hover:text-sm md:group-hover:text-[1.2vw] group-hover:text-white">
              START A PROJECT
            </p>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="backdrop-blur-xl text-white w-full md:w-[90%] border-t border-zinc-400 flex absolute bottom-0 py-4">
          <ul className="grid grid-cols-2 md:flex md:flex-row justify-center md:justify-between items-center gap-3 md:gap-0 w-full px-4 md:px-6 text-xs sm:text-sm md:text-md font-medium text-center">
            <li className="group flex items-center justify-center gap-1 md:gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l3.6 7.59-1.35 2.44A1 1 0 008 17h9a1 1 0 100-2H9.42a1 1 0 01-.93-.63L8.1 13h7.45a1 1 0 00.92-.61l3.24-7.24A1 1 0 0019 4H6.21z" />
              </svg>
              <span className="gradient-hover-text">9689762896</span>
            </li>
            <li className="group flex items-center justify-center gap-1 md:gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
              </svg>
              <span className="gradient-hover-text">hello@firefist</span>
            </li>
            <li className="group flex items-center justify-center gap-1 md:gap-2 cursor-pointer col-span-2 md:col-span-1">
              <span className="gradient-hover-text text-[10px] sm:text-xs">
                © Firefist Solutions. All rights reserved.
              </span>
            </li>
            <li className="group flex items-center justify-center gap-1 md:gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 01-12 0 6 6 0 0112 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l4.5 4.5" />
              </svg>
              <span className="gradient-hover-text">LinkedIn</span>
            </li>
            <li className="group flex items-center justify-center gap-1 md:gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M2 12h20" />
              </svg>
              <span className="gradient-hover-text">Instagram</span>
            </li>
          </ul>
        </div>

        {/* Brand Text */}
        <div className="h-full w-full relative flex justify-center items-end pb-8 z-30">
          <p
            className="text-white leading-none text-center font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-[9.5vw] tracking-tight"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onClick={() => isMobile && setIsHovered(!isHovered)}
          >
            FIREFIST{" "}
            <span
              className={`${gideon.className} transition-all duration-300 ease-in-out ${
                isHovered || isMobile
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400"
                  : "text-white"
              }`}
            >
              SOLUTIONS
            </span>
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .gradient-hover-text {
          background: linear-gradient(to right, white, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Footer;
