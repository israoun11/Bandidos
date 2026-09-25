# /public/textures

No external .glb/.gltf models are required for the app to run — the dish and
its ingredients are built from carefully composed Three.js primitives and
procedural materials (see `src/three/dishJourney.js` and
`src/three/scenes/DishJourney.jsx`).

To swap in real 3D assets:

1. Drop your `.glb`/`.gltf` files here.
2. In `src/three/scenes/DishJourney.jsx`, replace an `<Ingredient />`'s
   primitive `<mesh>` with `@react-three/drei`'s `useGLTF('/models/your-file.glb')`
   and render the loaded scene, keeping the same `ref` and per-frame position
   update from `sampleVec3(...)` so it stays in choreography with the camera.
