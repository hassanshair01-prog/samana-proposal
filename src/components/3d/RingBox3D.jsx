import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function DiamondRing({ isOpen }) {
  const groupRef = useRef()
  const diamondRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Gentle floating and turning
    groupRef.current.rotation.y = t * 0.8
    if (diamondRef.current) {
      diamondRef.current.rotation.y = t * 1.5
      diamondRef.current.rotation.x = Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, isOpen ? 0.35 : -0.2, 0]} scale={isOpen ? 1 : 0.01}>
      {/* Golden Ring Band */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.06, 24, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2}
        />
      </mesh>

      {/* Diamond Mount / Prongs */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.14, 0.08, 0.14, 8]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Brilliant Cut Diamond */}
      <mesh ref={diamondRef} position={[0, 0.58, 0]}>
        <octahedronGeometry args={[0.26, 0]} />
        <meshPhysicalMaterial
          color="#f0f9ff"
          emissive="#bae6fd"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.1}
          transmission={0.8}
          thickness={0.8}
          ior={2.4}
          reflectivity={0.95}
        />
      </mesh>

      {/* Sparkle Light from Diamond */}
      <pointLight position={[0, 0.7, 0]} color="#38bdf8" intensity={2} distance={3} />
    </group>
  )
}

function BoxModel({ isOpen }) {
  const boxGroupRef = useRef()
  const lidRef = useRef()

  useFrame((state, delta) => {
    if (!boxGroupRef.current) return
    // Gentle levitation of whole box
    const t = state.clock.getElapsedTime()
    boxGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08
    boxGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15

    // Smooth lid opening animation (target -2.1 radians when open)
    const targetAngle = isOpen ? -2.15 : 0
    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.damp(
        lidRef.current.rotation.x,
        targetAngle,
        5,
        delta
      )
    }
  })

  return (
    <group ref={boxGroupRef} position={[0, -0.2, 0]} rotation={[0.25, -0.2, 0]}>
      {/* Lower Box (Base) */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.6, 0.8, 1.6]} />
        <meshStandardMaterial
          color="#881337"
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Golden Base Trim */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[1.66, 0.08, 1.66]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Velvet Cushion inside */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.25, 32]} />
        <meshStandardMaterial color="#4c0519" roughness={0.9} />
      </mesh>

      {/* Ring Slot in velvet */}
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial color="#1a040b" />
      </mesh>

      {/* Ring inside box */}
      <DiamondRing isOpen={isOpen} />

      {/* Hinged Top Lid */}
      <group position={[0, 0, -0.8]} ref={lidRef}>
        <mesh position={[0, 0.35, 0.8]}>
          <boxGeometry args={[1.64, 0.7, 1.64]} />
          <meshStandardMaterial
            color="#881337"
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>

        {/* Golden Crown Ribbon on Lid */}
        <mesh position={[0, 0.72, 0.8]}>
          <boxGeometry args={[1.66, 0.05, 0.3]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.72, 0.8]}>
          <boxGeometry args={[0.3, 0.05, 1.66]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export default function RingBox3D({ isOpen = false }) {
  return (
    <div className="w-full h-[320px] md:h-[420px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.2, 3.8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff1f2" />
        <pointLight position={[-3, 2, -1]} intensity={1.5} color="#fda4af" />
        <pointLight position={[0, 3, 2]} intensity={2} color="#fbbf24" />

        <BoxModel isOpen={isOpen} />
      </Canvas>
    </div>
  )
}
