import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const PLATE_GLB = '/models/food/plate.glb'

export default function Plate() {
  const group = useRef()
  const { nodes, materials } = useGLTF(PLATE_GLB)

  // a glossy ceramic finish reads far more "real" than the flat default
  const plateMaterial = useMemo(() => {
    const base = materials.colormap
    if (!base) return base
    const clone = base.clone()
    clone.roughness = 0.18
    clone.metalness = 0.05
    clone.envMapIntensity = 1.3
    return clone
  }, [materials])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <group>
      {/* the real plate asset, nudged down so its shallow resting surface
          sits near y = 0 where the burger stack is authored */}
      <group ref={group} position={[0, -0.035, 0]}>
        <mesh
          geometry={nodes.plate.geometry}
          material={plateMaterial}
          receiveShadow
        />
      </group>

      {/* dark reflective table surface — environment, not food, grounds the scene */}
      <mesh position={[0, -0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#15150D" roughness={0.32} metalness={0.45} />
      </mesh>
    </group>
  )
}

useGLTF.preload(PLATE_GLB)
