'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import AlbumFilters from './AlbumFilters'
import type { Album } from './types'
import AlbumCard from './AlbumCard'
import albumsData from './albums.json'

const VISIBLE_ALBUMS = 4 // Number of albums to render at once (2 rows with 2 albums each)
const ALBUM_HEIGHT = 450 // Approximate height of an album card in pixels
const BUFFER_SIZE = 2 // Number of albums to buffer above and below the visible area

export default function Albums() {
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: VISIBLE_ALBUMS * 2 }) // Double buffer
  const gridRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Determine if we should use virtualization
  const useVirtualization = useMemo(() => {
    // Only use virtualization when there are more than 8 albums to display
    // AND when filters are applied - show all albums when no filters are selected
    return filterTags.length > 0 && filteredAlbums.length > 8;
  }, [filteredAlbums.length, filterTags.length]);

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

  // Recalculate visible range when filtered albums change
  useEffect(() => {
    handleScroll();
  }, [filterTags, handleScroll]);

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
          // When no filters are applied, remove the max height constraint to show all albums
          // Otherwise, maintain the virtualized scrolling behavior
          maxHeight: filterTags.length === 0 ? 'none' : '1100px',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '16px', // Increased padding to accommodate scrollbar
          // Standard scrollbar styling that works across browsers
          scrollbarWidth: 'thin',
          scrollbarColor: '#6a4a8c #222',
          // Force scrollbar to be visible with a minimum height when filters are applied
          minHeight: filterTags.length === 0 ? 'auto' : '500px'
        }}>
          {useVirtualization
            ? filteredAlbums.slice(visibleRange.start, visibleRange.end).map(album => (
              <AlbumCard key={album.id} album={album} />
            ))
            : filteredAlbums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
