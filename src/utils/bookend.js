import { smoothstep, clamp01 } from './keyframes'

// Returns a 0..1 strength that is 1 at t=0 and t=1 (the two moments the
// burger is shown fully whole/assembled) and 0 everywhere in between,
// with a smooth fade across `edge` on each side. Used to crossfade the
// realistic photoscanned burger in/out against the separable Kenney parts,
// without touching the exploded/rebuild animation or camera choreography.
export function bookendStrength(t, edge = 0.08) {
  if (t <= edge) return 1 - smoothstep(clamp01(t / edge))
  if (t >= 1 - edge) return smoothstep(clamp01((t - (1 - edge)) / edge))
  return 0
}
