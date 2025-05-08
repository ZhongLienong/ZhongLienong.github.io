'use client'

import { useEffect, useRef, useState } from 'react'

export default function LazySpotifyPlayer({ spotifyId }: { spotifyId: string }) {
  return (
    <div>
      <iframe 
        src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator`}
        width="100%" 
        height="352" 
        frameBorder="0" 
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}
