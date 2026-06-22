"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vWorldPosition;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform float uAbsScrollProgress;
uniform vec2 uResolution;
uniform sampler2D tNoise;
uniform vec3 uBackgroundColor;
uniform vec3 uAccentColor;
uniform vec3 uLineColor;
uniform vec3 uPointColor;
uniform float uGridScale;
uniform float uLineWidth;
uniform float uBackgroundNoise;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vWorldPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  vec2 st = uv * uResolution / min(uResolution.x, uResolution.y);

  // Grid
  float gridScale = uGridScale;
  vec2 gridUv = st * gridScale / uResolution.x;
  vec2 gridAbs = abs(fract(gridUv - 0.5) - 0.5);
  float grid = 1.0 - smoothstep(uLineWidth, uLineWidth + 0.001, min(gridAbs.x, gridAbs.y));

  // Dots at intersections
  vec2 gridId = floor(gridUv);
  vec2 gridCenter = (gridId + 0.5) / gridScale * uResolution.x;
  float dotDist = length(st - gridCenter);
  float dotSize = 0.002;
  float dot = 1.0 - smoothstep(dotSize, dotSize + 0.0005, dotDist);

  // Noise fog
  float noiseScale = 1.5;
  float timeOffset = uTime * 0.02;
  float scrollOffset = uScrollProgress * 0.5;

  vec2 noiseUv1 = st * 0.002 + vec2(timeOffset, scrollOffset * 0.3);
  vec2 noiseUv2 = st * 0.003 + vec2(-timeOffset * 0.7, scrollOffset * -0.2 + 2.0);
  vec2 noiseUv3 = st * 0.0015 + vec2(timeOffset * 0.3, 5.0);

  float n1 = texture2D(tNoise, noiseUv1).r;
  float n2 = texture2D(tNoise, noiseUv2).r;
  float n3 = texture2D(tNoise, noiseUv3).r;

  float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  // Cloud fog
  vec2 cloudUv = st * 0.0008 + vec2(timeOffset * 0.4, scrollOffset * 0.15);
  float cloud = texture2D(tNoise, cloudUv).r;
  cloud = smoothstep(0.35, 0.7, cloud);

  // Combine
  vec3 bg = uBackgroundColor;

  // Grid lines
  bg = mix(bg, uLineColor, grid * 0.3);
  bg = mix(bg, uPointColor, dot * 0.4);

  // Noise atmosphere
  float noiseStrength = uBackgroundNoise * 0.3;
  bg = mix(bg, uAccentColor, noise * noiseStrength);

  // Cloud patches
  bg = mix(bg, uAccentColor * 1.3, cloud * 0.15);

  // Vignette
  float vignette = 1.0 - length(vUv - 0.5) * 0.7;
  bg *= mix(0.6, 1.0, vignette);

  gl_FragColor = vec4(bg, 1.0);
}
`

function BackgroundScene() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { viewport } = useThree()
  const noiseTexture = useLoader(THREE.TextureLoader, "/assets/textures/noise.webp")

  useEffect(() => {
    if (noiseTexture) {
      noiseTexture.wrapS = THREE.RepeatWrapping
      noiseTexture.wrapT = THREE.RepeatWrapping
      noiseTexture.minFilter = THREE.LinearFilter
      noiseTexture.magFilter = THREE.LinearFilter
    }
  }, [noiseTexture])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uAbsScrollProgress: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    tNoise: { value: noiseTexture },
    uBackgroundColor: { value: new THREE.Color("#051723") },
    uAccentColor: { value: new THREE.Color("#325977") },
    uLineColor: { value: new THREE.Color("#0c222f") },
    uPointColor: { value: new THREE.Color("#1D7FC8") },
    uGridScale: { value: 150.0 },
    uLineWidth: { value: 0.015 },
    uBackgroundNoise: { value: 1.0 },
  }), [noiseTexture])

  useFrame((state, delta) => {
    uniforms.uTime.value += delta
    uniforms.uScrollProgress.value = window.scrollY * 0.001
    uniforms.uAbsScrollProgress.value += Math.abs(window.scrollY - (uniforms.uScrollProgress.value * 1000)) * 0.001
    uniforms.uResolution.value.set(state.size.width, state.size.height)
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function WebGLBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <BackgroundScene />
      </Canvas>
    </div>
  )
}
