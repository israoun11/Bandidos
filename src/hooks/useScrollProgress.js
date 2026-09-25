import { useEffect, useState } from 'react'
import { scrollState } from '../utils/scrollState'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId
    const tick = () => {
      setProgress(scrollState.progress)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return progress
}
