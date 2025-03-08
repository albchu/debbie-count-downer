import { useTimer } from '@/context/TimerContext';

export function usePlayControls() {
  const { isPlaying, togglePlayPause, resetTimer, videoId } = useTimer();
  
  // Derived state
  const hasVideo = !!videoId;
  
  // Button styles based on state
  const startButtonClass = `flex-1 px-4 py-2 rounded font-medium flex items-center justify-center ${
    hasVideo
      ? isPlaying
        ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
        : 'bg-green-500 hover:bg-green-600 text-gray-900'
      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
  }`;
  
  const resetButtonClass = `flex-1 px-4 py-2 rounded font-medium flex items-center justify-center ${
    hasVideo
      ? 'bg-red-500 hover:bg-red-600 text-white'
      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
  }`;
  
  return {
    isPlaying,
    togglePlayPause,
    resetTimer,
    hasVideo,
    startButtonClass,
    resetButtonClass
  };
} 