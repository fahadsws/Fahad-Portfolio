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
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionsRef.current) {
        const sections = sectionsRef.current.children;
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i] as HTMLElement;
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
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