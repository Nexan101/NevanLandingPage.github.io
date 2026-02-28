import { useEffect, useRef } from 'react'

export default function HeroBg() {
  const spotlightRef = useRef(null)
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  const blob3Ref = useRef(null)

  useEffect(() => {
    let rafId
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const onMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      // Smooth follow
      currentX = lerp(currentX, targetX, 0.06)
      currentY = lerp(currentY, targetY, 0.06)

      // Spotlight gradient follows cursor
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(520px circle at ${currentX}px ${currentY}px, rgba(99,102,241,0.09), transparent 55%)`
      }

      // Blobs parallax — each layer moves at a different depth
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (currentX - cx) / cx   // -1 → 1
      const dy = (currentY - cy) / cy

      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate(${dx * 28}px, ${dy * 20}px)`
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate(${-dx * 35}px, ${-dy * 25}px)`
      if (blob3Ref.current)
        blob3Ref.current.style.transform = `translate(${dx * 18}px, ${-dy * 30}px)`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div ref={blob1Ref} className="blob blob-1" style={{ willChange: 'transform' }} />
      <div ref={blob2Ref} className="blob blob-2" style={{ willChange: 'transform' }} />
      <div ref={blob3Ref} className="blob blob-3" style={{ willChange: 'transform' }} />
      <div ref={spotlightRef} className="absolute inset-0" style={{ willChange: 'background' }} />
    </div>
  )
}
