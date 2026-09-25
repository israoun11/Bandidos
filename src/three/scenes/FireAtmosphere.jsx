import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { scrollState } from '../../utils/scrollState'
import { envelope } from '../../utils/keyframes'

export default function FireAtmosphere() {
  const group = useRef()

  useFrame(() => {
    if (!group.current) return
    const t = scrollState.progress
    const intensity = envelope(t, 0.4, 0.5, 0.72, 0.86)
    group.current.visible = intensity > 0.01
    group.current.scale.setScalar(0.6 + intensity * 0.4)
    group.current.children.forEach((child) => {
      if (child.material) child.material.opacity = intensity
    })
  })

  return (
    <group ref={group} position={[0, 0.1, -0.45]}>
      <Sparkles count={40} scale={[1.4, 1.6, 1.4]} size={2.2} speed={0.35} opacity={0.6} color="#ff9d5c" noise={1} />
      <Sparkles count={18} scale={[0.9, 1.2, 0.9]} size={4} speed={0.15} opacity={0.35} color="#ffd9a8" noise={0.6} />
    </group>
  )
}
