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
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const animationsInitialized = useRef(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const initializeAnimations = useCallback(() => {
    if (animationsInitialized.current || !window.gsap || !window.ScrollTrigger) return;

    animationsInitialized.current = true;
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Pin the title
    window.ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: titleRef.current,
      pinSpacing: false
    });

    // Animate cards - faster and smoother, only once
    document.querySelectorAll('.process-card').forEach((card, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.98,
          rotationX: 5
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none", // Only play once
            invalidateOnRefresh: true
          }
        }
      );
    });

    // Animate numbers with stagger effect
    document.querySelectorAll('.process-number-display').forEach((number, index) => {
      gsap.fromTo(number,
        { 
          opacity: 0, 
          x: -40,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: number,
            start: "top 85%",
            toggleActions: "play none none none" // Only play once
          }
        }
      );
    });

    // Animate card content
    document.querySelectorAll('.card-content').forEach((content, index) => {
      gsap.fromTo(content,
        { 
          opacity: 0, 
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none none" // Only play once
          }
        }
      );
    });

  }, []);

  useEffect(() => {
    let scriptsLoaded = 0;
    const totalScripts = 2;

    const checkScriptsLoaded = () => {
      scriptsLoaded++;
      if (scriptsLoaded === totalScripts) {
        setTimeout(initializeAnimations, 100);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = checkScriptsLoaded;
    script.onerror = () => console.error('Failed to load GSAP');
    document.head.appendChild(script);

    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.onload = checkScriptsLoaded;
    scrollTriggerScript.onerror = () => console.error('Failed to load ScrollTrigger');
    document.head.appendChild(scrollTriggerScript);

    return () => {
      animationsInitialized.current = false;
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }

      [script, scrollTriggerScript].forEach(scriptEl => {
        if (scriptEl && document.head.contains(scriptEl)) {
          document.head.removeChild(scriptEl);
        }
      });
    };
  }, [initializeAnimations]);

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div ref={containerRef} className='relative bg-black text-white overflow-hidden min-h-screen'>
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
      <div ref={titleRef} className="w-full  bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="text-center py-8 leading-none">
          <h3
            className="font-extrabold leading-none select-none transition-all duration-500"
            style={{
              fontSize: 'clamp(4rem, 10vw, 12rem)',
              textShadow: '0 0 30px rgba(255,255,255,0.3)',
              willChange: 'transform',
              fontFamily: 'Gideon Roman, serif'
            }}
          >
            <span className="font-sans text-white">OUR</span>{' '}
            <span 
              className={`bg-clip-text text-transparent transition-all duration-500 ${
                hoveredCard !== null 
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
      <div ref={contentRef} className="relative z-10 pb-24 px-4 sm:px-12 max-w-7xl mx-auto" style={{ marginTop: '20vh' }}>
        <div className="flex flex-col gap-24 w-full">
          {processData.map((process, index) => (
            <div key={process.id} className={`w-full flex ${
              // Zig-zag pattern aligned with "OUR" and "PROCESS"
              index % 2 === 0 
                ? 'justify-start' 
                : 'justify-end'
            }`}>
              {/* Card */}
              <div 
                className={`process-card relative min-h-[400px] w-full max-w-4xl lg:max-w-3xl xl:max-w-4xl border-2 rounded-2xl shadow-lg transition-all duration-300 transform-gpu will-change-transform overflow-hidden ${
                  hoveredCard === index 
                    ? 'border-green-400 shadow-green-400/20' 
                    : 'border-gray-500 shadow-black/20'
                }`}
                style={{
                  boxShadow: hoveredCard === index 
                    ? '0 0 30px rgba(74, 222, 128, 0.3), 0 10px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
              >
                <div className="card-content relative h-full w-full bg-gradient-to-br from-gray-900 to-black flex flex-col md:flex-row items-start md:items-center justify-start gap-8 p-10 md:p-16">
                  
                  {/* Large number inside card - always on left */}
                  <div className="flex-shrink-0 ">
                    <div 
                      className={`process-number-display font-bold leading-none transition-all duration-300 text-left ${
                        hoveredCard === index ? 'gradient-text-hover' : 'gradient-text'
                      }`}
                      style={{
                        fontSize: 'clamp(5rem, 10vw, 8rem)',
                        fontFamily: 'Gideon Roman, serif',
                        textShadow: hoveredCard === index ? '0 0 20px rgba(251, 191, 36, 0.5)' : '0 0 20px rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      {process.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6 text-left">
                    <h4 
                      className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide transition-all duration-300 ${
                        hoveredCard === index ? 'text-green-400' : 'text-gray-100'
                      }`}
                      style={{ fontFamily: 'Gideon Roman, serif' }}
                    >
                      {process.title}
                    </h4>
                    
                    <h5 className={`text-xl md:text-2xl font-sans italic transition-all duration-300 ${
                      hoveredCard === index ? 'text-yellow-300' : 'text-amber-200'
                    }`}>
                      {process.subtitle}
                    </h5>
                    
                    <p className={`font-sans text-lg md:text-xl leading-relaxed tracking-wide transition-all duration-300 ${
                      hoveredCard === index ? 'text-gray-200' : 'text-zinc-300'
                    }`}>
                      {process.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Process;