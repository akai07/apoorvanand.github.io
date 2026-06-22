"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 80 }) {
  const mesh = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.pointer.x * 0.1
      mesh.current.rotation.x = state.pointer.y * 0.05
    }
  })

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#5b8def"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles count={100} />
      </Canvas>
    </div>
  )
}
