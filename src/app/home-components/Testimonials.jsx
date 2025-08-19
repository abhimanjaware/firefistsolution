"use client";
import React, { useEffect, useRef, useCallback } from 'react';

const testimonialsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    text: "This service completely transformed our business operations. The team's expertise and dedication are unmatched. Highly recommended for anyone looking to scale their business efficiently."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494790108755-2616c80d6c4d?w=300&h=300&fit=crop&crop=face",
    text: "Exceptional quality and customer service. They delivered beyond our expectations and helped us achieve results we never thought possible. A truly professional experience."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    text: "Working with this team was a game-changer. Their innovative approach and attention to detail made all the difference in our project's success."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    text: "Outstanding results and seamless collaboration. They understood our vision perfectly and brought it to life with remarkable precision and creativity."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    text: "The level of professionalism and expertise exceeded our expectations. They delivered a solution that perfectly aligned with our business goals."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    text: "Incredible attention to detail and customer satisfaction. The results speak for themselves - our ROI improved significantly after implementing their solutions."
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    text: "Their strategic insights and implementation capabilities are top-notch. We saw immediate improvements in efficiency and customer satisfaction across all departments."
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    text: "A remarkable partnership that yielded exceptional results. Their commitment to excellence and innovative solutions helped us exceed our quarterly targets by 40%."
  }
];

function Testimonials() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const animationsInitialized = useRef(false);

  const initializeAnimations = useCallback(() => {
    if (animationsInitialized.current || !window.gsap || !window.ScrollTrigger) return;

    animationsInitialized.current = true;
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    // Clear existing animations
    window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Pin the title to the top of the container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: titleRef.current,
      pinSpacing: false
    });

    // Card animations
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
      gsap.to(card, {
        y: -30 * (index % 2),
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });

    gsap.fromTo('.testimonial-card',
      { opacity: 0, y: 100, scale: 0.9, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true
        }
      }
    );

    // Hover effects
    document.querySelectorAll('.testimonial-card').forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.08,
          rotateY: 5,
          z: 50,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotateY: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card._cleanupHover = () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
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
      document.querySelectorAll('.testimonial-card').forEach(card => {
        if (card._cleanupHover) {
          card._cleanupHover();
          delete card._cleanupHover;
        }
      });

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

  const renderTestimonialLayout = useCallback(() => {
    const layout = [];
    let cardIndex = 0;
    const patterns = [2, 1, 2, 1, 2];

    patterns.forEach((cardsInRow, rowIndex) => {
      if (cardIndex >= testimonialsData.length) return;
      const rowCards = testimonialsData.slice(cardIndex, cardIndex + cardsInRow);

      layout.push(
        <div
          key={`row-${cardIndex}`}
          className={`w-full flex justify-center items-stretch mb-24 ${cardsInRow === 2 ? 'gap-32' : ''}`}
        >
          {rowCards.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      );

      cardIndex += cardsInRow;
    });

    return layout;
  }, []);

  return (
    <div ref={containerRef} className='relative bg-black text-white overflow-hidden min-h-screen'>
      {/* Title section - pinned to top of component */}
      <div ref={titleRef} className="w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="text-center py-8 leading-none">
          <h3
            className='font-extrabold leading-none bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent select-none'
            style={{
              fontSize: '14vw',
              textShadow: '0 0 30px rgba(255,255,255,0.3)',
              willChange: 'transform'
            }}
          >
            TESTIMONIALS
          </h3>
        </div>
      </div>

      {/* Content section with proper scrolling */}
      <div ref={contentRef} className="relative z-10 pb-24 px-4 sm:px-12" style={{ marginTop: '20vh' }}>
        {renderTestimonialLayout()}
      </div>
    </div>
  );
}

const TestimonialCard = React.memo(({ testimonial }) => {
  return (
    <div className="testimonial-card   min-h-[550px] w-[380px] border  border-gray-200 rounded-2xl shadow-xl hover:shadow-lg transition-transform duration-300 transform-gpu will-change-transform" style={{marginBottom: "70px"}}>
      <div className="w-[380px]   h-full  bg-yellow-50 flex flex-col items-center justify-center gap-9" >
        <img
          src={testimonial.image}
          alt="Customer testimonial"
          className="w-[340px] object-cover object-center rounded-lg"
          loading="lazy"
          decoding="async"
        />
        <p className="text-center text-gray-800 text-lg pb-12 font-bold leading-relaxed">
          {testimonial.text}
        </p>
      </div>
     
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default Testimonials;