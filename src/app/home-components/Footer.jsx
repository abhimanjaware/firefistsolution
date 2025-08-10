import React, { useState } from 'react';
import { Gideon_Roman } from 'next/font/google';
import { Mail, Phone, Copyright, Linkedin, Instagram } from "lucide-react";


const gideon = Gideon_Roman({
  subsets: ['latin'],
  weight: ['400'],
});

function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className="footer-interface h-[80vh] flex justify-center w-full relative text-center bg-black overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="opacity-70 absolute top-[20%] scale-125 saturate-150 blur-md"
          src="https://www.fundamental.bg/videos/footer-video.webm"
        ></video>

<div className="  flex absolute top-[30%] items-center justify-center">
      <div className="w-[200px] hover:w-[280px] relative h-[10vh] flex justify-center items-center rounded-2xl cursor-pointer group overflow-hidden z-[50] transition-all duration-500 ease-in-out">
        {/* Background layer with animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white to-green-400 rounded-2xl transition-all duration-500 ease-in-out transform group-hover:blur-[100px]"></div>

        {/* Text layer */}
        <p className="relative text-[1vw] text-black font-semibold z-10 transition-all duration-500 ease-in-out group-hover:tracking-wider group-hover:text-[1.2vw] group-hover:text-white">
          START A PROJECT
        </p>
      </div>
    </div>





        {/* FOOTER LINKS */}
       <div className='backdrop-blur-xl  h-[10vh] text-white  w-[90%] border-zinc-400 flex  absolute bottom-50' style={{borderTop:"1px solid grey",borderBottom:"1px solid grey", }}>
  <ul className='flex justify-between items-center w-full h-full px-6 text-md font-medium'>
    <li className='group flex items-center gap-2 relative cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l3.6 7.59-1.35 2.44A1 1 0 008 17h9a1 1 0 100-2H9.42a1 1 0 01-.93-.63L8.1 13h7.45a1 1 0 00.92-.61l3.24-7.24A1 1 0 0019 4H6.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44A1 1 0 008 17h9a1 1 0 100-2H9.42a1 1 0 01-.93-.63L8.1 13h7.45a1 1 0 00.92-.61l3.24-7.24A1 1 0 0019 4H6.21z" />
      </svg>
      <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white after:to-green-400 group-hover:after:w-full after:transition-all after:duration-500">9689762896</span>
    </li>

    <li className='group flex items-center gap-2 relative cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
      </svg>
      <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white after:to-green-400 group-hover:after:w-full after:transition-all after:duration-500">hello@firefist</span>
    </li>

    <li className='group flex items-center gap-2 relative cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
      </svg>
      <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white after:to-green-400 group-hover:after:w-full after:transition-all after:duration-500">All right reserved @firefist solutions</span>
    </li>

    <li className='group flex items-center gap-2 relative cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 01-12 0 6 6 0 0112 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l4.5 4.5" />
      </svg>
      <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white after:to-green-400 group-hover:after:w-full after:transition-all after:duration-500">LinkedIn</span>
    </li>

    <li className='group flex items-center gap-2 relative cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M2 12h20" />
      </svg>
      <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white after:to-green-400 group-hover:after:w-full after:transition-all after:duration-500">Instagram</span>
    </li>
  </ul>
</div>


        {/* Bottom Text */}
        <div className="h-full w-full relative flex justify-center items-end pb-8 z-30">
          <p
            className="text-white leading-none whitespace-nowrap text-center font-extrabold text-[9.5vw]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            FIREFIST{" "}
            <span
              className={`${gideon.className} transition-all duration-300 ease-in-out ${
                isHovered
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400"
                  : "text-white"
              }`}
            >
              SOLUTIONS
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
