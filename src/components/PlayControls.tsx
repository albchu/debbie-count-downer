import { usePlayControls } from '@/hooks/usePlayControls';
import { PlayIcon, PauseIcon, ResetIcon } from './icons/PlayerIcons';

export default function PlayControls() {
  const {
    isPlaying,
    togglePlayPause,
    resetTimer,
    hasVideo,
    startButtonClass,
    resetButtonClass
  } = usePlayControls();

  return (
    <div className="flex space-x-4">
      <button
        onClick={togglePlayPause}
        disabled={!hasVideo}
        className={startButtonClass}
      >
        {isPlaying ? (
          <>
            <PauseIcon />
            Pause
          </>
        ) : (
          <>
            <PlayIcon />
            Start
          </>
        )}
      </button>
      <button
        onClick={resetTimer}
        disabled={!hasVideo}
        className={resetButtonClass}
      >
        <ResetIcon />
        Reset
      </button>
    </div>
  );
} 