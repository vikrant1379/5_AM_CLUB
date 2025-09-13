import React, { createContext, useContext, useState, useCallback } from 'react';

interface VideoContextType {
  activeVideoId: string | null;
  setActiveVideo: (videoId: string | null) => void;
  pauseAllVideos: () => void;
  registerVideoPlayer: (videoId: string, player: any) => void;
  unregisterVideoPlayer: (videoId: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [videoPlayers, setVideoPlayers] = useState<Map<string, any>>(new Map());

  const registerVideoPlayer = useCallback((videoId: string, player: any) => {
    setVideoPlayers(prev => new Map(prev).set(videoId, player));
  }, []);

  const unregisterVideoPlayer = useCallback((videoId: string) => {
    setVideoPlayers(prev => {
      const newMap = new Map(prev);
      newMap.delete(videoId);
      return newMap;
    });
  }, []);

  const setActiveVideo = useCallback((videoId: string | null) => {
    if (videoId && videoId !== activeVideoId) {
      // Pause all other videos when a new one starts
      videoPlayers.forEach((player, playerId) => {
        if (playerId !== videoId && player && typeof player.pauseVideo === 'function') {
          try {
            player.pauseVideo();
          } catch (error) {
            console.warn('Failed to pause video:', playerId, error);
          }
        }
      });
    }
    setActiveVideoId(videoId);
  }, [activeVideoId, videoPlayers]);

  const pauseAllVideos = useCallback(() => {
    videoPlayers.forEach((player, playerId) => {
      if (player && typeof player.pauseVideo === 'function') {
        try {
          player.pauseVideo();
        } catch (error) {
          console.warn('Failed to pause video:', playerId, error);
        }
      }
    });
    setActiveVideoId(null);
  }, [videoPlayers]);

  return (
    <VideoContext.Provider value={{
      activeVideoId,
      setActiveVideo,
      pauseAllVideos,
      registerVideoPlayer,
      unregisterVideoPlayer
    }}>
      {children}
    </VideoContext.Provider>
  );
}