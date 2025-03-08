"use client";

import { useState, useEffect } from 'react';
import YouTubePlayer from '@/components/YouTubePlayer';
import CountdownTimer from '@/components/CountdownTimer';
import ControlPanel from '@/components/ControlPanel';
import { TimerPosition, TimerStyle } from '@/types/timer';

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [minutes, setMinutes] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [embedError, setEmbedError] = useState(false);
  
  // Timer style and position controls
  const [timerPosition, setTimerPosition] = useState<TimerPosition>('topRight');
  const [timerStyle, setTimerStyle] = useState<TimerStyle>({
    fontSize: 24,
    fontFamily: 'sans-serif'
  });

  // Extract video ID from YouTube URL
  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    setEmbedError(false);
    // Parse YouTube URL to get video ID
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      setVideoId(match[1]);
    } else {
      setVideoId('');
    }
  };

  // Toggle play/pause
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

  // Reset timer
  const resetTimer = () => {
    setIsPlaying(false);
    setTimeRemaining(minutes * 60);
  };

  // Timer effect
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
    
    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining]);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <header className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold text-center">
          YouTube Countdown Timer
        </h1>
      </header>

      <main className="w-full max-w-3xl flex flex-col gap-8">
        <ControlPanel
          youtubeUrl={youtubeUrl}
          onUrlChange={handleUrlChange}
          minutes={minutes}
          onMinutesChange={setMinutes}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onReset={resetTimer}
          hasVideo={!!videoId}
          timerPosition={timerPosition}
          onTimerPositionChange={setTimerPosition}
          timerStyle={timerStyle}
          onTimerStyleChange={setTimerStyle}
        />

        {videoId && (
          <div className="w-full relative">
            <YouTubePlayer
              videoId={videoId}
              onError={() => setEmbedError(true)}
              embedError={embedError}
            >
              {(isPlaying || timeRemaining > 0) && (
                <CountdownTimer
                  timeRemaining={timeRemaining}
                  position={timerPosition}
                  style={timerStyle}
                />
              )}
            </YouTubePlayer>
          </div>
        )}
      </main>
    </div>
  );
}
