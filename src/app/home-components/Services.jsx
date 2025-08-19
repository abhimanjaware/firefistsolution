import React, { useState } from 'react';
import { Gideon_Roman } from 'next/font/google';

const gideon = Gideon_Roman({
  subsets: ['latin'],
  weight: ['400'],
});

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

  return (
    <div className="service-interface bg-black min-h-[130vh] w-full z-[70]" style={{ paddingTop: "10vw" }}>
      <div className="heading w-full h-[15vh] text-center flex flex-col items-center justify-center">
        <h3 className="leading-none text-white font-extrabold" style={{ fontSize: "7vw", fontWeight: "800" }}>
          CRAFTED{" "}
          <span
            className={`${gideon.className} transition-all duration-300 ease-in-out ${
              hoveredIndex !== null
                ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400"
                : "text-white"
            }`}
          >
            Solutions
          </span>
        </h3>
        {/* Gradient Dash Underline */}
        <div
          className={`h-[2px] w-[10vw] mt-2 rounded-full transition-all duration-300 ${
            hoveredIndex !== null
              ? "opacity-100 bg-gradient-to-r from-white to-green-400"
              : "opacity-0"
          }`}
        />
      </div>

      <div className="card-container h-[85vh] w-full flex items-end justify-center gap-16">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`group relative h-[75vh] w-[30vw] rounded-2xl overflow-hidden border bg-black text-white transform transition-all duration-500 ${
              hoveredIndex === index
                ? "scale-105 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.35)]"
                : "scale-100 border-[#212529] shadow-none"
            }`}
            style={{ marginBottom: index === 1 ? "20px" : "0px" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Video */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-0"
              autoPlay
              loop
              muted
              src={service.video}
            ></video>

            {/* Shadow Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 h-full w-full flex flex-col justify-start items-center text-start pl-[3%] pt-[10%]">
              {/* Main Title */}
              <p className="text-[2.5vw] font-bold transition-all text-center leading-none duration-700 ease-in-out translate-y-[35vh] group-hover:-translate-y-[-15vh]">
                {service.title.split(' ').map((word, i) => (
                  <span key={i}>{word} <br /></span>
                ))}
              </p>

              {/* Subtext List */}
              <div className="flex flex-col gap-2 text-[1.1vw] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100 ease-in-out translate-y-[24vh] group-hover:translate-y-[24vh]">
                {service.sublist.map((item, i) => (
                  <p key={i}><span className={gideon.className}>{item}</span></p>
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
