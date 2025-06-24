import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObjectProps {
  position: [number, number, number];
  color: string;
  type: 'cube' | 'sphere' | 'torus' | 'cone' | 'octahedron';
  scale?: number;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ 
  position, 
  color, 
  type,
  scale = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Different rotation speed depending on type
      const speedFactor = {
        cube: 0.2,
        sphere: 0.1,
        torus: 0.3,
        cone: 0.25,
        octahedron: 0.15
      }[type];
      
      meshRef.current.rotation.x += delta * speedFactor;
      meshRef.current.rotation.y += delta * speedFactor * 1.5;
    }
  });

  // Render different geometries based on type
  const renderGeometry = () => {
    switch (type) {
      case 'cube':
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.8, 0.2, 16, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.8, 1.6, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
    }
  };

  // Use different materials for variety
  const renderMaterial = () => {
    if (['cube', 'octahedron'].includes(type)) {
      return (
        <MeshDistortMaterial
          color={color}
          speed={1}
          distort={0.3}
          metalness={0.6}
          roughness={0.2}
        />
      );
    } else {
      return (
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={1}
          metalness={0.8}
          roughness={0.2}
        />
      );
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      {renderGeometry()}
      {renderMaterial()}
    </mesh>
  );
};

export default FloatingObject;