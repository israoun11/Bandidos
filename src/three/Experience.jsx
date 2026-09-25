import { Suspense, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'
import Lighting from './Lighting'
import Plate from './Plate'
import CameraRig from './CameraRig'
import DishJourney from './scenes/DishJourney'
import FireAtmosphere from './scenes/FireAtmosphere'
import RealisticBurger from './scenes/RealisticBurger'
import { scrollState } from '../utils/scrollState'
import { lerp, envelope } from '../utils/keyframes'

// A deep, clearly-branded forest green backdrop (not a neutral near-black)
// shifting into a warm ember tone through the fire/plating beats.
const BG_DARK = new THREE.Color('#1B2B18')
const BG_WARM = new THREE.Color('#3A2A12')

function SceneAtmosphere() {
  const { scene } = useThree()
  const fog = useRef(new THREE.FogExp2('#1B2B18', 0.32))
  const bgColor = useRef(new THREE.Color())

  if (!scene.fog) scene.fog = fog.current

  useFrame(() => {
    const t = scrollState.progress
    const fireIntensity = envelope(t, 0.4, 0.5, 0.72, 0.86)
    bgColor.current.copy(BG_DARK).lerp(BG_WARM, fireIntensity)
    scene.background = bgColor.current
    fog.current.color.copy(bgColor.current)
    fog.current.density = lerp(0.28, 0.42, fireIntensity)
  })

  return null
}

// A small, fully procedural "studio" — an inverted dark-green sphere plus a
// couple of warm gold/cream bounce cards — baked once into a cubemap by
// drei's <Environment>. Gives the burger's materials real reflections and
// highlights without fetching any external HDRI (stays offline-safe).
function ProceduralEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      <mesh scale={10}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#1B2B18" side={THREE.BackSide} />
      </mesh>
      <mesh position={[2.4, 2, 1.4]} rotation={[0, -0.6, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="#ECC65C" toneMapped={false} />
      </mesh>
      <mesh position={[-2.4, 1.4, 2]} rotation={[0, 0.6, 0]}>
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#FFF3D6" toneMapped={false} />
      </mesh>
      <mesh position={[0, -2.2, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#3A4F35" toneMapped={false} />
      </mesh>
    </Environment>
  )
}

// Subtle autofocus depth of field — the burger stays sharp, anything far
// from it (background, distant flying ingredients) softens slightly. The
// focus target sits at the burger's fixed world position; every camera
// keyframe already looks roughly at that point, so a static target tracks
// correctly through the whole choreography with no per-frame bookkeeping.
function CinematicDepthOfField() {
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField target={[0, 0.15, 0]} focalLength={0.02} bokehScale={2.2} height={480} />
    </EffectComposer>
  )
}

export default function Experience() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* soft cinematic vignette, purely CSS — sits above the canvas */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, transparent 35%, rgba(10,14,8,0.55) 100%)',
        }}
      />
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.32, 1.3], fov: 28, near: 0.05, far: 20 }}
        shadows
      >
        <Suspense fallback={null}>
          <SceneAtmosphere />
          <ProceduralEnvironment />
          <Lighting />
          <Plate />
          <DishJourney />
          <RealisticBurger />
          <FireAtmosphere />
          <ContactShadows position={[0, -0.02, 0]} opacity={0.6} scale={2.2} blur={2.2} far={1} resolution={512} color="#0A0E06" />
          <CameraRig />
          <CinematicDepthOfField />
        </Suspense>
      </Canvas>
    </div>
  )
}
