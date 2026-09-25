// A plain mutable object (not React state) so the R3F render loop can read
// the current scroll progress every frame without triggering React re-renders.
// DOM/UI pieces that need to re-render on scroll should use the
// useScrollProgress() hook in hooks/useScrollProgress.js instead, which is
// throttled via requestAnimationFrame.

export const scrollState = {
  y: 0,
  trackHeight: 1,
  viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 900,
  progress: 0, // 0..1 across the cinematic track only
  mouseX: 0, // -1..1
  mouseY: 0, // -1..1
}

export function setScrollY(y) {
  scrollState.y = y
  const max = Math.max(scrollState.trackHeight - scrollState.viewportHeight, 1)
  scrollState.progress = Math.min(Math.max(y / max, 0), 1)
}

export function setTrackHeight(h) {
  scrollState.trackHeight = h
}

export function setMouse(x, y) {
  scrollState.mouseX = x
  scrollState.mouseY = y
}
