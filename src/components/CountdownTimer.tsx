import { TimerPosition, TimerStyle } from '@/types/timer';

interface CountdownTimerProps {
  timeRemaining: number;
  position: TimerPosition;
  style: TimerStyle;
}

export default function CountdownTimer({ timeRemaining, position, style }: CountdownTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div 
      className={`absolute ${positionClass} bg-black/70 text-white px-4 py-2 rounded pointer-events-none`}
      style={{
        fontSize: `${style.fontSize}px`,
        fontFamily: style.fontFamily,
        zIndex: 10,
        ...centerStyles
      }}
    >
      {formatTime(timeRemaining)}
    </div>
  );
} 