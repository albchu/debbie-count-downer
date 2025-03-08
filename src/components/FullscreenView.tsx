import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import { useTimer } from '@/context/TimerContext';

export default function FullscreenView() {
  const { videoId, toggleFullscreen } = useTimer();
  const [showExitButton, setShowExitButton] = useState(true);

  // Hide exit button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExitButton(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show exit button on mouse movement
  const handleMouseMove = () => {
    setShowExitButton(true);
    
    // Hide again after 3 seconds
    const timer = setTimeout(() => {
      setShowExitButton(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center" 
      onMouseMove={handleMouseMove}
    >
      {/* YouTube embed */}
      <div className="w-full h-full relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&iv_load_policy=3`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
        
        {/* Overlay the timer */}
        <CountdownTimer />
      </div>
      
      {/* Exit button */}
      <button
        onClick={toggleFullscreen}
        className={`fixed top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-80 text-white px-4 py-2 rounded transition-opacity duration-300 z-50 ${
          showExitButton ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Exit Fullscreen
      </button>
    </div>
  );
} 