import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Create custom 3D Extruded Heart Geometry
function createHeartGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.4)
  shape.bezierCurveTo(0, 0.8, 0.5, 0.95, 0.5, 0.45)
  shape.bezierCurveTo(0.5, 0.1, 0, -0.2, 0, -0.55)
  shape.bezierCurveTo(0, -0.2, -0.5, 0.1, -0.5, 0.45)
  shape.bezierCurveTo(-0.5, 0.95, 0, 0.8, 0, 0.4)

  const extrudeSettings = {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05
  }

  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

function HeartItem({ position, scale, rotationSpeed, color = "#f43f5e" }) {
  const meshRef = useRef()
  const geom = useMemo(() => createHeartGeometry(), [])
  const initialY = position[1]

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = initialY + Math.sin(t * rotationSpeed.y + position[0]) * 0.4
    meshRef.current.rotation.y += rotationSpeed.r * 0.015
    meshRef.current.rotation.z = Math.sin(t * 0.8 + position[2]) * 0.12
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geom}>
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.4}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

function StarParticles({ count = 70 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#fda4af'),
      new THREE.Color('#f43f5e'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#c084fc')
    ]

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function FloatingHearts3D({ heartsCount = 6 }) {
  const hearts = useMemo(() => {
    const colors = ['#f43f5e', '#fb7185', '#e11d48', '#fda4af', '#be123c']
    return Array.from({ length: heartsCount }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 1
      ],
      scale: 0.35 + Math.random() * 0.35,
      rotationSpeed: {
        y: 0.8 + Math.random() * 0.8,
        r: 0.6 + Math.random() * 1.2
      },
      color: colors[i % colors.length]
    }))
  }, [heartsCount])

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffe4e6" />
        <pointLight position={[-4, -3, 2]} intensity={1} color="#f43f5e" />
        <pointLight position={[3, -2, 3]} intensity={0.8} color="#a855f7" />

        <StarParticles count={window.innerWidth < 768 ? 40 : 80} />

        {hearts.map((h) => (
          <HeartItem
            key={h.id}
            position={h.position}
            scale={h.scale}
            rotationSpeed={h.rotationSpeed}
            color={h.color}
          />
        ))}
      </Canvas>
    </div>
  )
}
