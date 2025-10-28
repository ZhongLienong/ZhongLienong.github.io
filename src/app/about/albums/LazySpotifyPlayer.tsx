'use client'

import { useEffect, useRef, useState } from 'react'

export default function LazySpotifyPlayer({
  spotifyId,
  loadDelay = 0
}: {
  spotifyId: string;
  loadDelay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [canLoad, setCanLoad] = useState(false); // Add staggered loading control
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Staggered loading: wait for loadDelay before allowing iframe to load
  useEffect(() => {
    // Only start the delay timer when visible
    if (!isVisible) {
      setCanLoad(false);
      return;
    }

    if (loadDelay > 0) {
      loadDelayTimeoutRef.current = setTimeout(() => {
        setCanLoad(true);
      }, loadDelay);
    } else {
      setCanLoad(true);
    }

    return () => {
      if (loadDelayTimeoutRef.current) {
        clearTimeout(loadDelayTimeoutRef.current);
      }
    };
  }, [loadDelay, isVisible]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create observer only once
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Unload iframe when it goes out of view to save memory
          setIsVisible(false);
          setIsLoaded(false);
          setHasError(false);
          setIsTimedOut(false);
          // canLoad is reset by the staggered loading effect
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before entering viewport
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []); // Empty deps - observer created only once

  // Set up timeout for iframe loading
  useEffect(() => {
    if (isVisible && !isLoaded && !hasError) {
      // Set a 10-second timeout for loading
      timeoutRef.current = setTimeout(() => {
        setIsTimedOut(true);
      }, 10000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, isLoaded, hasError]);

  // Only load the iframe when it becomes visible
  const handleLoad = () => {
    setIsLoaded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleError = () => {
    setHasError(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Retry loading
  const handleRetry = () => {
    setHasError(false);
    setIsTimedOut(false);
    // Force re-render of iframe
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  return (
    <div ref={containerRef} style={{ height: isLoaded ? 'auto' : '352px' }}>
      {isVisible && canLoad && !hasError && !isTimedOut ? (
        <iframe
          src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator`}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      ) : (
        <div style={{ 
          height: '352px', 
          backgroundColor: '#282828', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#aaa',
          fontSize: '14px',
          padding: '20px'
        }}>
          {hasError || isTimedOut ? (
            <>
              <p style={{ marginBottom: '15px' }}>
                {isTimedOut ? 'Request timed out.' : 'Failed to load Spotify player.'}
              </p>
              <button 
                onClick={handleRetry}
                style={{
                  backgroundColor: '#6a4a8c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Retry
              </button>
            </>
          ) : (
            'Spotify player loading...'
          )}
        </div>
      )}
    </div>
  )
}
