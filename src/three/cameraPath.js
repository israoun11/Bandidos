// The camera keyframes that define the choreographed journey. `t` is the
// global scroll progress (0..1) across the cinematic track. Position and
// look-at points are in world units; the dish sits near the origin.

// Distances/fov are tuned for the real Kenney burger asset scale: the
// assembled burger is ~0.4 units wide and ~0.17 tall, the plate is ~0.9
// units wide, and separated ingredients travel out to roughly a 1-1.2 unit
// radius (see dishJourney.js).
export const CAMERA_KEYFRAMES = [
  { t: 0.0, pos: [0, 0.32, 1.3], look: [0, 0.1, 0], fov: 28 }, // HERO — close on the assembled burger
  { t: 0.17, pos: [1.6, 1.0, 2.0], look: [0.1, 0.3, 0], fov: 45 }, // INGREDIENTS — pull back and orbit
  { t: 0.36, pos: [-1.7, 0.55, 1.7], look: [-0.15, 0.15, 0], fov: 40 }, // PREPARATION
  { t: 0.56, pos: [0.5, 0.2, 1.1], look: [0, 0.4, -0.3], fov: 36 }, // FIRE — low, toward the heat
  { t: 0.76, pos: [0.05, 1.6, 1.3], look: [0, 0, 0], fov: 38 }, // PLATING — overhead
  { t: 1.0, pos: [1.35, 0.35, 0.15], look: [0, 0.12, 0], fov: 26 }, // FINAL DISH — close circling orbit
]

// Scene boundary markers used to fade DOM content on/off in sync with the
// camera (approximate — the real fade timing is handled by IntersectionObserver
// on the DOM side via Framer Motion's whileInView).
export const SCENE_BOUNDS = {
  hero: [0, 0.1],
  ingredients: [0.08, 0.28],
  preparation: [0.27, 0.47],
  fire: [0.47, 0.67],
  plating: [0.67, 0.87],
  finalDish: [0.87, 1.0],
}
