// Small, dependency-free keyframe interpolation helpers.
// A "keyframe list" is an array of { t, ...values } sorted by ascending t in [0, 1].

export function clamp01(x) {
  return Math.min(1, Math.max(0, x))
}

export function smoothstep(x) {
  const t = clamp01(x)
  return t * t * (3 - 2 * t)
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}

export function lerpVec3(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

// Finds the surrounding segment [i, i+1] for a given progress value.
export function findSegment(keyframes, t) {
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (t >= keyframes[i].t && t <= keyframes[i + 1].t) return i
  }
  return keyframes.length - 2
}

export function segmentT(keyframes, i, t) {
  const a = keyframes[i]
  const b = keyframes[i + 1]
  const span = b.t - a.t || 1
  return smoothstep(clamp01((t - a.t) / span))
}

// Samples a vec3 field across a keyframe list at progress t.
export function sampleVec3(keyframes, field, t) {
  const i = findSegment(keyframes, t)
  const localT = segmentT(keyframes, i, t)
  return lerpVec3(keyframes[i][field], keyframes[i + 1][field], localT)
}

// Samples a numeric field across a keyframe list at progress t.
export function sampleNum(keyframes, field, t) {
  const i = findSegment(keyframes, t)
  const localT = segmentT(keyframes, i, t)
  return lerp(keyframes[i][field], keyframes[i + 1][field], localT)
}

// Triangular "intensity" envelope: 0 far from center, 1 at center, 0 again past edges.
export function envelope(t, start, peakStart, peakEnd, end) {
  if (t <= start || t >= end) return 0
  if (t < peakStart) return smoothstep((t - start) / (peakStart - start))
  if (t > peakEnd) return 1 - smoothstep((t - peakEnd) / (end - peakEnd))
  return 1
}
