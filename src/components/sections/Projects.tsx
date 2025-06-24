import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A fully functional e-commerce website with user authentication, product management, and secure payment integration.",
    image: "https://blueshelltech.com/media/2021/05/python-django-1024x576.jpg",
    tags: ["Django", "Stripe", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "https://github.com/fahadsws"
  },
  {
    title: "ERP System App",
    description: "A comprehensive ERP solution with real-time analytics, employee management, and inventory tracking for growing businesses.",
    image: "https://blog.effectussoftware.com/wp-content/uploads/2020/03/react-native_large.jpg",
    tags: ["React Native", "Node.js", "SQL", "REST API","Laravel"],
    liveLink: "#",
    githubLink: "https://github.com/fahadsws"
  },
  {
    title: "LinkedIn Post Scheduler Tool",
    description: "A productivity tool that allows users to schedule and automate LinkedIn posts with customizable timing and content.",
    image: "https://cdn.prod.website-files.com/610bb663a35dd3364ddbf08c/633d7a26d52a3258d9815a89_nextjs-prisma-header-min.png",
    tags: ["Next.js","Mango DB", "Prisma", "Tailwind CSS", "Cron Jobs",'Vercel'],
    liveLink: "#",
    githubLink: "https://github.com/fahadsws"
  }
];


  return (
    <section id="projects" className="section" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A selection of my recent work showcasing web development and 3D visualization skills.
          </p>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <a 
                    href={project.liveLink} 
                    className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                  <a 
                    href={project.githubLink}
                    className="text-sm font-medium text-white/80 flex items-center gap-1 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;