'use client'

import { useState, useEffect, useRef } from 'react'
import AlbumFilters from './AlbumFilters'
import type { Album } from './types'
import LazySpotifyPlayer from './LazySpotifyPlayer'
import albumsData from './albums.json'

const VISIBLE_ALBUMS = 10 // Number of albums to render at once

export default function Albums() {
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: VISIBLE_ALBUMS * 2 }) // Double buffer
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setAlbums(albumsData)
      } catch (err) {
        setError(`Failed to load albums: ${err instanceof Error ? err.message : String(err)}`)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadAlbums()

    const handleScroll = () => {
      if (!gridRef.current) return
      
      const { scrollTop, clientHeight, scrollHeight } = gridRef.current
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight
      
      const buffer = VISIBLE_ALBUMS
      const newStart = Math.max(0, Math.floor(scrollTop / 300) - buffer)
      const newEnd = Math.min(
        albumsData.length,
        newStart + VISIBLE_ALBUMS * 3 // Render 3x visible albums (1x above, 1x visible, 1x below)
      )
      
      setVisibleRange({
        start: newStart,
        end: newEnd
      })
    }

    const grid = gridRef.current
    grid?.addEventListener('scroll', handleScroll)
    return () => grid?.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredAlbums = filterTags.length === 0
    ? albums
    : albums.filter(album => 
        filterTags.every(tag => album.tags.includes(tag)))
  
  return (
    <div className="section">
      <h2 className="bg-purple">Now this is a CD wall</h2>
      <div style={{ padding: '20px' }}>
        {loading ? (
          <div>Loading albums...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <>
            <AlbumFilters albums={albums} onFilterChange={setFilterTags} />
            
            {filteredAlbums.length === 0 && (
              <div style={{ marginTop: '20px', color: '#ccc' }}>
                No albums match the selected filters
              </div>
            )}
          </>
        )}
        
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
          maxHeight: '1100px',
          overflowY: 'auto',
          paddingRight: '10px'
        }}>
          {filteredAlbums.slice(visibleRange.start, visibleRange.end).map(album => (
            <div key={album.id} style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              padding: '15px',
              color: 'white'
            }}>
              <h3 
                style={{ 
                  marginBottom: '15px',
                  position: 'relative',
                  display: 'inline-block',
                  cursor: album.comment ? 'help' : 'default'
                }}
                onMouseEnter={e => {
                  if (album.comment) {
                    const tooltip = e.currentTarget.querySelector('span')
                    if (tooltip) {
                      tooltip.style.visibility = 'visible'
                      tooltip.style.opacity = '1'
                      tooltip.style.top = '100%'
                      tooltip.style.bottom = 'auto'
                      tooltip.style.marginTop = '5px'
                    }
                  }
                }}
                onMouseLeave={e => {
                  if (album.comment) {
                    const tooltip = e.currentTarget.querySelector('span')
                    if (tooltip) {
                      tooltip.style.visibility = 'hidden'
                      tooltip.style.opacity = '0'
                    }
                  }
                }}
              >
                {album.title}
                {album.comment && (
                  <span style={{
                    visibility: 'hidden',
                    opacity: 0,
                    width: '200px',
                    backgroundColor: '#333',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '6px',
                    padding: '8px',
                    position: 'absolute',
                    zIndex: 1000,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transition: 'all 0.3s ease',
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
                {album.tags.map(tag => (
                  <span key={tag} style={{
                    backgroundColor: '#6a4a8c',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <LazySpotifyPlayer spotifyId={album.spotifyId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
