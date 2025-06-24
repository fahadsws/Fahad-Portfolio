import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onSectionChange: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
    },
  };

  const handleScrollDown = () => {
    onSectionChange('about');
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="section items-center relative"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <motion.p variants={item} className="mb-4 text-lg font-medium text-secondary">
            Hello, I'm <span className="text-gradient text-2xl">Fahad Shaikh</span> a
          </motion.p>
          
          <motion.h1 
            variants={item} 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Creative <span className="text-gradient">Full Stack Developer</span> and <span className="text-gradient">Designer</span>
          </motion.h1>
          
   <motion.p 
  variants={item} 
  className="mb-10 text-lg md:text-xl text-white/80 max-w-1xl mx-auto"
>
  Passionate about crafting digital solutions and always eager to explore and work with the latest technologies to build innovative, high-quality applications.
</motion.p>

          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn btn-primary">Get in Touch</a>
            <a href="#projects" className="btn btn-outline">View Projects</a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white cursor-hover"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 1, duration: 0.5 }
        }}
        whileHover={{ y: 5 }}
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm">Scroll</span>
          <motion.div
            animate={{ 
              y: [0, 5, 0],
              transition: { repeat: Infinity, duration: 1.5 }
            }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </div>
      </motion.button>
    </section>
  );
};

export default Hero;