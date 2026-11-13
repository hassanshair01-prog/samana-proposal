import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FallingPetal({ startPos, speed, rotSpeed }) {
  const meshRef = useRef()
  const geom = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.quadraticCurveTo(0.2, 0.3, 0, 0.6)
    shape.quadraticCurveTo(-0.2, 0.3, 0, 0)
    return new THREE.ShapeGeometry(shape)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y -= speed.y * 0.02
    meshRef.current.position.x += Math.sin(state.clock.elapsedTime + startPos[0]) * 0.005
    meshRef.current.rotation.x += rotSpeed.x * 0.02
    meshRef.current.rotation.y += rotSpeed.y * 0.02
    meshRef.current.rotation.z += rotSpeed.z * 0.01

    if (meshRef.current.position.y < -4) {
      meshRef.current.position.y = 4
      meshRef.current.position.x = (Math.random() - 0.5) * 8
    }
  })

  return (
    <mesh ref={meshRef} position={startPos} geometry={geom} scale={0.45}>
      <meshStandardMaterial
        color="#e11d48"
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.1}
        emissive="#881337"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function RoseFlower({ position, scale = 1, rotation = [0, 0, 0] }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.08
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Stem */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 1.8, 8]} />
        <meshStandardMaterial color="#14532d" roughness={0.6} />
      </mesh>

      {/* Leaves */}
      <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.3, 0.03, 0.15]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      <mesh position={[-0.2, -0.9, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.3, 0.03, 0.15]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>

      {/* Rose Bloom layers */}
      <group position={[0, 0.1, 0]}>
        {/* Core bud */}
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#be123c" roughness={0.4} />
        </mesh>

        {/* Petal layer 1 */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.18,
              0,
              Math.cos((angle * Math.PI) / 180) * 0.18
            ]}
            rotation={[0.3, (angle * Math.PI) / 180, 0]}
          >
            <sphereGeometry args={[0.18, 12, 12, 0, Math.PI]} />
            <meshStandardMaterial color="#e11d48" roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* Petal layer 2 (Outer larger petals) */}
        {[36, 108, 180, 252, 324].map((angle, i) => (
          <mesh
            key={`outer-${i}`}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.28,
              -0.05,
              Math.cos((angle * Math.PI) / 180) * 0.28
            ]}
            rotation={[0.5, (angle * Math.PI) / 180, 0]}
          >
            <sphereGeometry args={[0.24, 12, 12, 0, Math.PI]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.35} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function RoseGarden3D() {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      startPos: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 + 1,
        (Math.random() - 0.5) * 4
      ],
      speed: { y: 0.8 + Math.random() * 0.8 },
      rotSpeed: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2
      }
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 3]} intensity={1.8} color="#ffe4e6" />
        <pointLight position={[-3, -1, 2]} intensity={1} color="#f43f5e" />

        {/* 3D Roses in foreground garden */}
        <RoseFlower position={[-2.8, -1.8, 0]} scale={1.1} rotation={[0.2, 0.4, 0.1]} />
        <RoseFlower position={[2.8, -1.8, 0]} scale={1.1} rotation={[0.2, -0.4, -0.1]} />
        <RoseFlower position={[-1.8, -2.1, 1]} scale={0.9} rotation={[0.1, 0.2, 0]} />
        <RoseFlower position={[1.8, -2.1, 1]} scale={0.9} rotation={[0.1, -0.2, 0]} />

        {/* Tumbling 3D Rose Petals */}
        {petals.map((p) => (
          <FallingPetal
            key={p.id}
            startPos={p.startPos}
            speed={p.speed}
            rotSpeed={p.rotSpeed}
          />
        ))}
      </Canvas>
    </div>
  )
}
