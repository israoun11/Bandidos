import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { scrollState } from '../../utils/scrollState'
import { bookendStrength } from '../../utils/bookend'

const BURGER_GLB = '/models/burger/burger.glb'

// This source asset (a real photoscanned burger) is authored Z-up, not
// glTF's standard Y-up, and at its own arbitrary scale — confirmed by
// reading its accessor bounds directly: raw bounding box
// X:[-2.375, 2.375]  Y:[-2.333, 2.333]  Z:[-1.849, 1.849] (Z is vertical).
// SCALE brings its ~4.75-unit footprint down to roughly the same footprint
// the existing Kenney burger occupies on the plate, so it sits correctly
// under the *unmodified* existing camera keyframes with no further tuning.
const SCALE = 0.072
const LIFT_Y = 1.8495 * SCALE // raises the mesh so its lowest point sits at y = 0, on the plate

export default function RealisticBurger() {
  const { scene } = useGLTF(BURGER_GLB)
  const model = useMemo(() => scene.clone(true), [scene])
  const group = useRef()
  const materialsRef = useRef([])

  useMemo(() => {
    // Preserve the asset's own baked PBR materials/textures exactly as
    // authored (base color + normal + combined ORM map) — clone them (not
    // just the mesh hierarchy) so this instance's opacity animation never
    // touches the shared cached GLTF, and enable transparency only so we
    // can crossfade opacity at the two bookend moments.
    const mats = []
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        child.material.transparent = true
        child.material.envMapIntensity = 1
        child.castShadow = true
        child.receiveShadow = true
        mats.push(child.material)
      }
    })
    materialsRef.current = mats
  }, [model])

  useFrame((state) => {
    const strength = bookendStrength(scrollState.progress)
    if (group.current) {
      group.current.visible = strength > 0.01
      // a slow idle turntable while it's the one on screen (hero / final beat)
      group.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    materialsRef.current.forEach((m) => {
      m.opacity = strength
    })
  })

  return (
    <group position={[0, LIFT_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={SCALE}>
      <group ref={group}>
        <primitive object={model} />
      </group>
    </group>
  )
}

useGLTF.preload(BURGER_GLB)
