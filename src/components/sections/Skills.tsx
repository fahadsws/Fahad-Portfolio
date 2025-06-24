import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const frontendSkills = [
    { name: "React", level: 95 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 90 },
    { name: "React Native", level: 80 },
    { name: "Bootstrap ", level: 80 },
  ];

  const backendSkills = [
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "Django", level: 75 },
    { name: "SQL", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Laravel", level: 75 },
    { name: "Livewire", level: 70 },
    { name: "Prisma", level: 75 },
  ];

  const otherSkills = [
    { name: "Git", level: 85 },
    { name: "Verscel", level: 75 },
    { name: "Zustand", level: 80 },
    { name: "Cypress", level: 75 },
    { name: "WhatsApp Api", level: 70 },
    { name: "OAuth Login", level: 70 },
    { name: "Redux", level: 85 },
    { name: "Firebase", level: 80 },
  ];

  const SkillBar = ({ skill }: { skill: { name: string; level: number } }) => {
    return (
      <motion.div variants={item} className="mb-5">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{skill.name}</span>
          <span className="text-xs font-medium text-white/70">{skill.level}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My <span className="text-gradient">Skills</span></h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities and expertise across different domains.
          </p>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <motion.h3 variants={item} className="text-xl font-semibold mb-6 pb-2 border-b border-white/10">
              Frontend Development
            </motion.h3>
            {frontendSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <motion.h3 variants={item} className="text-xl font-semibold mb-6 pb-2 border-b border-white/10">
              Backend Development
            </motion.h3>
            {backendSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <motion.h3 variants={item} className="text-xl font-semibold mb-6 pb-2 border-b border-white/10">
              Other Skills
            </motion.h3>
            {otherSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;