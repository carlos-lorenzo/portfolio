import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './WaveformVisual.module.css'

/* ─── GLSL helpers ──────────────────────────────────────────────────────────── */

const simplexNoise = /* glsl */ `
// Simplex 3D noise — Stefan Gustavson (MIT)
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const vertexShader = /* glsl */ `
${simplexNoise}

uniform float uTime;
uniform float uFilter;
uniform float uAmplitude;

varying float vHeight;
varying vec2  vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Build the noisy bio-signal: several octaves of simplex noise
  float noisy = 0.0;
  noisy += snoise(vec3(pos.x * 3.0,  pos.y * 2.0, uTime * 0.6)) * 0.50;
  noisy += snoise(vec3(pos.x * 6.0,  pos.y * 3.5, uTime * 0.9)) * 0.25;
  noisy += snoise(vec3(pos.x * 12.0, pos.y * 5.0, uTime * 1.3)) * 0.15;
  noisy += snoise(vec3(pos.x * 24.0, pos.y * 8.0, uTime * 1.8)) * 0.10;

  // Clean sine wave (filtered signal)
  float clean = sin(pos.x * 2.5 + uTime * 1.4) * 0.55
              + sin(pos.x * 1.2 - uTime * 0.7 + pos.y * 0.8) * 0.30
              + sin(pos.x * 0.6 + uTime * 0.3) * 0.15;

  // Mix between noisy and clean based on mouse-driven uFilter
  float displacement = mix(noisy, clean, uFilter) * uAmplitude;

  // Slight row-based modulation to create the multi-channel feel
  float rowWave = sin(pos.y * 8.0) * 0.15 + 0.85;
  displacement *= rowWave;

  pos.z += displacement;
  vHeight = displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform float uFilter;

varying float vHeight;
varying vec2  vUv;

void main() {
  // Height-based gradient: blue at troughs, orange at peaks
  float t = smoothstep(-0.3, 0.3, vHeight);
  vec3 color = mix(uColorA, uColorB, t);

  // Add subtle emission glow on peaks
  float glow = smoothstep(0.15, 0.35, vHeight) * 0.4;
  color += glow * uColorB;

  // Edge fade for the blended look
  float edgeFade = 1.0;
  edgeFade *= smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
  edgeFade *= smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);

  // Slight wireframe-like ridge highlight
  float ridge = abs(sin(vUv.y * 80.0)) * 0.06;
  color += ridge * uColorA;

  float alpha = (0.6 + t * 0.4) * edgeFade;

  gl_FragColor = vec4(color, alpha);
}
`

/* ─── WaveformMesh ──────────────────────────────────────────────────────────── */

interface WaveformMeshProps {
  filterRef: React.MutableRefObject<number>
}

function WaveformMesh({ filterRef }: WaveformMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime:      { value: 0 },
      uFilter:    { value: 0 },
      uAmplitude: { value: 0.28 },
      uColorA:    { value: new THREE.Color('#58A6FF') }, // --primary
      uColorB:    { value: new THREE.Color('#F78166') }, // --accent
    }),
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    // Smooth lerp toward target filter value
    uniforms.uFilter.value += (filterRef.current - uniforms.uFilter.value) * 0.04
  })

  return (
    <mesh ref={meshRef} rotation={[-0.55, 0.0, 0.0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[4.5, 3.0, 256, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─── WaveformVisual (exported) ─────────────────────────────────────────────── */

interface WaveformVisualProps {
  heroRef: React.RefObject<HTMLDivElement | null>
}

export default function WaveformVisual({ heroRef }: WaveformVisualProps) {
  const filterRef = useRef(0)
  const [hasPointer, setHasPointer] = useState(true)

  useEffect(() => {
    // Detect touch-only devices
    const mq = window.matchMedia('(hover: none)')
    setHasPointer(!mq.matches)
    const handler = (e: MediaQueryListEvent) => setHasPointer(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Mouse tracking on the hero container
  useEffect(() => {
    const el = heroRef.current
    if (!el || !hasPointer) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      // Distance from center → 0 (center=noisy) to 1 (edges=clean)
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy))
      filterRef.current = dist
    }

    const onLeave = () => {
      filterRef.current = 0
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [heroRef, hasPointer])

  // Auto-oscillation for touch devices
  useEffect(() => {
    if (hasPointer) return
    let raf: number
    const tick = () => {
      filterRef.current = 0.5 + 0.5 * Math.sin(Date.now() * 0.0008)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasPointer])

  return (
    <div className={styles.container}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <WaveformMesh filterRef={filterRef} />
      </Canvas>
    </div>
  )
}
