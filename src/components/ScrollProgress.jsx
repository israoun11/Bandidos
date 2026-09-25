import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf
    const compute = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, p)))
      raf = requestAnimationFrame(compute)
    }
    raf = requestAnimationFrame(compute)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="fixed right-0 top-0 z-40 h-full w-[2px] bg-transparent">
      <div
        className="w-full bg-gold-400/90 origin-top"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  )
}
