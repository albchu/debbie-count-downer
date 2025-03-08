import { useState, useRef, useEffect } from 'react';
import { useTimer } from '@/context/TimerContext';

export default function CountdownTimer() {
  const { 
    timeRemaining, 
    timerStyle, 
    setTimerStyle, 
    timerDimensions, 
    setTimerDimensions 
  } = useTimer();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0, fontSize: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  
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
      className="absolute inset-0 overflow-hidden"
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
      >
        <span className="text-white">{formattedTime}</span>
        
        {/* Resize handles */}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 opacity-0 hover:opacity-70 rounded-bl"
          style={{ cursor: 'nwse-resize' }}
          onMouseDown={(e) => handleResizeStart(e, 'se')}
          onTouchStart={(e) => handleResizeStart(e, 'se')}
        />
        <div 
          className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500 opacity-0 hover:opacity-70 rounded-br"
          style={{ cursor: 'nesw-resize' }}
          onMouseDown={(e) => handleResizeStart(e, 'sw')}
          onTouchStart={(e) => handleResizeStart(e, 'sw')}
        />
        <div 
          className="absolute top-0 right-0 w-4 h-4 bg-blue-500 opacity-0 hover:opacity-70 rounded-tl"
          style={{ cursor: 'nesw-resize' }}
          onMouseDown={(e) => handleResizeStart(e, 'ne')}
          onTouchStart={(e) => handleResizeStart(e, 'ne')}
        />
        <div 
          className="absolute top-0 left-0 w-4 h-4 bg-blue-500 opacity-0 hover:opacity-70 rounded-tr"
          style={{ cursor: 'nwse-resize' }}
          onMouseDown={(e) => handleResizeStart(e, 'nw')}
          onTouchStart={(e) => handleResizeStart(e, 'nw')}
        />
      </div>
    </div>
  );
} 