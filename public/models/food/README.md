# /public/models/food

Real assets from Kenney's **Food Kit** (https://kenney.nl), copied in
untouched from `kenney_food-kit/Models/GLB format/`:

- `burger.glb` — contains six individually-named, pre-aligned meshes:
  `bun-bottom`, `bun-top`, `cheese`, `patty`, `salad` (lettuce), `tomato`.
  These are the exact pieces used by `src/three/scenes/DishJourney.jsx` for
  the separate → reconstruct scroll journey. Their original node
  translations/scales (read directly from the glTF JSON) are what
  `src/three/dishJourney.js` uses as each ingredient's "assembled" resting
  position, so at scroll progress 0 and 1 they land exactly back into the
  pack's own authored burger stack.
- `onion-half.glb` — a bonus garnish ingredient (the pack has no separate
  onion ring/slice mesh, so the half-onion rests beside the burger rather
  than inside the stack).
- `plate.glb` — the real serving plate, replacing the earlier procedural
  cylinder placeholder.
- `Textures/colormap.png` — the single shared color atlas all three files
  above reference via a relative `Textures/colormap.png` URI. It must stay
  in this `Textures/` subfolder alongside the `.glb` files for the textures
  to resolve.

No procedural primitives (spheres/cubes/cones/etc.) are used for any food
in this project — every ingredient mesh above is loaded with
`@react-three/drei`'s `useGLTF()` and referenced by its real node name via
`nodes['bun-top']`, `nodes.patty`, etc.

To add more real ingredients later (e.g. bacon), copy the matching `.glb`
from the same `GLB format` folder in here, add an entry to `INGREDIENTS` in
`src/three/dishJourney.js` with its node name, base scale, and keyframed
positions, and it will pick up materials from the same shared colormap
atlas automatically.
