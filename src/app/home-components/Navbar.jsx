"use client";
import React, { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const menuItems = [
    { name: "HOME", href: "/", cursive: "Home" },
    { name: "ABOUT", href: "#about", cursive: "About" },
    { name: "WORK", href: "#work", cursive: "Work" },
    { name: "SERVICES", href: "#services", cursive: "Services" },
    { name: "CONTACT", href: "#contact", cursive: "Contact" },
  ];

  const socialLinks = [
    { name: "logo-instagram", href: "https://www.instagram.com/aakaar.29/" },
    { name: "logo-linkedin", href: "https://www.linkedin.com/in/aakaar-web-design-agency-7405b0324/" },
    { name: "logo-whatsapp", href: "https://wa.me/919689762896" },
    { name: "mail-outline", href: "mailto:hey@aakaar.digital" },
  ];

  useEffect(() => {
    gsap.set([".page-transition", ".page-transition-1", ".page-transition-2"], {
      y: "100%",
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(currentScroll > lastScrollTop && currentScroll > 50 ? "down" : "up");
      setLastScrollTop(Math.max(currentScroll, 0));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleNavigation = useCallback((e, href) => {
    e.preventDefault();
    if (isTransitioning) return;

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    });

    tl.fromTo(
      [".page-transition", ".page-transition-1", ".page-transition-2"],
      { y: "100%", opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }
    );

    setTimeout(() => {
      if (href === "/") {
        window.scrollTo({ top: 0 });
      } else if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        window.open(href, "_blank");
      }
    }, 300);

    tl.to(
      [".page-transition-2", ".page-transition-1", ".page-transition"],
      { y: "-100%", opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.1 },
      "+=0.5"
    );

    if (menuOpen) setMenuOpen(false);
  }, [isTransitioning, menuOpen]);

  const NavLink = ({ item, textSize = "", isMobile = false }) => (
    <div className={`menu-list relative overflow-hidden cursor-pointer ${isMobile ? 'flex justify-center' : 'flex justify-end'}`}>
      <a
        href={item.href}
        onClick={(e) => handleNavigation(e, item.href)}
        className="relative flex flex-row-reverse group transition-all duration-300"
      >
        <div className="flex flex-col items-center w-full overflow-hidden relative py-2">
          <span className={`font-bold font-[Familjen_Grotesk] transition-all duration-300 text-white text-center group-hover:translate-y-[-80%] group-hover:opacity-0 whitespace-nowrap ${textSize}`}>
            {item.name}
          </span>
          <span className={`absolute font-[Familjen_Grotesk] font-bold transition-all duration-300 text-white text-center opacity-0 group-hover:opacity-100 translate-y-[100%] group-hover:translate-y-0 whitespace-nowrap ${textSize}`}>
            {item.cursive}
          </span>
        </div>
      </a>
    </div>
  );

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex justify-between items-center z-[100] transition-all duration-500 ease-out ${
        scrollDirection === "down" ? "-translate-y-2" : "translate-y-0 opacity-100"
      }`}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-[-1] pointer-events-none" />

        {/* Logo */}
        <a 
          href="/" 
          onClick={(e) => handleNavigation(e, "/")} 
          className="flex-shrink-0 max-w-[65%] sm:max-w-[70%] lg:max-w-none z-[101]"
        >
          <h3 className="text-white font-[Familjen_Grotesk] tracking-wide font-black text-[5vw] xs:text-[4.5vw] sm:text-[3.5vw] md:text-[2.8vw] lg:text-[2vw] xl:text-[1.8vw] leading-tight">
            FIREFIST SOLUTIONS
          </h3>       
        </a>

        {/* Desktop Menu */}
        <div className={`hidden lg:flex items-center transition-all duration-500 ease-out ${
          scrollDirection === "down" ? "opacity-0 -translate-y-5 pointer-events-none" : "opacity-100 translate-y-0"
        }`}>
          <ul className="flex gap-4 xl:gap-8 text-white">
            {menuItems.map((item, index) => (
              <li key={index} className="transition-transform duration-300 hover:scale-105">
                <NavLink item={item} textSize="text-[1.1vw] xl:text-[1vw]" />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button - Custom Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden z-[102] transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 relative group"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[2px] bg-white/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px] bg-white' : ''}`}></span>
          <span className={`block w-5 h-[2px] bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-[2px] bg-white/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px] bg-white' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl px-6 sm:px-8 md:px-12 flex flex-col items-center">
          <ul className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-white font-extrabold text-center w-full mb-16 sm:mb-20">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`transition-all duration-500 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${index * 0.08}s` : "0s" }}
              >
                <NavLink item={item} textSize="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" isMobile={true} />
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className={`flex gap-4 sm:gap-5 mb-10 sm:mb-12 transition-all duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`} style={{ transitionDelay: menuOpen ? "0.4s" : "0s" }}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 text-black p-3 sm:p-3.5 rounded-full hover:scale-110 hover:bg-white active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-sm"
                aria-label={social.name}
              >
                <ion-icon name={social.name} style={{ fontSize: '22px' }}></ion-icon>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className={`transition-all duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`} style={{ transitionDelay: menuOpen ? "0.5s" : "0s" }}>
            <a
              href="https://wa.me/919689762896"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 inline-block"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>

      {/* Page Transition Layers */}
      <div className="page-transition fixed top-0 left-0 w-screen h-screen bg-black z-[90] translate-y-full pointer-events-none"></div>
      <div className="page-transition-1 fixed top-0 left-0 w-screen h-screen bg-[#d9d9d9a2] z-[91] translate-y-full pointer-events-none"></div>
      <div className="page-transition-2 fixed top-0 left-0 w-screen h-screen bg-[#27170e] z-[92] translate-y-full pointer-events-none"></div>
    </>
  );
};

export default Navbar;