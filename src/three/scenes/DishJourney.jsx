import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { INGREDIENTS } from '../dishJourney'
import { sampleVec3 } from '../../utils/keyframes'
import { scrollState } from '../../utils/scrollState'
import { bookendStrength } from '../../utils/bookend'

// Per-ingredient material tuning so each real food mesh reads correctly
// under light — glossy melted cheese, matte bread, shiny tomato skin, a
// slightly charred/greasy patty — instead of every piece sharing one flat
// finish. Applied by cloning the shared "colormap" material so the same
// texture atlas is still reused (no extra texture loads).
const MATERIAL_TUNING = {
  bunBottom: { roughness: 0.82, metalness: 0 },
  bunTop: { roughness: 0.78, metalness: 0 },
  salad: { roughness: 0.65, metalness: 0 },
  patty: { roughness: 0.5, metalness: 0.06 },
  cheese: { roughness: 0.3, metalness: 0.05 },
  tomato: { roughness: 0.25, metalness: 0 },
  onion: { roughness: 0.45, metalness: 0 },
}

// Real assets from the Kenney Food Kit — see public/models/food/.
// `burger.glb` contains the six pre-authored, individually-named burger
// component meshes; `onion-half.glb` is the bonus garnish. Both share the
// same external "Textures/colormap.png" atlas — each ingredient clones
// that one material (see MATERIAL_TUNING above) rather than loading any
// extra texture.
const BURGER_GLB = '/models/food/burger.glb'
const ONION_GLB = '/models/food/onion-half.glb'

function Ingredient({ data, nodes, materials }) {
  const ref = useRef()
  const mesh = nodes[data.node]

  const material = useMemo(() => {
    const base = materials.colormap
    if (!base) return base
    const tuning = MATERIAL_TUNING[data.id]
    const clone = base.clone()
    if (tuning) {
      clone.roughness = tuning.roughness
      clone.metalness = tuning.metalness
    }
    clone.envMapIntensity = 1.1
    clone.transparent = true
    return clone
  }, [materials, data.id])

  useFrame((state) => {
    if (!ref.current) return
    const t = scrollState.progress
    const pos = sampleVec3(data.keyframes, 'pos', t)
    ref.current.position.set(pos[0], pos[1], pos[2])
    // a very slight idle tumble while a piece is away from its resting
    // (assembled) position; it settles down as it nears the plate.
    const restPos = data.keyframes[0].pos
    const dist = Math.hypot(pos[0] - restPos[0], pos[1] - restPos[1], pos[2] - restPos[2])
    const unsettled = Math.min(1, dist / 0.15)
    ref.current.rotation.y = unsettled * (state.clock.elapsedTime * 0.4 + data.baseScale[0])
    ref.current.rotation.x = unsettled * Math.sin(state.clock.elapsedTime * 0.5) * 0.15

    // fade out at the two bookends (scroll start/end) as the realistic
    // photoscanned burger crossfades in over the same window — see
    // scenes/RealisticBurger.jsx.
    if (material) material.opacity = 1 - bookendStrength(t)
  })

  if (!mesh) return null

  return (
    <group ref={ref}>
      <mesh
        geometry={mesh.geometry}
        material={material}
        scale={data.baseScale}
        castShadow
        receiveShadow
      />
    </group>
  )
}

export default function DishJourney() {
  const burger = useGLTF(BURGER_GLB)
  const onion = useGLTF(ONION_GLB)

  return (
    <group>
      {INGREDIENTS.map((ing) => {
        const { nodes, materials } = ing.source === 'onion' ? onion : burger
        return <Ingredient key={ing.id} data={ing} nodes={nodes} materials={materials} />
      })}
    </group>
  )
}

useGLTF.preload(BURGER_GLB)
useGLTF.preload(ONION_GLB)
