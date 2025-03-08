import { useState, useRef, useEffect } from 'react';
import { useTimer } from '@/context/TimerContext';
import ResizeHandle from './ResizeHandle';

export default function CountdownTimer() {
  const { 
    timeRemaining, 
    timerStyle, 
    setTimerStyle, 
    timerDimensions, 
    setTimerDimensions,
    isPlaying,
    togglePlayPause
  } = useTimer();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0, fontSize: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  
  // Default position if not provided
  const position = timerStyle.position || { x: 50, y: 10 };

  // Format time as mm:ss
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Track timer element size
  useEffect(() => {
    if (!timerRef.current) return;
    
    // Create ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        // Update dimensions in context
        setTimerDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    
    // Start observing the timer element
    resizeObserver.observe(timerRef.current);
    
    // Clean up observer on unmount
    return () => resizeObserver.disconnect();
  }, [setTimerDimensions]);
  
  // Handle mouse/touch down to start dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse/touch down to start resizing
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering drag
    setIsResizing(true);
    setResizeDirection(direction);
    
    // Store initial values for relative calculations
    setInitialSize({
      width: timerDimensions.width,
      height: timerDimensions.height,
      fontSize: timerStyle.fontSize
    });
    
    // Store initial cursor position
    if ('clientX' in e) {
      setInitialPos({ x: e.clientX, y: e.clientY });
    } else if (e.touches && e.touches.length) {
      setInitialPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  // Calculate position as percentage of container
  const updatePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate position as percentage of container dimensions
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    
    setTimerStyle({
      ...timerStyle,
      position: { x, y }
    });
  };
  
  // Handle resize calculations
  const updateSize = (clientX: number, clientY: number) => {
    // Calculate distance moved
    const deltaX = clientX - initialPos.x;
    const deltaY = clientY - initialPos.y;
    
    // Use the larger delta for proportional resizing
    const delta = Math.max(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX > 0 ? 1 : -1);
    
    // Calculate new font size (with limits)
    const scaleFactor = 0.5; // Adjust this for sensitivity
    const newFontSize = Math.max(12, Math.min(100, initialSize.fontSize + delta * scaleFactor));
    
    // Update the style
    setTimerStyle({
      ...timerStyle,
      fontSize: newFontSize
    });
  };

  // Handle mouse move during drag or resize
  useEffect(() => {
    if (!isDragging && !isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosition(e.clientX, e.clientY);
      } else if (isResizing) {
        updateSize(e.clientX, e.clientY);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        if (isDragging) {
          updatePosition(e.touches[0].clientX, e.touches[0].clientY);
        } else if (isResizing) {
          updateSize(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    };
    
    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    // Add global event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing, initialPos, initialSize, timerStyle, setTimerStyle]);

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 right-0 bottom-[16%] overflow-hidden"
    >
      <div 
        ref={timerRef}
        className={`absolute p-2 rounded select-none ${isDragging ? 'opacity-70' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          fontFamily: timerStyle.fontFamily,
          fontSize: `${timerStyle.fontSize}px`,
          backgroundColor: `rgba(0, 0, 0, ${timerStyle.backgroundOpacity / 100})`,
          userSelect: 'none',
          touchAction: 'none',
          cursor: isDragging ? 'move' : 'default',
          position: 'absolute',
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="text-white">{formattedTime}</span>
        
        {/* Play/Pause button below the timer */}
        <div className="flex justify-center mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering drag
              togglePlayPause();
            }}
            className="text-white bg-red-600 hover:bg-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={isPlaying ? "Pause timer" : "Play timer"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Single resize handle - south-east corner only */}
        <ResizeHandle onResizeStart={handleResizeStart} direction="se" isVisible={isHovering} />
      </div>
    </div>
  );
} 