import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TimerStyle } from '@/types/timer';

interface TimerDimensions {
  width: number;
  height: number;
}

interface TimerContextType {
  // Video state
  youtubeUrl: string;
  videoId: string;
  embedError: boolean;
  setYoutubeUrl: (url: string) => void;
  
  // Timer state
  durationSeconds: number;
  timeRemaining: number;
  isPlaying: boolean;
  timerStyle: TimerStyle;
  
  // Actions
  setDurationSeconds: (seconds: number) => void;
  togglePlayPause: () => void;
  resetTimer: () => void;
  setTimerStyle: (style: TimerStyle) => void;
  
  // Fullscreen state
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  
  // New properties for size tracking
  timerDimensions: TimerDimensions;
  setTimerDimensions: (dimensions: TimerDimensions) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  // Video state
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [embedError, setEmbedError] = useState(false);
  
  // Timer state - changed to use seconds as the base unit
  const [durationSeconds, setDurationSeconds] = useState(120); // Default 2 minutes
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Other existing state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerDimensions, setTimerDimensions] = useState<TimerDimensions>({
    width: 0,
    height: 0
  });
  
  // Timer styling
  const [timerStyle, setTimerStyle] = useState<TimerStyle>({
    fontSize: 24,
    fontFamily: 'sans-serif',
    backgroundOpacity: 70,
    position: { x: 50, y: 10 }
  });

  /**
   * Extract video ID from YouTube URL
   */
  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    setEmbedError(false);
    
    // Parse YouTube URL to get video ID
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      const newVideoId = match[1];
      setVideoId(newVideoId);
      // Initialize timeRemaining with selected duration when a video is loaded
      setTimeRemaining(durationSeconds);
    } else {
      setVideoId('');
    }
  };

  /**
   * Toggle play/pause state
   */
  const togglePlayPause = () => {
    if (!videoId) return;
    
    if (!isPlaying) {
      // Start the timer
      setTimeRemaining(durationSeconds);
      setIsPlaying(true);
    } else {
      // Pause the timer
      setIsPlaying(false);
    }
  };

  /**
   * Reset timer to initial state
   */
  const resetTimer = () => {
    setIsPlaying(false);
    setTimeRemaining(durationSeconds);
  };

  /**
   * Toggle fullscreen mode
   */
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Update timeRemaining when duration changes and not playing
  useEffect(() => {
    if (!isPlaying) {
      setTimeRemaining(durationSeconds);
    }
  }, [durationSeconds, isPlaying]);

  // Timer countdown effect
  useEffect(() => {
    if (!isPlaying || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup interval on unmount or state change
    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining]);

  const value = {
    youtubeUrl,
    videoId,
    embedError,
    setYoutubeUrl: handleUrlChange,
    
    // Use seconds-based duration instead of minutes
    durationSeconds,
    setDurationSeconds,
    timeRemaining,
    isPlaying,
    timerStyle,
    
    togglePlayPause,
    resetTimer,
    setTimerStyle,
    
    isFullscreen,
    toggleFullscreen,
    
    timerDimensions,
    setTimerDimensions
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 