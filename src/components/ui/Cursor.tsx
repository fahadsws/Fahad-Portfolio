import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        // Slight delay for dot for a trailing effect
        setTimeout(() => {
          if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          }
        }, 50);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('cursor-hover')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ 
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
          backgroundColor: isHovering ? '#FF7D55' : '#FFFFFF'
        }}
        transition={{ duration: 0.2 }}
        style={{ 
          top: -16, 
          left: -16,
          transformOrigin: 'center',
          backdropFilter: 'invert(1)'
        }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        style={{ 
          top: -1, 
          left: -1,
        }}
      />
    </>
  );
};

export default Cursor;