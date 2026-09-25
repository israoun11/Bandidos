// Each ingredient below maps to a REAL named mesh inside the Kenney Food
// Kit's burger.glb / onion-half.glb (see public/models/food). No procedural
// primitives are used for food — every geometry and baseScale here was read
// directly off the source glTF (node translation, node scale, and the
// mesh's own accessor bounding box), so when the pieces reassemble at
// t = 1.0 they land exactly back into the pack's original, pre-authored
// "assembled burger" stack: bun-bottom -> salad(lettuce) -> patty -> cheese
// -> tomato -> bun-top. `onion` is a bonus garnish (onion-half.glb) that
// rests beside the burger rather than inside the stack, since the pack has
// no separate onion-ring/slice mesh.
//
// `source` selects which glb's {nodes, materials} map to pull the mesh
// from (see scenes/DishJourney.jsx), `node` is the exact mesh name inside
// that file, and `baseScale` is the node's original local scale — geometry
// itself is unit-authored, so this scale must be reapplied by hand since we
// re-parent each mesh under our own animated group instead of the file's
// original node hierarchy.

export const INGREDIENTS = [
  {
    id: 'bunBottom',
    label: 'BUN',
    source: 'burger',
    node: 'bun-bottom',
    baseScale: [1, 1, 1],
    keyframes: [
      { t: 0.0, pos: [0, 0, 0] },
      { t: 0.17, pos: [-0.95, 0.55, -0.5] },
      { t: 0.36, pos: [-0.55, -0.08, 0.4] },
      { t: 0.56, pos: [-0.2, -0.02, -0.35] },
      { t: 0.76, pos: [0, -0.55, 0] },
      { t: 1.0, pos: [0, 0, 0] },
    ],
  },
  {
    id: 'salad',
    label: 'LETTUCE',
    source: 'burger',
    node: 'salad',
    baseScale: [0.9184, 0.75, 0.9184],
    keyframes: [
      { t: 0.0, pos: [0, 0.04, 0] },
      { t: 0.17, pos: [1.15, 0.85, 0.2] },
      { t: 0.36, pos: [-0.4, 0.25, -0.6] },
      { t: 0.56, pos: [0.35, 0.55, -0.25] },
      { t: 0.76, pos: [0, 0.65, 0] },
      { t: 1.0, pos: [0, 0.04, 0] },
    ],
  },
  {
    id: 'patty',
    label: 'BEEF PATTY',
    source: 'burger',
    node: 'patty',
    baseScale: [1, 1.14, 1],
    keyframes: [
      { t: 0.0, pos: [0, 0.07, 0] },
      { t: 0.17, pos: [-1.1, -0.3, 0.65] },
      { t: 0.36, pos: [0.6, -0.15, 0.5] },
      { t: 0.56, pos: [0, 0.02, -0.1] },
      { t: 0.76, pos: [0, 0.45, 0] },
      { t: 1.0, pos: [0, 0.07, 0] },
    ],
  },
  {
    id: 'cheese',
    label: 'CHEESE',
    source: 'burger',
    node: 'cheese',
    baseScale: [2.79344749, 1, 1.425],
    keyframes: [
      { t: 0.0, pos: [0, 0.0856, 0] },
      { t: 0.17, pos: [0.9, 1.05, -0.55] },
      { t: 0.36, pos: [0.55, 0.35, 0.55] },
      { t: 0.56, pos: [0.35, 0.6, -0.15] },
      { t: 0.76, pos: [0, 1.0, 0] },
      { t: 1.0, pos: [0, 0.0856, 0] },
    ],
  },
  {
    id: 'tomato',
    label: 'TOMATO',
    source: 'burger',
    node: 'tomato',
    baseScale: [1.56, 0.704, 1.56],
    keyframes: [
      { t: 0.0, pos: [0, 0.1356, 0] },
      { t: 0.17, pos: [-0.85, 1.1, 0.6] },
      { t: 0.36, pos: [-0.15, 0.4, -0.55] },
      { t: 0.56, pos: [-0.3, 0.25, 0.2] },
      { t: 0.76, pos: [0, 0.78, 0] },
      { t: 1.0, pos: [0, 0.1356, 0] },
    ],
  },
  {
    id: 'bunTop',
    label: 'BUN',
    source: 'burger',
    node: 'bun-top',
    baseScale: [1, 1, 1],
    keyframes: [
      { t: 0.0, pos: [0, 0.17, 0] },
      { t: 0.17, pos: [1.0, -0.35, -0.9] },
      { t: 0.36, pos: [0.6, -0.1, -0.35] },
      { t: 0.56, pos: [0.1, 0.02, 0.35] },
      { t: 0.76, pos: [0, 0.95, 0] },
      { t: 1.0, pos: [0, 0.17, 0] },
    ],
  },
  {
    id: 'onion',
    label: 'ONION',
    source: 'onion',
    node: 'onion-half',
    baseScale: [0.72, 0.72, 0.72],
    keyframes: [
      { t: 0.0, pos: [0.32, 0.0, 0.3] },
      { t: 0.17, pos: [-0.3, -0.5, -1.0] },
      { t: 0.36, pos: [0.4, -0.15, 0.55] },
      { t: 0.56, pos: [0.15, -0.05, 0.35] },
      { t: 0.76, pos: [0.32, 0.4, 0.3] },
      { t: 1.0, pos: [0.32, 0.0, 0.3] },
    ],
  },
]
