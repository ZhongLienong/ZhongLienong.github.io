'use client'

import { useEffect, useRef, useState } from 'react'

export default function LazySpotifyPlayer({ spotifyId }: { spotifyId: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {isVisible && (
        <iframe 
          src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator`}
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      )}
    </div>
  )
}
