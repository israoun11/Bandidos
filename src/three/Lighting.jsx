import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../utils/scrollState'
import { envelope, lerp } from '../utils/keyframes'

// Warm, golden key light by default (the brand gold), shifting into a
// deeper ember orange through the fire/plating beats — a different mood
// from the old cool-charcoal palette, tuned to the real olive/gold identity.
const KEY_WARM = new THREE.Color('#F3E7C9')
const KEY_FIRE = new THREE.Color('#FFB178')
const FILL_BASE = new THREE.Color('#2A2410')
const FILL_FIRE = new THREE.Color('#3A2413')

export default function Lighting() {
  const key = useRef()
  const rim = useRef()
  const fill = useRef()
  const fireLight = useRef()
  const tmpColor = useRef(new THREE.Color())

  useFrame(() => {
    const t = scrollState.progress
    const fireIntensity = envelope(t, 0.42, 0.5, 0.68, 0.82)

    if (key.current) {
      tmpColor.current.copy(KEY_WARM).lerp(KEY_FIRE, fireIntensity)
      key.current.color.copy(tmpColor.current)
      key.current.intensity = lerp(1.7, 2.5, fireIntensity)
    }
    if (fill.current) {
      fill.current.color.copy(FILL_BASE).lerp(FILL_FIRE, fireIntensity)
      fill.current.intensity = lerp(0.45, 0.95, fireIntensity)
    }
    if (rim.current) {
      rim.current.intensity = lerp(0.85, 1.4, fireIntensity)
    }
    if (fireLight.current) {
      fireLight.current.intensity = fireIntensity * 2.2
      fireLight.current.color.set('#ff8a3d')
    }
  })

  return (
    <>
      <ambientLight intensity={0.28} color="#1C1E14" />
      <directionalLight ref={key} position={[2.2, 3, 2]} intensity={1.7} color={KEY_WARM} castShadow={false} />
      <pointLight ref={fill} position={[-1.8, 0.4, -1.2]} intensity={0.45} color={FILL_BASE} />
      <pointLight ref={rim} position={[-1, 1.6, -2]} intensity={0.85} color="#ECC65C" />
      <pointLight ref={fireLight} position={[0, 0.15, -0.5]} intensity={0} distance={2.4} color="#ff8a3d" />
    </>
  )
}
