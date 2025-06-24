import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: { delay: 0.2, duration: 0.8 }
        }}
        className="relative"
      >
        <Code size={64} className="text-primary" />
        <motion.div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            transition: { 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut" 
            }
          }}
        >
          <Code size={64} className="text-accent" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="mt-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.4, duration: 0.8 }
        }}
      >
        <h1 className="text-2xl font-bold mb-2 text-gradient">Loading Experience</h1>
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: { duration: 1.8, ease: "easeInOut" }
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;