import { useEffect, ReactNode } from 'react';
import { useTimer } from '@/context/TimerContext';
import CountdownTimer from './CountdownTimer';

export default function YouTubePlayer() {
  const { videoId, embedError, timeRemaining, timerStyle, setTimerStyle } = useTimer();

  // Component rendering logic
  if (embedError) {
    return (
      <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center p-4 text-center">
        <div className="text-red-500 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Unable to Embed Video</h3>
        <p className="text-gray-400">This video may have embedding disabled or is not available.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      ></iframe>
      
      {/* Always show timer when video is loaded */}
      <CountdownTimer />
    </div>
  );
} 