import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Header from './components/layout/Header';
import Experience from './components/canvas/Experience';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Cursor from './components/ui/Cursor';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  const sectionsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionsRef.current) {
        const sections = sectionsRef.current.children;
        let closestSection = null;
        let minDistance = Infinity;

        Array.from(sections).forEach(section => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });

        if (closestSection && closestSection.id !== currentSection) {
          setCurrentSection(closestSection.id);
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      const scrollAmount = delta * window.innerHeight;
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading ? (
          <Loader />
        ) : (
          <div className="relative w-full h-screen bg-black overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-full">
              <Canvas 
                shadows 
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ 
                  antialias: true,
                  alpha: true,
                  powerPreference: 'high-performance'
                }}
              >
                <Suspense fallback={null}>
                  <Experience currentSection={currentSection} />
                </Suspense>
              </Canvas>
            </div>
            
            <Header currentSection={currentSection} onSectionChange={handleSectionChange} />
            
            <main ref={sectionsRef} className="relative z-10">
              <Hero onSectionChange={handleSectionChange} />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;