"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
import CountdownTimer from '@/components/CountdownTimer';
import ControlPanel from '@/components/ControlPanel';
import FullscreenView from '@/components/FullscreenView';
import { TimerStyle } from '@/types/timer';

export default function Home() {
  // Video and timer state
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [minutes, setMinutes] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [embedError, setEmbedError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Timer styling
  const [timerStyle, setTimerStyle] = useState<TimerStyle>({
    fontSize: 24,
    fontFamily: 'sans-serif',
    backgroundOpacity: 70
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
      // Initialize timeRemaining with selected minutes when a video is loaded
      setTimeRemaining(minutes * 60);
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
      setTimeRemaining(minutes * 60);
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
    setTimeRemaining(minutes * 60);
  };

  /**
   * Toggle fullscreen mode
   */
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Update timeRemaining when minutes changes
  useEffect(() => {
    if (!isPlaying) {
      setTimeRemaining(minutes * 60);
    }
  }, [minutes, isPlaying]);

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

  // If in fullscreen mode, render the fullscreen view
  if (isFullscreen && videoId) {
    return (
      <FullscreenView
        videoId={videoId}
        timeRemaining={timeRemaining}
        timerStyle={timerStyle}
        onTimerStyleChange={setTimerStyle}
        onExit={toggleFullscreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-8">
        <div className="flex items-center justify-center">
          {/* Using the favicon SVG directly */}
          <Image
            src="/favicon.svg"
            alt="Countdowner Logo"
            width={48}
            height={48}
            className="mr-4"
          />
          <h1 className="text-4xl font-bold text-white inline-flex items-baseline">
            <span className="text-red-500">Count</span>
            <span>downer</span>
          </h1>
        </div>
      </header>

      <main className="w-full max-w-5xl">
        {/* Responsive container for control panel and video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control panel */}
          <div>
            <ControlPanel
              youtubeUrl={youtubeUrl}
              onUrlChange={handleUrlChange}
              minutes={minutes}
              onMinutesChange={setMinutes}
              isPlaying={isPlaying}
              onPlayPause={togglePlayPause}
              onReset={resetTimer}
              hasVideo={!!videoId}
              timerStyle={timerStyle}
              onTimerStyleChange={setTimerStyle}
              onReady={toggleFullscreen}
            />
          </div>
          
          {/* Video preview */}
          {videoId && (
            <div className="flex items-start">
              <div className="w-full relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <YouTubePlayer
                  videoId={videoId}
                  onError={() => setEmbedError(true)}
                  embedError={embedError}
                >
                  {/* Always show timer when video is loaded */}
                  <CountdownTimer
                    timeRemaining={timeRemaining}
                    style={timerStyle}
                    onStyleChange={setTimerStyle}
                  />
                </YouTubePlayer>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
