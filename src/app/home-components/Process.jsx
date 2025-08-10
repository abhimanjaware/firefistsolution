import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Process() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const [screenType, setScreenType] = useState('desktop');
  const [currentSlide, setCurrentSlide] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const checkScreen = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) setScreenType('mobile');
    else if (width < 1024) setScreenType('tablet');
    else setScreenType('desktop');
  }, []);

  useEffect(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [checkScreen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !headerRef.current) return;

      const headerTitle = headerRef.current.querySelector('h3');

      if (!headerTitle) return;

      if (screenType === 'mobile') {
        gsap.from(headerTitle, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      } else {
        gsap.from(headerTitle, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });

        const validCardRefs = cardRefs.current.filter(ref => ref !== null);

        if (validCardRefs.length > 1) {
          validCardRefs.slice(1).forEach(ref => {
            gsap.set(ref, { y: '100vh', opacity: 0 });
          });

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=400%",
              scrub: 0.5,
            }
          });

          if (validCardRefs[1]) {
            tl.to(validCardRefs[1], { y: 0, opacity: 1, duration: 0.15 }, "card2-=0.05");
          }
          if (validCardRefs[0]) {
            tl.to(validCardRefs[0], { scale: 0.95, filter: "blur(5px)", duration: 0.15 }, "card2");
          }
          if (validCardRefs[2]) {
            tl.to(validCardRefs[2], { y: 0, opacity: 1, duration: 0.15 }, "card3-=0.05");
          }
          if (validCardRefs[1]) {
            tl.to(validCardRefs[1], { scale: 0.95, filter: "blur(5px)", duration: 0.15 }, "card3");
          }
          if (validCardRefs[3]) {
            tl.to(validCardRefs[3], { y: 0, opacity: 1, duration: 0.15 }, "card4-=0.05");
          }
          if (validCardRefs[2]) {
            tl.to(validCardRefs[2], { scale: 0.95, filter: "blur(5px)", duration: 0.15 }, "card4");
          }
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [screenType]);

  const phases = [
    {
      number: "01",
      title: "PREMIUM DISCOVERY",
      subtitle: "Understanding luxury positioning",
      description: "We analyze your premium brand positioning, target audience expectations, and competitive landscape to develop animation strategies that elevate your brand above the competition."
    },
    {
      number: "02", 
      title: "MOTION STRATEGY",
      subtitle: "Choreographing premium experiences",
      description: "Our team develops comprehensive animation strategies, creating motion systems that enhance brand storytelling and guide users through premium experiences that feel luxurious and intuitive."
    },
    {
      number: "03",
      title: "DEVELOPMENT & ANIMATION", 
      subtitle: "Crafting with precision",
      description: "We build responsive websites, dynamic web applications, and fluid Android apps using cutting-edge animation technologies, ensuring every interaction maintains 60fps performance across all devices."
    },
    {
      number: "04",
      title: "OPTIMIZATION & LAUNCH",
      subtitle: "Perfecting premium performance", 
      description: "We conduct extensive testing, performance optimization, and quality assurance to ensure your premium animated experience loads quickly and performs flawlessly for your discerning audience."
    }
  ];

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % phases.length);
  }, [phases.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + phases.length) % phases.length);
  }, [phases.length]);

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  return (
    <div className="my-8 bg-black ">
      <div className="process-content min-h-screen w-full overflow-hidden" ref={sectionRef}>
        <div style={{paddingTop:"2rem"}} className="process-header w-full px-4 md:px-16 py-12 leading-none md:py-20  text-center" ref={headerRef}>
          <h3 style={{fontSize:"5vw"}} className=' pb-4 text-[#D9D9D9] font-[Gideon] font-black tracking-wide leading-none overflow-hidden'>
            FIREFIST PREMIUM PROCESS
          </h3>
        </div>

        <div className={`process-cardsection flex items-end justify-center px-4 md:px-5 w-full ${screenType === 'mobile' ? 'flex-col' : 'h-[85vh]'}`}>
          <div className={`cards-stack relative w-full max-w-[900px] ${screenType === 'mobile' ? '' : 'h-[70vh] flex items-end'}`}>
            {screenType === 'mobile' ? (
              <div className="mobile-slider">
                <div
                  className="slider-container relative h-[500px] overflow-hidden rounded-lg"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <div
                    className="slider-wrapper flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {phases.map((phase, i) => (
                      <div
                        key={i}
                        className="slide flex-shrink-0 w-full h-full bg-[#1a0f0a] rounded-lg flex flex-col items-center  justify-center shadow-xl px-4 overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg"></div>
                        <div className="phase-details text-white h-full flex flex-col items-start justify-start z-10 px-4 py-8 gap-4">
                          <h5 className='font-[Gideon] text-[#D4AF37] text-[4rem] leading-none font-bold'>
                            {phase.number}
                          </h5>
                          <div className="phase-info text-start">
                            <h4 className='text-[3rem] font-bold font-[Gideon] pb-2 text-[#D9D9D9] tracking-wide'>
                              PHASE {phase.number}: {phase.title}
                            </h4>
                            <h5 className='text-lg font-[Familjen_Grotesk] italic text-amber-200 pb-3'>
                              {phase.subtitle}
                            </h5>
                            <p className='font-[Familjen_Grotesk] text-zinc-300 text-[1rem] leading-relaxed tracking-wide'>
                              {phase.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="slider-controls flex items-center justify-center pt-6 gap-4">
                  <button
                    onClick={prevSlide}
                    className="nav-btn bg-[#1a0f0a] text-white p-3 rounded-full shadow-lg hover:bg-[#2d1812] transition-colors border border-amber-900/30"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="dots flex gap-2">
                    {phases.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        className={`dot w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-[#D4AF37]' : 'bg-gray-600'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextSlide}
                    className="nav-btn bg-[#1a0f0a] text-white p-3 rounded-full shadow-lg hover:bg-[#2d1812] transition-colors border border-amber-900/30"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="slide-counter text-center mt-4">
                  <span className="text-zinc-400 font-[Familjen_Grotesk] text-sm">
                    Phase {currentSlide + 1} / {phases.length}
                  </span>
                </div>
              </div>
            ) : (
              phases.map((phase, i) => (
                <div
                  key={i}
                  ref={el => {
                    if (el) cardRefs.current[i] = el;
                  }}
                  className="card h-[70vh] w-full bg-[#1a0f0a] rounded-lg flex flex-col md:flex-row absolute top-0 left-0 items-center justify-center shadow-xl px-4 md:px-6 lg:px-12 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg"></div>
                  <div className="phase-details text-white h-full flex flex-col items-start justify-start z-10 px-4 py-8 md:pt-0 md:py-0 gap-6 md:gap-0">
                    {/* <h5 className='font-[Gideon] text-[#D4AF37] text-[5rem] md:text-[10rem] lg:text-[12rem] leading-none font-bold'>
                      {phase.number}
                    </h5> */}
                    <div className="phase-info text-start md:pr-20">
                      <h4 className=' font-bold font-[Gideon] text-9xl pb-2 text-[#D9D9D9] tracking-wide leading-tight'>
                        PHASE {phase.number}: {phase.title}
                      </h4>
                      <h5 className='text-xl md:text-2xl lg:text-[1.5rem] font-[Familjen_Grotesk] italic text-amber-200 pb-4'>
                        {phase.subtitle}
                      </h5>
                      <p className='font-[Familjen_Grotesk] text-zinc-300 text-[1.1rem] md:text-[1.25rem] lg:text-[1.3rem] leading-relaxed tracking-wide'>
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
