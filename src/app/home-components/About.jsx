"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const animationsInitialized = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const initializeAnimations = useCallback(() => {
    if (
      animationsInitialized.current ||
      !window.gsap ||
      !window.ScrollTrigger ||
      isMobile
    )
      return;

    animationsInitialized.current = true;
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    // Clear existing animations
    window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Pin the title (desktop only)
    window.ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: titleRef.current,
      pinSpacing: false,
    });

    // Content animations (desktop only)
    gsap.fromTo(
      ".about-section",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      }
    );

    // Floating animation for stickers (desktop only)
    gsap.to(".sticker-element", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    let scriptsLoaded = 0;
    const totalScripts = 2;

    const checkScriptsLoaded = () => {
      scriptsLoaded++;
      if (scriptsLoaded === totalScripts) {
        setTimeout(initializeAnimations, 100);
      }
    };

    if (!window.gsap) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.onload = checkScriptsLoaded;
      document.head.appendChild(script);
    } else scriptsLoaded++;

    if (!window.ScrollTrigger) {
      const scrollTriggerScript = document.createElement("script");
      scrollTriggerScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
      scrollTriggerScript.onload = checkScriptsLoaded;
      document.head.appendChild(scrollTriggerScript);
    } else scriptsLoaded++;

    if (scriptsLoaded === totalScripts) {
      setTimeout(initializeAnimations, 100);
    }

    return () => {
      animationsInitialized.current = false;
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [initializeAnimations, isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden min-h-screen"
      style={{paddingTop:"5vw"}}
    >
      {/* Title */}
      <div
        ref={titleRef}
        className="w-full bg-black bg-opacity-90 backdrop-blur-sm"
      >
        <div className="text-center py-6 md:py-8 leading-none">
          <h3
            className="font-extrabold leading-none bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent select-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            ABOUT US
          </h3>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="founder-container z-50 w-full min-h-screen px-4 md:px-0"
      >
        {/* Section 1 */}
        <div className="founder-info w-full min-h-[10vh] flex flex-col items-center  md:items-start mt-12 md:mt-0">
          <div className="image-div w-full md:w-[90%] lg:w-[25vw] mb-8 md:mb-0">
            <img
              className={`${
                isMobile
                  ? "h-[20vh] w-[80%] mx-auto"
                  : "h-[30vh] md:h-[40vh] lg:h-[50vh] w-full"
              } object-cover rounded-lg`}
              src="https://framerusercontent.com/images/KYM3jaMHP2KwMnCrcmDnJCTAjU.png"
              alt="Designing for Impact and Clarity"
              style={{paddingTop:"30px"}}
            />

            <p className="text-2xl md:text-3xl lg:text-[2vw] font-bold mt-6  mb-4 text-start md:text-left" style={{paddingTop:"20px"}}>
              Designing for <br /> Impact and{" "}
              <span style={{ fontFamily: "Gideon Roman, serif" }}>Clarity</span>
            </p >

            {isMobile ? (
              <p className="text-sm leading-relaxed text-gray-300 text-start">
                Simple, bold designs that speak clearly and make an impact.  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nihil praesentium asperiores a
              </p>
            ) : (
              <>
                <p className="text-base md:text-lg lg:text-[1.1vw] leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nihil praesentium asperiores a voluptatibus quas aliquid labore
                  earum fugit expedita impedit sunt libero quisquam dolore ullam,
                  eaque facere explicabo ea tempora.
                </p>
                <p className="text-base md:text-lg lg:text-[1.1vw] leading-relaxed mt-6">
                  Repellat quisquam tempora eligendi suscipit architecto dolore
                  aspernatur! Cum exercitationem quisquam, modi dicta dolorum
                  tempora placeat facere provident quaerat quis.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Section 2 */}
        <div className="founder-info relative w-full min-h-[27vh] flex flex-col items-center mt-12 md:mt-0">
          <div className="image-div w-full md:w-[90%] lg:w-[25vw] md:absolute md:right-4 lg:right-[12%]">
            <p className="text-2xl md:text-3xl lg:text-[2vw] font-bold mt-6 mb-4 text-start md:text-left" style={{paddingTop:"40px"}}>
              From Marketing to{" "}
              <span style={{ fontFamily: "Gideon Roman, serif" }}> Freedom</span>
            </p>

            {isMobile ? (
              <p className="text-sm leading-relaxed text-gray-300 text-start">
                Creativity that transforms businesses into memorable brands.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  praesentium asperiores a ea
              </p>
            ) : (
              <>
                <p className="text-base md:text-lg lg:text-[1.1vw] leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  praesentium asperiores a ea tempora.
                </p>
                <p className="text-base md:text-lg lg:text-[1.1vw] leading-relaxed mt-6">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Exercitationem omnis quia minus vel doloremque aut sint ipsa
                  dignissimos alias tenetur?
                </p>
                <p className="text-base md:text-lg lg:text-[1.1vw] leading-relaxed mt-6">
                  Consequuntur hic pariatur enim alias? Vero corporis nulla modi
                  ab fugit.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Section 3 */}
        <div className="founder-info relative w-full min-h-[40vh] flex flex-col items-center mt-12 md:mt-0">
          <div className="image-div w-full md:w-[90%] lg:w-[25vw] md:absolute md:left-4 lg:left-[12%]">
            <p className="text-2xl md:text-3xl lg:text-[2vw] font-bold mt-6 mb-4 text-start md:text-left">
              How Travel & Nature Shape{" "}
              <span style={{ fontFamily: "Gideon Roman, serif" }}>Perspective</span>
            </p>

            {isMobile ? (
              <p className="text-sm leading-relaxed text-gray-300 text-start">
                Exploring the world fuels fresh ideas and unique designs.
              </p>
            ) : (
              <p className="text-base md:text-lg lg:text-[1.1vw] leading-relaxed mt-4">
                Repellat quisquam tempora eligendi suscipit architecto dolore
                aspernatur! Cum exercitationem quisquam, modi dicta dolorum
                tempora placeat facere provident quaerat quis.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
