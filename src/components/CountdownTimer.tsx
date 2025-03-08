import { TimerPosition, TimerStyle } from '@/types/timer';
import { useState, useRef, useEffect } from 'react';

interface CountdownTimerProps {
  timeRemaining: number;
  position: TimerPosition;
  style: TimerStyle;
  onStyleChange: (style: TimerStyle) => void;
}

export default function CountdownTimer({ timeRemaining, position, style, onStyleChange }: CountdownTimerProps) {
  // Main state variables
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 20, y: 20 });
  const [size, setSize] = useState({ width: 120, height: 60 });
  
  // References
  const timerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse offset for smooth dragging
  const dragStartPosRef = useRef({ mouseX: 0, mouseY: 0, elemX: 0, elemY: 0 });
  
  // Format the time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Set initial position
  useEffect(() => {
    if (!containerRef.current || isDragging || isResizing) return;
    
    const container = containerRef.current.getBoundingClientRect();
    
    let x = coords.x;
    let y = coords.y;
    
    switch (position) {
      case 'center':
        x = (container.width - size.width) / 2;
        y = (container.height - size.height) / 2;
        break;
      case 'topLeft':
        x = 20;
        y = 20;
        break;
      case 'topRight':
        x = container.width - size.width - 20;
        y = 20;
        break;
      case 'bottomLeft':
        x = 20;
        y = container.height - size.height - 20;
        break;
      case 'bottomRight':
        x = container.width - size.width - 20;
        y = container.height - size.height - 20;
        break;
    }
    
    setCoords({ x, y });
  }, [position, size.width, size.height]);

  // Start dragging
  const handleTimerMouseDown = (e: React.MouseEvent) => {
    // Prevent if we're clicking the resize handle
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    
    e.preventDefault();
    
    const rect = timerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Store initial positions for accurate dragging
    dragStartPosRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: coords.x,
      elemY: coords.y
    };
    
    setIsDragging(true);
  };
  
  // Start resizing
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag
    e.preventDefault();
    
    // Store initial size for reference
    dragStartPosRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: size.width,
      elemY: size.height
    };
    
    setIsResizing(true);
  };
  
  // Handle mouse movement for both dragging and resizing
  const handleMouseMove = (e: MouseEvent) => {
    // Skip if neither dragging nor resizing
    if (!isDragging && !isResizing) return;
    
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    
    if (isDragging) {
      // Calculate drag delta
      const deltaX = e.clientX - dragStartPosRef.current.mouseX;
      const deltaY = e.clientY - dragStartPosRef.current.mouseY;
      
      // Calculate new position
      let newX = dragStartPosRef.current.elemX + deltaX;
      let newY = dragStartPosRef.current.elemY + deltaY;
      
      // Constrain to container bounds
      newX = Math.max(0, Math.min(newX, container.width - size.width));
      newY = Math.max(0, Math.min(newY, container.height - size.height));
      
      setCoords({ x: newX, y: newY });
    }
    
    if (isResizing) {
      // Calculate resize delta
      const deltaX = e.clientX - dragStartPosRef.current.mouseX;
      const deltaY = e.clientY - dragStartPosRef.current.mouseY;
      
      // Calculate new size with constraints
      const newWidth = Math.max(80, dragStartPosRef.current.elemX + deltaX);
      const newHeight = Math.max(40, dragStartPosRef.current.elemY + deltaY);
      
      // Set new size
      setSize({ width: newWidth, height: newHeight });
      
      // Update font size proportionally to height
      const newFontSize = Math.max(12, Math.min(72, Math.floor(newHeight * 0.6)));
      if (style.fontSize !== newFontSize) {
        onStyleChange({
          ...style,
          fontSize: newFontSize
        });
      }
    }
  };
  
  // End dragging/resizing
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };
  
  // Add/remove global event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);
  
  // Background opacity
  const bgOpacity = style.backgroundOpacity / 100;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={timerRef}
        className="absolute text-white px-4 py-2 rounded pointer-events-auto flex items-center justify-center"
        style={{
          fontSize: `${style.fontSize}px`,
          fontFamily: style.fontFamily,
          zIndex: 10,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          userSelect: 'none',
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          textShadow: bgOpacity < 0.5 ? '0px 0px 2px rgba(0,0,0,0.8)' : 'none',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleTimerMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {formatTime(timeRemaining)}
        
        {/* Resize handle - only shown on hover or when actively resizing */}
        {(isHovering || isResizing) && (
          <div 
            className="resize-handle absolute bottom-0 right-0 w-8 h-8 cursor-se-resize"
            onMouseDown={handleResizeMouseDown}
            style={{
              background: `linear-gradient(135deg, transparent 50%, rgba(255,255,255,${isResizing ? 0.4 : 0.2}) 50%)`,
              borderRadius: '0 0 4px 0',
              zIndex: 11,
              opacity: isResizing ? 1 : 0.8,
              transition: 'opacity 0.15s ease-in-out'
            }}
          />
        )}
      </div>
    </div>
  );
} 