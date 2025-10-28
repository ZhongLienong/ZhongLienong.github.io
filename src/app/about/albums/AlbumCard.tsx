'use client'

import { useState, memo } from 'react'
import type { Album } from './types'
import LazySpotifyPlayer from './LazySpotifyPlayer'

interface AlbumCardProps {
  album: Album;
  loadDelay?: number;
}

// Using memo to prevent unnecessary re-renders
const AlbumCard = memo(function AlbumCard({ album, loadDelay = 0 }: AlbumCardProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        padding: '15px',
        color: 'white',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 15px 35px rgba(106, 74, 140, 0.3), 0 5px 15px rgba(0,0,0,0.4)' 
          : '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: isHovered ? '1px solid rgba(106, 74, 140, 0.5)' : '1px solid transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 
        style={{ 
          marginBottom: '15px',
          position: 'relative',
          display: 'inline-block',
          cursor: album.comment ? 'help' : 'default'
        }}
        onMouseEnter={() => album.comment && setIsTooltipVisible(true)}
        onMouseLeave={() => album.comment && setIsTooltipVisible(false)}
      >
        {album.title}
        {album.comment && (
          <span style={{
            visibility: isTooltipVisible ? 'visible' : 'hidden',
            opacity: isTooltipVisible ? 1 : 0,
            width: '200px',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '6px',
            padding: '8px',
            position: 'absolute',
            zIndex: 1000,
            left: '50%',
            top: '100%',
            marginTop: '5px',
            transform: 'translateX(-50%)',
            transition: 'opacity 0.3s ease',
            fontStyle: 'normal',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            {album.comment}
          </span>
        )}
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '15px'
      }}>
        {album.tags.map((tag) => (
          <span 
            key={tag} 
            style={{
              backgroundColor: '#6a4a8c',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <LazySpotifyPlayer spotifyId={album.spotifyId} loadDelay={loadDelay} />
    </div>
  );
});

export default AlbumCard;
