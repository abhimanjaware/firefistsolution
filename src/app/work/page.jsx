"use client"
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from './projects.json';
import Navbar from '../home-components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const WebDesignWork = ({ toggleContactForm }) => {
  const [imageLoaded, setImageLoaded] = useState({});
  const refs = {
    container: useRef(null),
    leftSec: useRef([]),
    rightSec: useRef([]),
    projectContainers: useRef([]),
    cta: useRef(null),
    imageContainers: useRef([])
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      refs.projectContainers.current.forEach((section, i) => {
        if (!section) return;
        const left = section.querySelector('.left-section');

        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? "top 85%" : "top 75%",
          onEnter: () => {
            if (left?.children) gsap.to(left.children, { 
              opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" 
            });
          },
          toggleActions: "play none none none"
        });

        if (!isMobile) {
          const rights = refs.rightSec.current.slice(i * 3, (i + 1) * 3);
          if (refs.leftSec.current[i] && rights[0] && rights[2]) {
            ScrollTrigger.create({
              trigger: rights[0],
              start: "top top",
              end: () => `+=${rights[2].offsetHeight * 2.5}`,
              pin: refs.leftSec.current[i],
              pinSpacing: false,
              anticipatePin: 1
            });
          }
        }
      });

      refs.rightSec.current.forEach(section => {
        if (!section) return;
        const image = section.querySelector('img');
        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? "top 85%" : "top 80%",
          onEnter: () => gsap.to(image, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }),
          toggleActions: "play none none none"
        });
      });

      if (refs.cta.current?.children) {
        ScrollTrigger.create({
          trigger: refs.cta.current,
          start: "top 80%",
          onEnter: () => gsap.to(refs.cta.current.children, { 
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.6)" 
          }),
          toggleActions: "play none none none"
        });
      }

      ScrollTrigger.refresh();
    }, refs.container);

    return () => ctx.revert();
  }, []);

  const ImageDisplay = ({ image, index }) => {
    const imageKey = `img-${index}`;
    return (
      <div
        ref={el => (refs.imageContainers.current[index] = el)}
        className="image-container relative overflow-hidden rounded-xl shadow-2xl h-[60vw] sm:h-[45vw] md:h-[35vw] lg:h-[28vw] cursor-pointer transform transition-all duration-500 bg-black"
        onMouseEnter={e => {
          const imgEl = e.currentTarget.querySelector('img');
          gsap.to(imgEl, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        }}
        onMouseLeave={e => {
          const imgEl = e.currentTarget.querySelector('img');
          gsap.to(imgEl, { scale: 1, duration: 0.4, ease: "power2.out" });
        }}
      >
        <img 
          src={image.url} 
          alt="project showcase" 
          className={`w-full h-full object-cover transition-all duration-300 ease-out ${imageLoaded[imageKey] ? 'opacity-100' : 'opacity-0'}`} 
          onLoad={() => setImageLoaded(prev => ({ ...prev, [imageKey]: true }))}
        />
      </div>
    );
  };

  return (
    <>
    <Navbar/>
     <div className="overflow-hidden relative bg-black text-white" ref={refs.container}>
      {projects.map((project, i) => (
        <div key={i} className="flex flex-col lg:flex-row min-h-[100vh] lg:min-h-[300vh]" ref={el => (refs.projectContainers.current[i] = el)}>
          {/* LEFT TEXT SECTION */}
          <div ref={el => (refs.leftSec.current[i] = el)} className="w-full lg:w-[35vw] bg-zinc-950/50 hidden lg:flex    sticky top-0 h-screen" style={{padding:"25px 25px"}}>
            <div className="text-left px-6 xl:px-10 left-section max-w-md space-y-6">
              <br />
              <span className="text-green-400 font-semibold tracking-wide text-sm uppercase">{project.industry}</span>
              
              <h3 className="text-white font-extrabold text-[2.9vw] leading-tight uppercase">{project.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>
              
              <div>

                <br />
                <br />
                <h5 className="text-green-400 font-medium text-9xlxl uppercase mb-2">Deliverables</h5>
                <ul className="space-y-1 text-gray-200 text-sm">
                  {project.deliverables.map((d, idx) => <li key={idx}>• {d}</li>)}
                </ul>
              </div>

                <br />
                <br />

              <div>
                <h5 className="text-green-400 font-medium text-9xlxl uppercase mb-2">Problem</h5>
                <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
              </div>
               
  <br />
                <br />

              <div>
                <h5 className="text-green-400 font-medium text-9xlxl uppercase mb-2">Solution</h5>
                <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
              </div>



<br /><br />
              {/* button */}
          <div className="flex items-center">
  <div className="w-[100px] md:w-[140px] hover:w-[160px] md:hover:w-[200px] relative h-[6vh] md:h-[6vh] flex justify-center items-center rounded-xl cursor-pointer group overflow-hidden z-[50] transition-all duration-500 ease-in-out">
    {/* Background layer */}
    <div className="absolute inset-0 bg-gradient-to-r from-white to-green-400 rounded-xl transition-all duration-500 ease-in-out"></div>

    {/* Text layer */}
    <p className="relative text-xs md:text-[0.9vw] text-black font-medium z-10 transition-all duration-500 ease-in-out group-hover:tracking-wider group-hover:text-sm md:group-hover:text-[1vw] group-hover:text-black">
      CONNECT US
    </p>
  </div>
</div>

            </div>
          </div>

          {/* RIGHT IMAGES SECTION */}
         <div className="w-full lg:w-[70vw]">
  {project.images.map((image, j) => (
    <div 
      key={j} 
      ref={el => (refs.rightSec.current[i * 3 + j] = el)} 
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ${j % 2 === 0 ? "bg-black" : "bg-black"}`}
    >
      <div className="w-full max-w-6xl flex items-center justify-center ">
        <ImageDisplay 
          image={image} 
          index={i * 3 + j} 
          className="w-auto h-[120vh] object-contain" 
        />
      </div>
    </div>
  ))}
</div>

        </div>
      ))}

      {/* CTA SECTION */}
<div 
  ref={refs.cta} 
  className="min-h-screen relative flex items-center justify-center overflow-hidden"
>
  {/* Animated Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black animate-gradient" />

  {/* Overlay with soft glow */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

  {/* Decorative floating shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-16 w-56 h-56 bg-green-400/10 rounded-full blur-2xl animate-bounce-slow" />
  </div>

  <div className="relative text-center text-white max-w-4xl px-6">
    {/* Subtitle with accent line */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <span className="h-[2px] w-12 bg-green-400" />
      <p className="uppercase tracking-[0.3em] text-sm sm:text-xl text-green-400">
        Let’s Work Together
      </p>
      <span className="h-[2px] w-12 bg-green-400" />
    </div>

<br />
    {/* Subheading */}
    <p className="text-gray-300 text-lg sm:text-xl md:text-4xl mb-12   leading-none">
      Let’s build a <span className="text-green-400 font-semibold">digital presence</span> 
      that inspires trust and drives measurable impact.
    </p>

    <br />

    {/* Creative Button with ring hover */}
 <div className="flex items-center justify-center">
  <div
    className="relative group cursor-pointer w-[180px] md:w-[220px] h-[60px] md:h-[70px] 
               rounded-2xl overflow-hidden transition-all duration-500 ease-in-out"
  >
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 
                    bg-[length:200%_200%] animate-[gradientMove_4s_linear_infinite] opacity-90 
                    group-hover:opacity-100 transition duration-500 rounded-2xl" />

    {/* Glow border effect */}
    <div className="absolute inset-0 rounded-2xl border border-green-400/40 shadow-[0_0_20px_rgba(34,197,94,0.3)] 
                    group-hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all duration-500" />

    {/* Text */}
    <p className="relative z-10 h-full flex items-center justify-center font-bold tracking-wide 
                  text-sm md:text-lg text-white group-hover:scale-110 group-hover:tracking-[0.2em] 
                  transition-all duration-500 ease-in-out">
      START A PROJECT
    </p>
  </div>
</div>


  </div>
</div>



    </div>
    </>
   
  );
};

export default WebDesignWork;
