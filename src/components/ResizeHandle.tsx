import React from 'react';

interface ResizeHandleProps {
  onResizeStart: (e: React.MouseEvent | React.TouchEvent, direction: string) => void;
  direction: string;
  isVisible?: boolean;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResizeStart, direction, isVisible = false }) => {
  // Define position based on direction
  let positionClass = '';
  let cursorStyle = '';
  
  switch (direction) {
    case 'se':
      positionClass = 'bottom-0 right-0';
      cursorStyle = 'nwse-resize';
      break;
    case 'sw':
      positionClass = 'bottom-0 left-0';
      cursorStyle = 'nesw-resize';
      break;
    case 'ne':
      positionClass = 'top-0 right-0';
      cursorStyle = 'nesw-resize';
      break;
    case 'nw':
      positionClass = 'top-0 left-0';
      cursorStyle = 'nwse-resize';
      break;
    default:
      positionClass = 'bottom-0 right-0';
      cursorStyle = 'nwse-resize';
  }

  return (
    <div 
      className={`absolute ${positionClass} w-4 h-4 bg-blue-500 rounded-sm transition-opacity duration-200 ${isVisible ? 'opacity-70' : 'opacity-0'}`}
      style={{ cursor: cursorStyle }}
      onMouseDown={(e) => onResizeStart(e, direction)}
      onTouchStart={(e) => onResizeStart(e, direction)}
    />
  );
};

export default ResizeHandle; 