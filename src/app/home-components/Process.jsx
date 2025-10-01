"use client";
import React, { useEffect, useRef, useCallback, useState } from 'react';

const processData = [
  {
    id: 1,
    number: "01",
    title: "PREMIUM DISCOVERY",
    subtitle: "Understanding luxury positioning",
    description: "We analyze your premium brand positioning, target audience expectations, and competitive landscape to develop animation strategies that elevate your brand above the competition."
  },
  {
    id: 2,
    number: "02", 
    title: "MOTION STRATEGY",
    subtitle: "Choreographing premium experiences",
    description: "Our team develops comprehensive animation strategies, creating motion systems that enhance brand storytelling and guide users through premium experiences that feel luxurious and intuitive."
  },
  {
    id: 3,
    number: "03",
    title: "DEVELOPMENT & ANIMATION", 
    subtitle: "Crafting with precision",
    description: "We build responsive websites, dynamic web applications, and fluid Android apps using cutting-edge animation technologies, ensuring every interaction maintains 60fps performance across all devices."
  },
  {
    id: 4,
    number: "04",
    title: "OPTIMIZATION & LAUNCH",
    subtitle: "Perfecting premium performance", 
    description: "We conduct extensive testing, performance optimization, and quality assurance to ensure your premium animated experience loads quickly and performs flawlessly for your discerning audience."
  }
];

function Process() {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Auto-hover first card on mobile for better UX
  useEffect(() => {
    if (isMobile && hoveredCard === null) {
      setHoveredCard(0);
    }
  }, [isMobile, hoveredCard]);

  const handleCardHover = (index) => {
    if (!isMobile) setHoveredCard(index);
  };

  const handleCardLeave = () => {
    if (!isMobile) setHoveredCard(null);
  };

  const handleCardClick = (index) => {
    if (isMobile) {
      setHoveredCard(hoveredCard === index ? 0 : index);
    }
  };

  return (
    <div ref={containerRef} className='relative flex flex-col items-center bg-black text-white overflow-hidden min-h-screen'>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Gideon+Roman:wght@400&display=swap');
        
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-text-hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Fixed Title */}
      <div className="w-full bg-black bg-opacity-90 backdrop-blur-sm z-20 relative">
        <div className={`text-center leading-none ${isMobile ? 'py-8 my-8' : 'py-8'}`}>
          <h3
            className="font-extrabold leading-none select-none"
            style={{
              fontSize: isMobile ? 'clamp(2rem, 10vw, 4rem)' : 'clamp(2.5rem, 8vw, 8rem)',
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              fontFamily: 'Gideon Roman, serif',
              paddingTop:"8vw"
            }}
          >
            <span className="font-sans text-white">OUR</span>{' '}
            <span 
              className={`bg-clip-text text-transparent ${
                hoveredCard !== null && !isMobile
                  ? 'bg-gradient-to-r from-white to-green-400' 
                  : 'bg-gradient-to-r from-white via-gray-300 to-white'
              }`}
              style={{ fontFamily: 'Gideon Roman, serif' }}
            >
              PROCESS
            </span>
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pb-12 md:pb-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto" 
           style={{ marginTop: isMobile ? '2vh' : isTablet ? '10vh' : '20vh' }}>
        
        <div className="flex flex-col gap-6 md:gap-16 lg:gap-24 w-full">
          {processData.map((process, index) => (
            <div key={process.id} className={`w-full flex ${isMobile ? 'justify-center' : index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              
              {/* Card */}
              <div 
                className={`relative min-h-[220px] md:min-h-[340px] lg:min-h-[400px] w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl border-2 rounded-2xl shadow-lg transition-all duration-300 transform-gpu overflow-hidden ${
                  (hoveredCard === index) ? 'border-green-400 shadow-green-400/20 scale-[1.02]' : 'border-gray-500 shadow-black/20'
                } ${isMobile ? 'cursor-pointer' : ''}`}
                style={{
                  boxShadow: (hoveredCard === index) 
                    ? '0 0 20px rgba(74, 222, 128, 0.3), 0 8px 30px rgba(0, 0, 0, 0.3)' 
                    : '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                onClick={() => handleCardClick(index)}
              >
                <div className={`relative h-full w-full bg-gradient-to-br from-gray-900 to-black flex flex-col md:flex-row items-start md:items-center justify-start gap-4 md:gap-6 lg:gap-8 ${
                  isMobile ? 'p-6' : 'p-6 md:p-8 lg:p-10 xl:p-12'
                }`} style={{padding:"10px"}}>
                  
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div 
                      className={`font-bold leading-none text-left ${
                        (hoveredCard === index) ? 'gradient-text-hover' : 'gradient-text'
                      }`}
                      style={{
                        fontSize: isMobile ? 'clamp(2.5rem, 10vw, 3.5rem)' : 'clamp(3rem, 8vw, 5rem)',
                        fontFamily: 'Gideon Roman, serif',
                        textShadow: (hoveredCard === index) 
                          ? '0 0 15px rgba(251, 191, 36, 0.5)' 
                          : '0 0 15px rgba(34, 197, 94, 0.3)',
                      }}
                    >
                      {process.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 md:space-y-4 lg:space-y-6 text-left">
                    <h4 
                      className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wide transition-colors duration-300 ${
                        (hoveredCard === index) ? 'text-green-400' : 'text-gray-100'
                      }`}
                      style={{ fontFamily: 'Gideon Roman, serif' }}
                    >
                      {process.title}
                    </h4>
                    
                    <h5 className={`text-base md:text-lg lg:text-xl font-sans italic transition-colors duration-300 ${
                      (hoveredCard === index) ? 'text-yellow-300' : 'text-amber-200'
                    }`}>
                      {process.subtitle}
                    </h5>
                    
                    <p className={`font-sans text-sm md:text-base lg:text-lg leading-relaxed tracking-wide transition-colors duration-300 ${
                      (hoveredCard === index) ? 'text-gray-200' : 'text-zinc-300'
                    }`}>
                      {process.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay - desktop only */}
                {!isMobile && (
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent transition-opacity duration-300 pointer-events-none ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Process;