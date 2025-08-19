"use client";
import React from 'react'
import Testimonials from './home-components/Testimonials'
import { Familjen_Grotesk, Gideon_Roman } from 'next/font/google';
import Services from './home-components/Services';
import Hero from './home-components/Hero';
import Navbar from './home-components/Navbar';
import Loader from './home-components/Loader';
import Footer from './home-components/Footer';
import Process from './home-components/Process';

const familjen = Familjen_Grotesk({
  subsets: ['latin'],
  weight: ['400'],
});

const gideon = Gideon_Roman({
  subsets: ['latin'],
  weight: ['400'], // Only one weight available
});




function page() {
  return (
   <div className='overflow-x-hidden'>
     <div className={familjen.className}>
      <Loader/>
      <Navbar/>
      <Hero/>
      <Testimonials/>
      <Services/>
      <Footer/>
      <Process/>
    </div>
   </div>
  )
}

export default page
