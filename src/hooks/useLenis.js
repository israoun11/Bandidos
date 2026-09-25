import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { setScrollY, setTrackHeight, setMouse } from '../utils/scrollState'

// Initializes Lenis for buttery smooth scrolling, keeps the cinematic
// scroll-state singleton in sync, and tracks pointer position (normalized
// -1..1) for the hero's subtle camera parallax.
export function useLenis(trackRef) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: reduceMotion ? 0.1 : 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !reduceMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    })
    lenisRef.current = lenis

    const updateTrackHeight = () => {
      if (trackRef.current) setTrackHeight(trackRef.current.offsetHeight)
    }
    updateTrackHeight()

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll)
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onResize = () => updateTrackHeight()
    window.addEventListener('resize', onResize)

    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      setMouse(nx, ny)
    }
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      lenis.destroy()
    }
  }, [trackRef])

  return lenisRef
}
