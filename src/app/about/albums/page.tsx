'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import AlbumFilters from './AlbumFilters'
import type { Album } from './types'
import AlbumCard from './AlbumCard'
import albumsData from './albums.json'

const VISIBLE_ALBUMS = 8 // Number of albums to render at once (4 rows with 2 albums each)
const ALBUM_HEIGHT = 400 // More accurate height estimate
const BUFFER_SIZE = 1 // Reduced buffer for memory efficiency
const ROTATION_INTERVAL = 8000 // 8 seconds between rotations (reduced frequency)
const FADE_DURATION = 500 // 500ms fade duration

export default function Albums() {
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: VISIBLE_ALBUMS * 2 }) // Double buffer
  const [fadingItems, setFadingItems] = useState<Set<string>>(new Set())
  const [rotationIndex, setRotationIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [hoveredAlbumId, setHoveredAlbumId] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load albums only once on component mount
  useEffect(() => {
    setAlbums(albumsData)
    setLoading(false)
  }, [])

  // Memoize filtered albums to prevent unnecessary recalculations
  const filteredAlbums = useMemo(() => {
    return filterTags.length === 0
      ? albums
      : albums.filter(album =>
        filterTags.every(tag => album.tags.includes(tag)));
  }, [albums, filterTags]);

  // Always use virtualization for memory efficiency
  const useVirtualization = useMemo(() => {
    return filteredAlbums.length > 8; // Virtualize when more than 8 albums
  }, [filteredAlbums.length]);

  // Create shuffled array for dynamic rotation - only shuffle when album IDs change
  const shuffledAlbums = useMemo(() => {
    if (filteredAlbums.length === 0) return [];

    // Create a stable copy to avoid recreating on every render
    const shuffled = [...filteredAlbums];

    // Fisher-Yates shuffle - optimized to avoid creating temporary arrays
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }, [filteredAlbums.map(a => a.id).join(',')]);

  // Get current visible albums with rotation
  const currentVisibleAlbums = useMemo(() => {
    if (!useVirtualization) return filteredAlbums;
    
    const totalAlbums = shuffledAlbums.length;
    if (totalAlbums === 0) return [];
    
    const itemsToShow = Math.min(VISIBLE_ALBUMS, totalAlbums);
    const rotatedAlbums = [];
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (rotationIndex + i) % totalAlbums;
      rotatedAlbums.push(shuffledAlbums[index]);
    }
    
    return rotatedAlbums;
  }, [shuffledAlbums, rotationIndex, useVirtualization, filteredAlbums]);

  // Debounced scroll handler to improve performance
  const handleScroll = useCallback(() => {
    if (!gridRef.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const { scrollTop, clientHeight } = gridRef.current!;

      // Calculate how many albums can fit in the viewport
      const visibleCount = Math.ceil(clientHeight / ALBUM_HEIGHT);

      // Calculate which albums should be visible based on scroll position
      const estimatedRowHeight = ALBUM_HEIGHT;
      const rowsAbove = Math.floor(scrollTop / estimatedRowHeight);

      // Calculate start and end indices with buffer
      const newStart = Math.max(0, rowsAbove - BUFFER_SIZE);
      const newEnd = Math.min(
        filteredAlbums.length,
        rowsAbove + visibleCount + BUFFER_SIZE
      );

      setVisibleRange({
        start: newStart,
        end: newEnd
      });
    }, 50); // 50ms debounce
  }, [filteredAlbums.length]);

  // Set up scroll listener
  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('scroll', handleScroll);
      // Initial calculation
      handleScroll();
    }

    return () => {
      if (grid) {
        grid.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Rotation effect for dynamic album display (paused when hovering)
  useEffect(() => {
    if (!useVirtualization || filteredAlbums.length <= VISIBLE_ALBUMS || hoveredAlbumId) {
      // Clear any existing rotation when paused
      if (rotationTimeoutRef.current) {
        clearInterval(rotationTimeoutRef.current);
        rotationTimeoutRef.current = null;
      }
      return; // No rotation needed if all albums fit or user is hovering
    }

    // Use interval instead of nested timeouts to prevent memory leaks
    const intervalId = setInterval(() => {
      setIsRotating(true);
      // Reuse fading items set instead of creating new one each time
      setFadingItems(prev => {
        const newSet = new Set<string>();
        currentVisibleAlbums.forEach(album => newSet.add(album.id));
        return newSet;
      });

      // Schedule fade completion and rotation
      setTimeout(() => {
        setRotationIndex(prev => (prev + 1) % shuffledAlbums.length);
        setFadingItems(new Set()); // Clear set after fade
        setIsRotating(false);
      }, FADE_DURATION);
    }, ROTATION_INTERVAL);

    rotationTimeoutRef.current = intervalId;

    return () => {
      if (rotationTimeoutRef.current) {
        clearInterval(rotationTimeoutRef.current);
        rotationTimeoutRef.current = null;
      }
    };
  }, [useVirtualization, filteredAlbums.length, currentVisibleAlbums, shuffledAlbums.length, hoveredAlbumId]);

  // Recalculate visible range when filtered albums change
  useEffect(() => {
    handleScroll();
  }, [filterTags, handleScroll]);

  return (
    <div className="section">
      <style jsx>{`
        .album-grid-item:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 15px 35px rgba(106, 74, 140, 0.3), 0 5px 15px rgba(0,0,0,0.4) !important;
          border: 1px solid rgba(106, 74, 140, 0.5) !important;
        }
      `}</style>
      
      <h2 className="bg-purple">Now this is a CD wall</h2>
      <div style={{ padding: '20px', position: 'relative' }}>
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
          maxHeight: '1100px', // Always constrain height for virtualization
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '16px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#6a4a8c #222',
          minHeight: '500px'
        }}>
          {useVirtualization
            ? currentVisibleAlbums.map((album, index) => (
              <div
                key={album.id}
                className="album-grid-item"
                style={{
                  opacity: fadingItems.has(album.id) ? 0 : 1,
                  transform: fadingItems.has(album.id) ? 'scale(0.95)' : 'scale(1)',
                  transition: `all ${FADE_DURATION}ms ease-in-out`,
                }}
                onMouseEnter={() => setHoveredAlbumId(album.id)}
                onMouseLeave={() => setHoveredAlbumId(null)}
              >
                <AlbumCard album={album} loadDelay={index * 200} />
              </div>
            ))
            : filteredAlbums.map((album, index) => (
              <div
                key={album.id}
                className="album-grid-item"
                style={{
                  opacity: 1,
                  transform: 'scale(1)',
                  transition: `all 0.3s ease-in-out`,
                }}
                onMouseEnter={() => setHoveredAlbumId(album.id)}
                onMouseLeave={() => setHoveredAlbumId(null)}
              >
                <AlbumCard album={album} loadDelay={index * 200} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
