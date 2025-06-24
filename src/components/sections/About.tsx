import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Palette, Globe, Zap } from 'lucide-react';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
  };

const services = [
  {
    icon: <Code size={24} />,
    title: "Full Stack Development",
    description: "Designing and developing scalable web applications using modern frontend and backend technologies."
  },
  {
    icon: <Palette size={24} />,
    title: "Android/iOS Development",
    description: "Building cross-platform mobile apps with smooth performance and user-friendly interfaces."
  },
  {
    icon: <Globe size={24} />,
    title: "ERP/CRM Development",
    description: "Creating custom ERP and CRM solutions to streamline business processes and improve productivity."
  },
  {
    icon: <Zap size={24} />,
    title: "AI-Powered Solutions",
    description: "Leveraging artificial intelligence to build smart, efficient, and automated applications."
  }
];

  return (
    <section id="about" className="section relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.h2 
              variants={item} 
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>
            
          <motion.p variants={item} className="text-white/80 mb-6">
  I'm a passionate full stack developer who approaches every project with curiosity, creativity, and a strong focus on delivering real-world impact.
</motion.p>

<motion.p variants={item} className="text-white/80 mb-6">
  I believe in writing clean, scalable code and building intuitive, user-centered solutions. With experience across both frontend and backend, I ensure every part of a product works seamlessly together.
</motion.p>

<motion.p variants={item} className="text-white/80 mb-6">
  Beyond development, I also manage teams and projects — coordinating tasks, guiding technical decisions, and keeping delivery on track. I enjoy bringing people together to solve problems efficiently and collaboratively.
</motion.p>

<motion.p variants={item} className="text-white/80 mb-8">
  I’m always eager to explore new technologies, improve workflows, and push the limits of what’s possible in modern development — all while keeping performance, quality, and teamwork at the core.
</motion.p>

            
            <motion.div variants={item} className="flex gap-4">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">React</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary/20 text-secondary">Node.js</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent/20 text-accent">Next.js</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">React Native</span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="text-primary mb-3">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;