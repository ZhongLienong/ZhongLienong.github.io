'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import type { Album } from './types'

interface AlbumFiltersProps {
  albums: Album[]
  onFilterChange: (tags: string[]) => void
}

interface Tag {
  name: string
  type: 'artist' | 'decade' | 'type'
}

// Using memo to prevent unnecessary re-renders
function AlbumFiltersComponent({ albums, onFilterChange }: AlbumFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Memoize tag extraction and categorization
  const { allTags, tagCategories } = useMemo(() => {
    // Extract and categorize tags
    const extractedTags: Tag[] = albums.flatMap(album => 
      album.tags.map((tag: string) => {
        if (['Live', 'Studio'].includes(tag)) {
          return { name: tag, type: 'type' }
        } else if (tag.endsWith('s') && tag.length === 5 && !isNaN(Number(tag.slice(0,4)))) {
          return { name: tag, type: 'decade' }
        } else {
          return { name: tag, type: 'artist' }
        }
      })
    );

    // Create categories
    const categories = {
      'Artist': [...new Set(extractedTags.filter(t => t.type === 'artist').map(t => t.name))]
        .sort((a, b) => a.localeCompare(b)),
      'Decade': [...new Set(extractedTags.filter(t => t.type === 'decade').map(t => t.name))]
        .sort((a, b) => a.localeCompare(b)),
      'Type': [...new Set(extractedTags.filter(t => t.type === 'type').map(t => t.name))]
    };

    return { allTags: extractedTags, tagCategories: categories };
  }, [albums]);

  // Memoize toggle tag function
  const toggleTag = useCallback((tag: string, tagType: 'artist' | 'decade' | 'type') => {
    // Get the tag object to determine its type
    const tagObj = allTags.find(t => t.name === tag)
    if (!tagObj) return
    
    let newTags = [...selectedTags]
    
    // Remove any existing tags of the same type
    newTags = newTags.filter(t => {
      const existingTag = allTags.find(at => at.name === t)
      return existingTag?.type !== tagType
    })
    
    // Toggle the selected tag if it wasn't already selected
    if (!selectedTags.includes(tag)) {
      newTags = [...newTags, tag]
    }
    
    setSelectedTags(newTags)
    onFilterChange(newTags)
    setActiveDropdown(null)
  }, [allTags, selectedTags, onFilterChange]);

  // Memoize toggle dropdown function
  const toggleDropdown = useCallback((category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category)
  }, [activeDropdown]);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#222',
      borderRadius: '8px'
    }}>
      {Object.entries(tagCategories).map(([category, tags]) => (
        <div key={category} style={{ position: 'relative' }}>
          <button
            onClick={() => toggleDropdown(category)}
            style={{
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {category}
            <span style={{ fontSize: '12px' }}>▼</span>
          </button>
          
          {activeDropdown === category && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: '#333',
              borderRadius: '8px',
              padding: '8px',
              zIndex: '100',
              minWidth: '150px',
              maxHeight: '300px',
              overflowY: 'auto',
              overflowX: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              // Standard scrollbar styling that works across browsers
              scrollbarWidth: 'thin',
              scrollbarColor: '#6a4a8c #333'
            }}>
              {tags.map(tag => (
                <div
                  key={tag}
                  onClick={() => {
                    const tagType = allTags.find(t => t.name === tag)?.type || 'artist'
                    toggleTag(tag, tagType)
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedTags.includes(tag) ? '#6a4a8c' : 'transparent',
                    color: 'white',
                    margin: '2px 0'
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Export a memoized version of the component
const AlbumFilters = memo(AlbumFiltersComponent);
export default AlbumFilters;
