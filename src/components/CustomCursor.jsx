import { useEffect, useRef, useState } from 'react'

// Uses mix-blend-mode: difference with a fixed light color so the cursor
// stays visible whether it's over the dark cinematic track or the cream
// content sections, without needing to track which theme is underneath.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!isTouch)
    if (isTouch) return undefined

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
    }

    const onOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]')
      setHovering(Boolean(target))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)

    let raf
    const animateRing = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animateRing)
    }
    raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-cream-50 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-cream-50 mix-blend-difference transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          opacity: hovering ? 0.95 : 0.5,
        }}
      />
    </>
  )
}
