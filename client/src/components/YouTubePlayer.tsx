import React, { useEffect, useRef, useState } from 'react';
import { useVideo } from '@/contexts/VideoContext';

interface YouTubePlayerProps {
  embedId: string;
  title: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

// Declare YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({ embedId, title, className, onPlay, onPause }: YouTubePlayerProps) {
  const { setActiveVideo, registerVideoPlayer, unregisterVideoPlayer } = useVideo();
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const uniqueId = `youtube-player-${embedId}`;

  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else if (window.YT.loaded) {
      setIsAPIReady(true);
    } else {
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.loaded) {
          setIsAPIReady(true);
          clearInterval(checkYT);
        }
      }, 100);
      return () => clearInterval(checkYT);
    }
  }, []);

  useEffect(() => {
    if (isAPIReady && playerRef.current && !playerInstanceRef.current) {
      playerInstanceRef.current = new window.YT.Player(uniqueId, {
        height: '100%',
        width: '100%',
        videoId: embedId,
        playerVars: {
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          controls: 1,
          disablekb: 0,
          fs: 1,
          autoplay: 0
        },
        events: {
          onStateChange: (event: any) => {
            const state = event.data;
            const YT = window.YT;
            
            if (state === YT.PlayerState.PLAYING) {
              setActiveVideo(uniqueId);
              onPlay?.();
            } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
              setActiveVideo(null);
              onPause?.();
            }
          }
        }
      });

      // Register the player for global control
      registerVideoPlayer(uniqueId, playerInstanceRef.current);
    }

    return () => {
      if (playerInstanceRef.current) {
        unregisterVideoPlayer(uniqueId);
        try {
          playerInstanceRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying YouTube player:', error);
        }
        playerInstanceRef.current = null;
      }
    };
  }, [isAPIReady, embedId, uniqueId, setActiveVideo, registerVideoPlayer, unregisterVideoPlayer, onPlay, onPause]);

  if (!isAPIReady) {
    return (
      <div className={className}>
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading player...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div 
        ref={playerRef}
        id={uniqueId}
        className="w-full h-full"
        title={title}
      />
    </div>
  );
}