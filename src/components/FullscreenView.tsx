import { useEffect, useCallback } from 'react';
import { TimerStyle } from '@/types/timer';
import CountdownTimer from './CountdownTimer';
import FullscreenButton from './FullscreenButton';

interface FullscreenViewProps {
  videoId: string;
  timeRemaining: number;
  timerStyle: TimerStyle;
  onTimerStyleChange: (style: TimerStyle) => void;
  onExit: () => void;
}

export default function FullscreenView({ 
  videoId, 
  timeRemaining, 
  timerStyle, 
  onTimerStyleChange,
  onExit 
}: FullscreenViewProps) {
  // Create a handler that will be used in both the effect and directly
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event from propagating
      onExit();
    }
  }, [onExit]);

  // Enhanced escape key listener with capture phase
  useEffect(() => {
    // Using the capture phase to catch the event before it reaches the iframe
    document.addEventListener('keydown', handleEscapeKey, true);
    window.addEventListener('keydown', handleEscapeKey, true);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey, true);
      window.removeEventListener('keydown', handleEscapeKey, true);
    };
  }, [handleEscapeKey]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black"
      // Add an inline handler as well for better coverage
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onExit();
        }
      }}
      // Make sure the div can receive keyboard focus
      tabIndex={0}
    >
      {/* Simple iframe that takes up the full viewport */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&fs=0`}
        className="w-full h-full border-0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      
      {/* Timer overlay */}
      {timeRemaining > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="pointer-events-auto">
            <CountdownTimer
              timeRemaining={timeRemaining}
              style={timerStyle}
              onStyleChange={onTimerStyleChange}
            />
          </div>
        </div>
      )}
      
      {/* Fullscreen exit button with clear exit instructions */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
        <span>Press ESC to exit</span>
        <FullscreenButton onClick={onExit} isFullscreen={true} />
      </div>
    </div>
  );
} 