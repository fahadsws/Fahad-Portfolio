import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

import FloatingObject from './FloatingObject';
import ParticleField from './ParticleField';

interface ExperienceProps {
  currentSection: string;
}

const Experience: React.FC<ExperienceProps> = ({ currentSection }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  // Camera positions for each section
  const cameraPositions = {
    hero: [0, 0, 5],
    about: [-3, 1, 4],
    projects: [4, 1, 3],
    skills: [0, 3, 4],
    contact: [2, -2, 5]
  };

  // Update camera position when section changes
  useEffect(() => {
    if (currentSection in cameraPositions) {
      gsap.to(camera.position, {
        x: cameraPositions[currentSection as keyof typeof cameraPositions][0],
        y: cameraPositions[currentSection as keyof typeof cameraPositions][1],
        z: cameraPositions[currentSection as keyof typeof cameraPositions][2],
        duration: 2,
        ease: "power3.inOut"
      });
      
      if (groupRef.current) {
        gsap.to(groupRef.current.rotation, {
          x: currentSection === 'about' ? 0.3 : 0,
          y: currentSection === 'projects' ? 0.5 : 0.1,
          z: currentSection === 'skills' ? -0.2 : 0,
          duration: 2,
          ease: "power2.inOut"
        });
      }
    }
  }, [currentSection, camera.position]);

  // Gentle floating animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={['#09090B']} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        enabled={false}
      />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <Environment preset="city" />
      
      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <FloatingObject position={[0, 0, 0]} color="#6E56CF" type="cube" />
          <FloatingObject position={[-2, 1, -1]} color="#1DB4D0" type="sphere" scale={0.7} />
          <FloatingObject position={[2, -1, -2]} color="#FF7D55" type="torus" scale={0.5} />
          <FloatingObject position={[3, 2, -3]} color="#FFB347" type="cone" scale={0.6} />
          <FloatingObject position={[-3, -2, -4]} color="#7CE495" type="octahedron" scale={0.8} />
        </Float>
        
        <ParticleField count={500} />
      </group>
    </>
  );
};

export default Experience;