"use client"
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mock projects data
const projects = [
  {
    industry: "E-Commerce",
    title: "Luxury Fashion Platform",
    description: "A sophisticated e-commerce experience designed to elevate brand presence and drive conversions through intuitive design and seamless user journeys.",
    deliverables: ["UI/UX Design", "Brand Identity", "Responsive Development", "Performance Optimization"],
    problem: "The existing platform lacked visual appeal and had a complex checkout process that led to high cart abandonment rates.",
    solution: "We redesigned the entire user experience with a focus on visual storytelling, simplified navigation, and a streamlined one-page checkout that increased conversions by 47%.",
    images: [  
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop" },
      { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop" }
    ]
  },
  {
    industry: "Technology",
    title: "SaaS Dashboard Redesign",
    description: "Complete overhaul of a complex enterprise dashboard to improve usability, data visualization, and overall user satisfaction.",
    deliverables: ["Product Design", "Design System", "Interactive Prototypes", "User Testing"],
    problem: "Users struggled to find key metrics and perform routine tasks efficiently, leading to poor adoption rates and increased support tickets.",
    solution: "We created a modular, customizable dashboard with intuitive data visualization and contextual help, reducing time-to-task by 60% and support tickets by 35%.",
    images: [
      { url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop" },
      { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop" },
      { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop" }
    ]
  }
];

const WebDesignWork = ({ toggleContactForm }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      // Animate project sections
      gsap.utils.toArray('.project-text').forEach((text) => {
        gsap.from(text.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
          }
        });
      });

      // Animate images
      gsap.utils.toArray('.project-image').forEach((img) => {
        gsap.from(img, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          }
        });
      });

      // Pin left sections on desktop
      if (!isMobile) {
        gsap.utils.toArray('.pin-section').forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: section.querySelector('.pin-content'),
            pinSpacing: false,
          });
        });
      }

      // Animate CTA
      gsap.from('.cta-section > *', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.cta-section',
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {projects.map((project, idx) => (
        <div key={idx} className="flex flex-col lg:flex-row min-h-screen">
          
          {/* LEFT - Text Content (Desktop) */}
          <div className="hidden lg:block lg:w-[40%] pin-section">
            <div className="pin-content sticky top-0 h-screen flex items-center bg-zinc-950 px-12 xl:px-16">
              <div className="project-text max-w-xl w-full space-y-8 pt-16">
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-8 bg-green-400"></span>
                    <span className="text-green-400 text-xs uppercase tracking-widest font-semibold">
                      {project.industry}
                    </span>
                  </div>
                  <h2 className="text-5xl xl:text-8xl font-bold leading-tight">{project.title}</h2>
                </div>
                <br />

                <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>

<br />
                {/* Deliverables */}
                <div className="space-y-4">
                  <h3 className="text-green-400 text-sm uppercase tracking-wider font-semibold">Deliverables</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.deliverables.map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <br />

                {/* Problem & Solution */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-green-400 text-sm uppercase tracking-wider font-semibold">Problem</h3>
                    <p className="text-gray-300 leading-relaxed">{project.problem}</p>
                  </div>

<br />
                  <div className="space-y-3">
                    <h3 className="text-green-400 text-sm uppercase tracking-wider font-semibold">Solution</h3>
                    <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                  </div>
                </div>
                <br />

                {/* CTA Buttons */}
                <div className="flex flex-col  sm:flex-row gap-4 pt-4">
                  {/* <button
                    onClick={toggleContactForm}
                    className="px-8 py-4 bg-white text-black font-semibold text-sm rounded-full 
                             hover:bg-green-400 hover:scale-105 transition-all duration-300"
                  >
                    VIEW PROJECT
                  </button> */}
                  
                  <button className="px-8 py-4 border  border-gray-600 text-white font-semibold text-sm rounded-full 
                             hover:border-green-400 hover:text-green-400 transition-all duration-300" style={{backgroundColor:"green", padding: "3px 5px", borderRadius:"4px"}}>
                    VISIT SITE
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT - Images */}
          <div className="lg:w-[60%]">
            
            {/* Mobile Text Header */}
            <br />
            <div className="lg:hidden px-6 py-12 bg-zinc-950 project-text">
              <div className="space-y-6 pt-8">
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-green-400"></span>
                  <span className="text-green-400 text-xs uppercase tracking-widest font-semibold">
                    {project.industry}
                  </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight">{project.title}</h2>
                <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>
                
                <div className="space-y-4 pt-2">
                  <h3 className="text-green-400 text-sm uppercase tracking-wider font-semibold">Deliverables</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>


              </div>
            </div>

              {/* Mobile Problem/Solution */}
              <div className="lg:hidden px-6 py-12 bg-zinc-950 space-y-8">
              <div className="space-y-3">
                <h3 className="text-green-400 text-sm uppercase tracking-wider font-semibold">Problem</h3>
                <p className="text-gray-300 leading-relaxed">{project.problem}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-green-400 text-sm uppercase tracking-wider font-semibold">Solution</h3>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

                            {/* Mobile CTA Buttons */}
                <br />
                <div className="flex flex-col items-start gap-3 pt-4 lg:hidden">
                  {/* <button
                    onClick={toggleContactForm}
                    className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-full 
                             hover:bg-green-400 transition-all duration-300"
                  >
                    VIEW PROJECT
                  </button> */}
                  <button className="px-6 py-3 border  border-gray-600 text-white font-semibold text-sm rounded-full 
                             hover:border-green-400 hover:text-green-400 transition-all duration-300" style={{backgroundColor:"green", padding: "3px 5px", borderRadius:"4px"}}>
                    VISIT SITE
                  </button>
                  <br />
                </div>

            {/* Images */}
            {project.images.map((image, i) => (
              <div key={i} className="min-h-[40vh]  lg:min-h-screen  flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-5xl">
                  <br />
                  <div className="project-image group relative overflow-hidden rounded-2xl shadow-2xl  h-[50vh] lg:h-[70vh] cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src={image.url}
                      alt={`${project.title} showcase`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}

            
          

          </div>
        </div>
      ))}

      {/* CTA Section */}
<div className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-zinc-900 to-black text-white">
  <section className="max-w-4xl w-full text-center space-y-16">
    
    {/* Subtitle */}
    <div className="flex items-center justify-center gap-4 text-base text-green-400 tracking-widest uppercase font-medium">
      <span className="h-px w-12 bg-green-400" />
      Let's Create Together
      <span className="h-px w-12 bg-green-400" />
    </div>

 
<br />
    {/* Description */}
    <p className="text-gray-400 text-lg sm:text-xl  leading-tight  text-center">
      Let’s collaborate on digital experiences that are beautiful, functional, and impactful — built to resonate with your audience.
    </p>

<br />
    {/* CTA Button */}
    <div>
      <button
        onClick={toggleContactForm}
        className="inline-flex items-center gap-3 px-10 py-4 text-white text-base sm:text-lg font-semibold rounded-full transition-all duration-300 bg-green-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-500"
        style={{backgroundColor:"green", padding: "3px 5px", borderRadius:"4px"}}
      >
        Start a Project
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>

    <br />

    {/* Trust Indicators */}
    <div className="flex justify-center flex-wrap gap-10 leading-0 text-base text-gray-500 pt-8">
      {['Fast Response', 'Professional Team', 'Premium Quality'].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {item}
        </div>
      ))}
    </div>

  </section>
</div>



    </div>
  );
};

export default WebDesignWork;