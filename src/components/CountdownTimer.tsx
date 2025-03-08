import { TimerStyle } from '@/types/timer';
import { useState, useRef, useEffect, useCallback } from 'react';

interface CountdownTimerProps {
  timeRemaining: number;
  style: TimerStyle;
  onStyleChange: (style: TimerStyle) => void;
}

// Format time as 00:00
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Resize handle component
const ResizeHandle = ({ 
  onResizeStart, 
  isResizing 
}: { 
  onResizeStart: (e: React.MouseEvent) => void;
  isResizing: boolean;
}) => (
  <div 
    className="resize-handle absolute bottom-0 right-0 w-8 h-8 cursor-se-resize"
    onMouseDown={onResizeStart}
    style={{
      background: `linear-gradient(135deg, transparent 50%, rgba(255,255,255,${isResizing ? 0.4 : 0.2}) 50%)`,
      borderRadius: '0 0 4px 0',
      zIndex: 11,
      opacity: isResizing ? 1 : 0.8,
      transition: 'opacity 0.15s ease-in-out'
    }}
  />
);

export default function CountdownTimer({ 
  timeRemaining, 
  style, 
  onStyleChange 
}: CountdownTimerProps) {
  // State management
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [size, setSize] = useState({ width: 120, height: 60 });
  
  // Refs
  const timerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPosRef = useRef({ mouseX: 0, mouseY: 0, elemX: 0, elemY: 0 });
  
  /**
   * Calculate optimal font size based on container dimensions
   */
  const calculateFontSize = useCallback((width: number, height: number): number => {
    const charCount = 5; // "00:00"
    const widthBasedSize = (width - 16) / charCount * 1.6;
    const heightBasedSize = (height - 16) * 0.7;
    
    return Math.max(12, Math.min(200, Math.floor(Math.min(widthBasedSize, heightBasedSize))));
  }, []);

  /**
   * Start dragging the timer
   */
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    // Skip if clicking on resize handle
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    
    e.preventDefault();
    
    const rect = timerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    dragStartPosRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: position.x,
      elemY: position.y
    };
    
    setIsDragging(true);
  }, [position]);
  
  /**
   * Start resizing the timer
   */
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    dragStartPosRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: size.width,
      elemY: size.height
    };
    
    setIsResizing(true);
  }, [size]);
  
  /**
   * Handle mouse movement during drag or resize
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging && !isResizing) return;
    
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    
    if (isDragging) {
      const deltaX = e.clientX - dragStartPosRef.current.mouseX;
      const deltaY = e.clientY - dragStartPosRef.current.mouseY;
      
      let newX = dragStartPosRef.current.elemX + deltaX;
      let newY = dragStartPosRef.current.elemY + deltaY;
      
      // Constrain to container bounds
      newX = Math.max(0, Math.min(newX, container.width - size.width));
      newY = Math.max(0, Math.min(newY, container.height - size.height));
      
      setPosition({ x: newX, y: newY });
    }
    
    if (isResizing) {
      const deltaX = e.clientX - dragStartPosRef.current.mouseX;
      const deltaY = e.clientY - dragStartPosRef.current.mouseY;
      
      const newWidth = Math.max(100, dragStartPosRef.current.elemX + deltaX);
      const newHeight = Math.max(50, dragStartPosRef.current.elemY + deltaY);
      
      setSize({ width: newWidth, height: newHeight });
    }
  }, [isDragging, isResizing, size.width, size.height]);
  
  /**
   * End dragging or resizing operation
   */
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);
  
  // Update font size when dimensions change
  useEffect(() => {
    const newFontSize = calculateFontSize(size.width, size.height);
    if (style.fontSize !== newFontSize) {
      onStyleChange({
        ...style,
        fontSize: newFontSize
      });
    }
  }, [size.width, size.height, calculateFontSize, style, onStyleChange]);
  
  // Add/remove mouse event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);
  
  // Background opacity as decimal value for styling
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
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          userSelect: 'none',
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          textShadow: bgOpacity < 0.5 ? '0px 0px 2px rgba(0,0,0,0.8)' : 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          lineHeight: 1,
        }}
        onMouseDown={handleDragStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="text-center whitespace-nowrap" style={{ lineHeight: 1 }}>
          {formatTime(timeRemaining)}
        </div>
        
        {/* Resize handle - only shown on hover or when actively resizing */}
        {(isHovering || isResizing) && (
          <ResizeHandle onResizeStart={handleResizeStart} isResizing={isResizing} />
        )}
      </div>
    </div>
  );
} 