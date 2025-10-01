"use client";
import React, { useEffect, useRef, useCallback, useState } from 'react';

const projectsData = [
  {
    id: 1,
    name: "DIGITAL SUPREMACY",
    category: "Digital Marketing Agency",
    description:
      "A full-service digital marketing agency website delivering SEO, social media campaigns, and lead generation strategies with engaging animations and smooth navigation.",
    poster:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&auto=format&fit=crop&q=80",
    technologies: ["Next.js", "GSAP", "TailwindCSS", "Node.js"],
    year: "2024",
    website: "https://www.digitalsupremacy.in/",
  },
  {
    id: 2,
    name: "RADIAN MEDIA",
    category: "Advertisement Agency",
    description:
      "A creative platform for an advertisement agency showcasing branding, ad campaigns, and interactive case studies with immersive visuals.",
    poster:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80",
    technologies: ["React", "Framer Motion", "Express", "MongoDB"],
    year: "2023",
    website: "https://radianmedia.org/",
  },
  {
    id: 3,
    name: "CODEHUB",
    category: "Coding Classes",
    description:
      "An educational platform offering interactive coding tutorials, live classes, and progress tracking dashboards for aspiring developers.",
    poster:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&auto=format&fit=crop&q=80",
    technologies: ["Vue.js", "Firebase", "GSAP", "TailwindCSS"],
    year: "2024",
    website: "https://www.codehubindia.in/",
  },
  {
    id: 4,
    name: "GAM Healthcare",
    category: "Healthcare",
    description:
      "A consortium of physicians creating novel metrics of healthcare quality. We crafted a refined brand identity with updated visuals, a redesigned website, and an overhauled dashboard with user-friendly interface.",
    poster:
      "https://framerusercontent.com/images/Isxn4pK721ZR49FRlP7VbzfN6Oc.jpg?scale-down-to=2048",
    technologies: ["Framer", "Brand Identity", "UI/UX Design"],
    year: "2022",
    website: "https://gamhealthcare.com",
  },
];


function Work() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const cursorRef = useRef(null);
  const animationsInitialized = useRef(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const initializeAnimations = useCallback(() => {
    if (animationsInitialized.current || !window.gsap || !window.ScrollTrigger) return;

    animationsInitialized.current = true;
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    // Clear existing triggers
    window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Pin the title
    window.ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: titleRef.current,
      pinSpacing: false
    });

    // Animate project boxes
    document.querySelectorAll('.project-box').forEach((box, index) => {
      gsap.fromTo(box,
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true
          }
        }
      );
    });

  }, []);

  useEffect(() => {
    setProjectsVisible(true);

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
    script.onerror = () => {
      console.error('Failed to load GSAP');
    };
    document.head.appendChild(script);

    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.onload = checkScriptsLoaded;
    scrollTriggerScript.onerror = () => {
      console.error('Failed to load ScrollTrigger');
    };
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

  const handleProjectHover = (index) => {
    setHoveredProject(index);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
  };

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      ref={containerRef} 
      className='relative flex flex-col items-center bg-black text-white overflow-hidden min-h-screen'
      onMouseMove={handleMouseMove}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Gideon+Roman:wght@400&display=swap');
        
        .project-box {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .project-box:hover {
          transform: scale(1.02);
        }
        
        .project-box:hover .project-image {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        
        .project-image {
          transition: all 0.6s ease;
          filter: brightness(0.9);
        }
        
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          background: white;
          color: black;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.3);
        }
        
        .custom-cursor.visible {
          opacity: 1;
        }
        
        .project-box {
          cursor: none;
        }
      `}</style>

      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${hoveredProject !== null ? 'visible' : ''}`}
        style={{
          transform: `translate(${cursorPosition.x - 50}px, ${cursorPosition.y - 50}px)`
        }}
      >
        VISIT SITE
      </div>

      {/* Fixed Title */}
      <div ref={titleRef} className="w-full bg-black bg-opacity-90 backdrop-blur-sm z-20 relative">
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
                hoveredProject !== null 
                  ? 'bg-gradient-to-r from-white to-green-400' 
                  : 'bg-gradient-to-r from-white via-gray-300 to-white'
              }`}
              style={{ fontFamily: 'Gideon Roman, serif' }}
            >
              WORK
            </span>
          </h3>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative w-[90%] min-h-[150vh]" style={{ marginTop: '10vh' }}>
        
        {/* Project Box 1 - Top Left */}
        <div 
          className="project-box absolute top-0 left-0 w-[49.5%] h-[67vh] overflow-hidden rounded-lg"
          onMouseEnter={() => handleProjectHover(0)}
          onMouseLeave={handleProjectLeave}
          onClick={() => window.open(projectsData[0].website, '_blank')}
        >
          <div 
            className="project-image w-full h-full"
            style={{
              backgroundImage: `url("${projectsData[0].poster}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h3 className="text-white text-2xl font-bold mb-2">
              {projectsData[0].name}
            </h3>
            <p className="text-gray-300 text-sm">
              {projectsData[0].category}
            </p>
          </div>
        </div>

        {/* Project Box 2 - Top Right */}
        <div 
          className="project-box absolute top-0 right-0 w-[49.5%] h-[80vh] overflow-hidden rounded-lg"
          onMouseEnter={() => handleProjectHover(1)}
          onMouseLeave={handleProjectLeave}
          onClick={() => window.open(projectsData[1].website, '_blank')}
        >
          <div 
            className="project-image w-full h-full"
            style={{
              backgroundImage: `url("${projectsData[1].poster}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h3 className="text-white text-2xl font-bold mb-2">
              {projectsData[1].name}
            </h3>
            <p className="text-gray-300 text-sm">
              {projectsData[1].category}
            </p>
          </div>
        </div>

        {/* Project Box 3 - Bottom Left */}
        <div 
          className="project-box absolute bottom-0 left-0 w-[49.5%] h-[80vh] overflow-hidden rounded-lg"
          onMouseEnter={() => handleProjectHover(2)}
          onMouseLeave={handleProjectLeave}
          onClick={() => window.open(projectsData[2].website, '_blank')}
        >
          <div 
            className="project-image w-full h-full"
            style={{
              backgroundImage: `url("${projectsData[2].poster}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h3 className="text-white text-2xl font-bold mb-2">
              {projectsData[2].name}
            </h3>
            <p className="text-gray-300 text-sm">
              {projectsData[2].category}
            </p>
          </div>
        </div>

        {/* Project Box 4 - Bottom Right */}
        <div 
          className="project-box absolute bottom-0 right-0 w-[49.5%] h-[67vh] overflow-hidden rounded-lg"
          onMouseEnter={() => handleProjectHover(3)}
          onMouseLeave={handleProjectLeave}
          onClick={() => window.open(projectsData[3].website, '_blank')}
        >
          <div 
            className="project-image w-full h-full"
            style={{
              backgroundImage: `url("${projectsData[3].poster}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h3 className="text-white text-2xl font-bold mb-2">
              {projectsData[3].name}
            </h3>
            <p className="text-gray-300 text-sm">
              {projectsData[3].category}
            </p>
          </div>
        </div>

      </div>

      {/* BUTTON */}
      <div className="cta-item flex items-center justify-center" style={{marginTop:"70px"}}>
            <div className="relative group cursor-pointer w-[180px] md:w-[220px] h-[60px] md:h-[70px] rounded-2xl overflow-hidden transition-all duration-500 ease-in-out">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 opacity-90 group-hover:opacity-100 transition duration-500 rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl border border-green-400/40 shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all duration-500" />
              <p className="relative z-10 h-full flex items-center justify-center font-bold tracking-wide text-sm md:text-lg text-white group-hover:scale-110 group-hover:tracking-[0.2em] transition-all duration-500 ease-in-out">
                EXPLORE MORE
              </p>
            </div>
      </div>
    </div>
  );
}

export default Work;