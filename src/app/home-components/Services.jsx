import React, { useState, useEffect } from 'react';

const servicesData = [
  {
    title: 'SOFTWARE DEVELOPMENT',
    sublist: [
      '→ Web Applications',
      '→ Frontend & Backend',
      '→ APIs & Integrations',
      '→ Modern Tech Stack',
      '→ Scalable Solutions'
    ],
    video: 'https://videos.pexels.com/video-files/7849229/7849229-uhd_1440_2732_25fps.mp4'
  },
  {
    title: 'WEBSITE DEVELOPMENT',
    sublist: [
      '→ Responsive Design',
      '→ SEO Optimization',
      '→ Custom UI/UX',
      '→ CMS Integration',
      '→ Landing Pages'
    ],
    video: 'https://videos.pexels.com/video-files/5377268/5377268-uhd_1440_2560_25fps.mp4'
  },
  {
    title: 'ANDROID DEVELOPMENT',
    sublist: [
      '→ Native Android Apps',
      '→ Firebase Integration',
      '→ Play Store Deployment',
      '→ Modern UI Components',
      '→ Optimized Performance'
    ],
    video: 'https://videos.pexels.com/video-files/6331338/6331338-hd_1080_1920_30fps.mp4'
  }
];

function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="service-interface bg-black min-h-screen w-full z-[70] pt-16 md:pt-20 lg:pt-[10vw] pb-8 md:pb-12 lg:pb-0" style={{paddingTop:"10vw"}}>
      {/* Heading Section */}
      <div className="heading w-full text-center flex flex-col items-center justify-center mb-12 md:mb-16 lg:mb-0 lg:h-[15vh] px-4" style={{marginBottom:"10vw"}}>
        <h3 className="leading-none text-white font-extrabold text-[22vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[7vw]" style={{ fontWeight: "800", fontSize:"7vw" }}>
          CRAFTED{" "}
          <span
            className={`font-serif italic transition-all duration-300 ease-in-out ${
              hoveredIndex !== null || isMobile
                ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400"
                : "text-white"
            }`}
          style={{fontWeight:"100"}}>
            Solutions
          </span>
        </h3>
        {/* Gradient Dash Underline */}
        <div
          className={`h-[2px] w-[15vw] sm:w-[12vw] lg:w-[10vw] mt-2 rounded-full transition-all duration-300 ${
            hoveredIndex !== null || isMobile
              ? "opacity-100 bg-gradient-to-r from-white to-green-400"
              : "opacity-0"
          }`}
        />
      </div>

      {/* Cards Container */}
      <div className="card-container w-full flex flex-col lg:flex-row items-center lg:items-end justify-center gap-6 md:gap-8 lg:gap-16 px-4 md:px-8 lg:px-0 lg:h-[85vh]" >
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl overflow-hidden border bg-black text-white transform transition-all duration-500
              ${isMobile ? 'w-full max-w-[500px] h-[70vh] sm:h-[75vh]' : 'w-full max-w-[500px] lg:w-[30vw] h-[65vh] sm:h-[70vh] lg:h-[75vh]'}
              ${
                hoveredIndex === index || isMobile
                  ? "border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.35)]"
                  : "border-zinc-950"
              }
              ${hoveredIndex === index && !isMobile ? "scale-105" : "scale-100"}
            `}
            style={{ 
              marginBottom: !isMobile && index === 1 ? "20px" : "0px", border:"1px solid #212529"
            }}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
           >
            {/* Background Video */}
            <video
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0
                ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}
              autoPlay
              loop
              muted
              playsInline
              src={service.video}
            />

            {/* Shadow Overlay */}
            <div className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 z-10 pointer-events-none
              ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `} />

            {/* Content */}
            <div className={`relative z-20 h-full w-full flex flex-col items-center text-center px-4 sm:px-6 lg:px-0 lg:pl-[3%] lg:pt-[10%]
              ${isMobile ? 'justify-center' : 'justify-start'}
            `}>
              {/* Main Title */}
              <p className={`font-bold transition-all leading-none duration-700 ease-in-out
                text-[7vw] sm:text-[6vw] md:text-[5vw] lg:text-[2.5vw]
                ${isMobile 
                  ? 'mb-8 sm:mb-10' 
                  : 'translate-y-[35vh] group-hover:-translate-y-[-15vh]'
                }
              `}>
                {service.title.split(' ').map((word, i) => (
                  <span key={i}>{word} <br /></span>
                ))}
              </p>

              {/* Subtext List */}
              <div className={`flex flex-col gap-2 text-zinc-300 transition-opacity duration-400 delay-100 ease-in-out
                text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[1.1vw]
                ${isMobile 
                  ? 'opacity-100' 
                  : 'opacity-0 group-hover:opacity-100 translate-y-[24vh] group-hover:translate-y-[24vh]'
                }
              `} style={{paddingTop:"2vw"}}>
                {service.sublist.map((item, i) => (
                  <p key={i}>
                    <span className="font-serif italic">{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;