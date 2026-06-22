'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { continents } from '@/data/worldData';

interface GlobeProps {
  onContinentClick: (continentId: string) => void;
}

// Convert lat/lng to 3D Cartesian coordinates
function getPointFromLatLng(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

import { useTexture } from '@react-three/drei';

function PlanetSprite({ imagePath, size = 0.6 }: { imagePath: string, size?: number }) {
  const texture = useTexture(imagePath);
  return (
    <sprite scale={[size, size, 1]}>
      <spriteMaterial map={texture} transparent={true} depthTest={true} />
    </sprite>
  );
}

// Continent marker component
function ContinentMarker({ 
  continent, 
  onClick 
}: { 
  continent: typeof continents[0], 
  onClick: (id: string) => void 
}) {
  // Push the planets further out (radius 3.2 instead of 2.05) so the large sprites don't clip into the globe
  const pos = getPointFromLatLng(continent.globePosition.lat, continent.globePosition.lng, 3.2);

  return (
    <group position={pos}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick(continent.id); }}>
        {/* Invisible interactive zone - made larger to match the new sprite size */}
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      
      {continent.imagePath ? (
        <group onClick={(e) => { e.stopPropagation(); onClick(continent.id); }}>
          <React.Suspense fallback={null}>
            <PlanetSprite imagePath={continent.imagePath} size={2.5} />
          </React.Suspense>
        </group>
      ) : (
        <>
          <mesh onClick={(e) => { e.stopPropagation(); onClick(continent.id); }}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color={continent.color} 
              emissive={continent.accentColor}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color={continent.color} transparent opacity={0.3} />
          </mesh>
        </>
      )}

      {/* Positioned inside the center of the planet */}
      <Html center distanceFactor={10} position={[0, 0, 0]}>
        <div 
          className="flex flex-col items-center justify-center cursor-pointer group"
          onClick={(e) => { e.stopPropagation(); onClick(continent.id); }}
        >
          <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/30 whitespace-nowrap group-hover:scale-110 group-hover:bg-black/60 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <span className="font-heading font-black text-2xl tracking-wide drop-shadow-lg uppercase">{continent.name}</span>
            {continent.isLocked && <span className="ml-3 opacity-80 text-xl">🔒</span>}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Starfield background
function StarField() {
  const count = 1000;
  const [positions, setPositions] = React.useState<Float32Array | null>(null);
  
  React.useEffect(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 20;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(pos);
  }, [count]);

  if (!positions) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
}

function GlobeScene({ onContinentClick }: GlobeProps) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001; // Slow auto-rotation
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
      <StarField />

      <group ref={globeRef}>
        {/* Main Earth Sphere */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.4}
            roughness={0.7}
          />
        </Sphere>

        {/* Atmosphere/Glow */}
        <Sphere args={[2.1, 64, 64]}>
          <meshBasicMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.15} 
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Continent Markers */}
        {continents.map(continent => (
          <ContinentMarker 
            key={continent.id} 
            continent={continent} 
            onClick={onContinentClick} 
          />
        ))}
      </group>

      <OrbitControls 
        enablePan={false} 
        minDistance={3} 
        maxDistance={8}
        zoomSpeed={0.5}
        rotateSpeed={0.6}
      />
    </>
  );
}

export default function Globe({ onContinentClick }: GlobeProps) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <GlobeScene onContinentClick={onContinentClick} />
      </Canvas>
    </div>
  );
}
