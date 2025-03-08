import { TimerPosition, TimerStyle } from '@/types/timer';
import { useState, useRef, useEffect } from 'react';

interface CountdownTimerProps {
  timeRemaining: number;
  position: TimerPosition;
  style: TimerStyle;
}

export default function CountdownTimer({ timeRemaining, position, style }: CountdownTimerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize position based on preset positions or previous dragged position
  useEffect(() => {
    if (!timerRef.current || !containerRef.current) return;
    
    // Only set initial position if not already dragged
    if (initialPosition === null) {
      const container = containerRef.current.getBoundingClientRect();
      const timer = timerRef.current.getBoundingClientRect();
      
      let x = 0;
      let y = 0;
      
      // Calculate position based on selected preset
      switch (position) {
        case 'center':
          x = (container.width - timer.width) / 2;
          y = (container.height - timer.height) / 2;
          break;
        case 'topLeft':
          x = 20;
          y = 20;
          break;
        case 'topRight':
          x = container.width - timer.width - 20;
          y = 20;
          break;
        case 'bottomLeft':
          x = 20;
          y = container.height - timer.height - 20;
          break;
        case 'bottomRight':
          x = container.width - timer.width - 20;
          y = container.height - timer.height - 20;
          break;
      }
      
      setCoords({ x, y });
    }
  }, [position, initialPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timerRef.current) return;
    
    // Prevent unwanted text selection during drag
    e.preventDefault();
    
    const rect = timerRef.current.getBoundingClientRect();
    // Store offset from mouse position to timer top-left corner
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setIsDragging(true);
    setInitialPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !initialPosition || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const timerRect = timerRef.current?.getBoundingClientRect();
    
    if (!timerRect) return;
    
    // Calculate new position, ensuring timer stays within container bounds
    let newX = e.clientX - containerRect.left - initialPosition.x;
    let newY = e.clientY - containerRect.top - initialPosition.y;
    
    // Constrain to container bounds
    newX = Math.max(0, Math.min(newX, containerRect.width - timerRect.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - timerRect.height));
    
    setCoords({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Set up global mouse event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialPosition]);

  // Calculate background opacity
  const bgOpacity = style.backgroundOpacity / 100;

  const getPositionClasses = (position: TimerPosition) => {
    switch (position) {
      case 'center':
        return 'inset-0 flex items-center justify-center';
      case 'topLeft':
        return 'top-5 left-5';
      case 'topRight':
        return 'top-5 right-5';
      case 'bottomLeft':
        return 'bottom-5 left-5';
      case 'bottomRight':
        return 'bottom-5 right-5';
      default:
        return 'top-5 right-5';
    }
  };

  const positionClass = getPositionClasses(position);

  // Make center position special with larger display and more opacity
  const isCenter = position === 'center';
  const centerStyles = isCenter ? {
    fontSize: `${Math.max(style.fontSize * 1.5, 36)}px`, // Larger font for center
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // More transparent for center
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
  } : {};

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={timerRef}
        className={`absolute text-white px-4 py-2 rounded cursor-move pointer-events-auto`}
        style={{
          fontSize: `${style.fontSize}px`,
          fontFamily: style.fontFamily,
          zIndex: 10,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          userSelect: 'none', // Prevent text selection during drag
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          textShadow: bgOpacity < 0.5 ? '0px 0px 2px rgba(0,0,0,0.8)' : 'none' // Add text shadow for better visibility with low opacity
        }}
        onMouseDown={handleMouseDown}
      >
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
} 