import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Color, ShaderMaterial } from 'three'
import type { Points, LineSegments, BufferAttribute } from 'three'
import styles from './BackgroundVisual.module.css'

/* ─── Constants ─────────────────────────────────────────────────────────────── */

const COLORS = {
  primary: '#58A6FF',
  accent: '#F78166',
  purple: '#D2A8FF',
  green: '#7EE787',
}

const NODE_PALETTE = [
  new Color(COLORS.primary),
  new Color(COLORS.primary),
  new Color(COLORS.accent),
  new Color(COLORS.purple),
  new Color(COLORS.green),
]

const CONNECTION_COLOR = new Color(COLORS.primary)

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

/** Node count scaled by viewport width */
function getNodeCount(width: number): number {
  if (width < 1200) return 45
  if (width < 1920) return 70
  return 100
}

/** Connection distance threshold — proportional to viewport */
function getConnectionThreshold(vpWidth: number, vpHeight: number, nodeCount: number): number {
  const area = vpWidth * vpHeight
  const avgSpacing = Math.sqrt(area / nodeCount)
  return avgSpacing * 1.8
}

/** Max connections to draw */
const MAX_CONNECTIONS = 200

/** Loose vertical "layers" to hint at NN topology */
const LAYER_COUNT = 5

/* ─── NeuralNetworkLayer ────────────────────────────────────────────────────── */

function NeuralNetworkLayer({ visible }: { visible: boolean }) {
  const { viewport } = useThree()
  const pointsRef = useRef<Points>(null)
  const linesRef = useRef<LineSegments>(null)

  const nodeCount = useMemo(() => getNodeCount(window.innerWidth), [])

  // Generate initial node data — loosely arranged in vertical layers
  const { positions, velocities, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3)
    const vel = new Float32Array(nodeCount * 3)
    const col = new Float32Array(nodeCount * 3)
    const siz = new Float32Array(nodeCount)

    const halfW = viewport.width / 2
    const layerSpacing = viewport.width / (LAYER_COUNT + 1)

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3

      // Assign node to a loose layer with jitter
      const layerIdx = i % LAYER_COUNT
      const layerX = -halfW + layerSpacing * (layerIdx + 1)
      const jitterX = (Math.random() - 0.5) * layerSpacing * 0.8
      const jitterY = (Math.random() - 0.5) * viewport.height * 0.9

      pos[i3] = layerX + jitterX
      pos[i3 + 1] = jitterY
      pos[i3 + 2] = 0

      // Slow drift
      vel[i3] = (Math.random() - 0.5) * 0.06
      vel[i3 + 1] = (Math.random() - 0.5) * 0.04
      vel[i3 + 2] = 0

      // Color from palette
      const color = NODE_PALETTE[Math.floor(Math.random() * NODE_PALETTE.length)]
      col[i3] = color.r
      col[i3 + 1] = color.g
      col[i3 + 2] = color.b

      // Vary sizes: most small, a few larger "hub" neurons
      siz[i] = Math.random() < 0.15 ? 3.5 + Math.random() * 1.5 : 1.8 + Math.random() * 1.2
    }
    return { positions: pos, velocities: vel, colors: col, sizes: siz }
  }, [nodeCount, viewport.width, viewport.height])

  // Pre-allocate line buffers
  const linePositions = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 2 * 3),
    [],
  )
  const lineAlphas = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 2),
    [],
  )

  useFrame(({ clock }) => {
    if (!visible || !pointsRef.current || !linesRef.current) return

    const t = clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.getAttribute('position') as BufferAttribute
    const posArr = posAttr.array as Float32Array
    const halfW = viewport.width / 2 * 1.2
    const halfH = viewport.height / 2 * 1.2
    const threshold = getConnectionThreshold(viewport.width, viewport.height, nodeCount)
    const thresholdSq = threshold * threshold

    // Drift nodes with organic motion
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3
      posArr[i3] += velocities[i3] + Math.sin(t * 0.07 + i * 0.4) * 0.02
      posArr[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.05 + i * 0.3) * 0.015

      // Wrap around edges
      if (posArr[i3] > halfW) posArr[i3] = -halfW
      if (posArr[i3] < -halfW) posArr[i3] = halfW
      if (posArr[i3 + 1] > halfH) posArr[i3 + 1] = -halfH
      if (posArr[i3 + 1] < -halfH) posArr[i3 + 1] = halfH
    }
    posAttr.needsUpdate = true

    // Build connections between nearby nodes
    const linePosAttr = linesRef.current.geometry.getAttribute('position') as BufferAttribute
    const lineAlphaAttr = linesRef.current.geometry.getAttribute('alpha') as BufferAttribute
    let connIdx = 0

    for (let i = 0; i < nodeCount && connIdx < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < nodeCount && connIdx < MAX_CONNECTIONS; j++) {
        const dx = posArr[i * 3] - posArr[j * 3]
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1]
        const distSq = dx * dx + dy * dy

        if (distSq < thresholdSq) {
          const ci = connIdx * 6
          linePositions[ci] = posArr[i * 3]
          linePositions[ci + 1] = posArr[i * 3 + 1]
          linePositions[ci + 2] = 0
          linePositions[ci + 3] = posArr[j * 3]
          linePositions[ci + 4] = posArr[j * 3 + 1]
          linePositions[ci + 5] = 0

          // Fade by distance — closer = more visible
          const fade = 1 - Math.sqrt(distSq) / threshold
          const ai = connIdx * 2
          lineAlphas[ai] = fade
          lineAlphas[ai + 1] = fade

          connIdx++
        }
      }
    }

    // Zero out remaining
    for (let i = connIdx * 6; i < linePositions.length; i++) {
      linePositions[i] = 0
    }
    for (let i = connIdx * 2; i < lineAlphas.length; i++) {
      lineAlphas[i] = 0
    }

    ;(linePosAttr.array as Float32Array).set(linePositions)
    linePosAttr.needsUpdate = true
    ;(lineAlphaAttr.array as Float32Array).set(lineAlphas)
    lineAlphaAttr.needsUpdate = true
    linesRef.current.geometry.setDrawRange(0, connIdx * 2)
  })

  // Custom shader for connections with per-vertex alpha fading
  const connectionMaterial = useMemo(() => {
    return new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: CONNECTION_COLOR },
        uOpacity: { value: 0.18 },
      },
      vertexShader: /* glsl */ `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha * uOpacity);
        }
      `,
    })
  }, [])

  return (
    <>
      {/* Neuron nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={nodeCount}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={/* glsl */ `
            attribute vec3 color;
            attribute float size;
            varying vec3 vColor;
            void main() {
              vColor = color;
              vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size;
              gl_Position = projectionMatrix * mvPos;
            }
          `}
          fragmentShader={/* glsl */ `
            varying vec3 vColor;
            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              if (d > 0.5) discard;
              float alpha = smoothstep(0.5, 0.15, d) * 0.5;
              gl_FragColor = vec4(vColor, alpha);
            }
          `}
        />
      </points>

      {/* Synaptic connections */}
      <lineSegments ref={linesRef} material={connectionMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={MAX_CONNECTIONS * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-alpha"
            count={MAX_CONNECTIONS * 2}
            array={lineAlphas}
            itemSize={1}
          />
        </bufferGeometry>
      </lineSegments>
    </>
  )
}

/* ─── BackgroundVisual (exported) ───────────────────────────────────────────── */

export default function BackgroundVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // IntersectionObserver to pause rendering when off-screen
  const handleVisibility = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setVisible(entry.isIntersecting)
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(handleVisibility, {
      rootMargin: '100px',
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [handleVisibility])

  // Skip WebGL context entirely on narrow screens
  const [isWide, setIsWide] = useState(() => window.innerWidth > 880)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 881px)')
    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!isWide) return null

  return (
    <div ref={containerRef} className={styles.canvas} aria-hidden="true">
      <Canvas
        dpr={[1, 1]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        orthographic
        camera={{ zoom: 1, near: 0.1, far: 100, position: [0, 0, 10] }}
        style={{ background: 'transparent' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <NeuralNetworkLayer visible={visible} />
      </Canvas>
    </div>
  )
}
