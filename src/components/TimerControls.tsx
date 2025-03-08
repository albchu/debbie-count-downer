import FontDropdown from './FontDropdown';
import PlayControls from './PlayControls';
import { useTimer } from '@/context/TimerContext';
import { FONT_CATEGORIES } from '@/constants/fonts';

export default function TimerControls() {
  const { 
    durationSeconds,
    setDurationSeconds,
    videoId, 
    timerStyle, 
    setTimerStyle, 
    toggleFullscreen,
    timerDimensions
  } = useTimer();

  // Format duration for display (MM:SS)
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle duration change with 5-second increments
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const roundedValue = Math.round(value / 5) * 5;
    setDurationSeconds(roundedValue);
  };

  // Handle style changes
  const handleFontSizeChange = (size: number) => {
    setTimerStyle({
      ...timerStyle,
      fontSize: size
    });
  };

  const handleFontFamilyChange = (family: string) => {
    setTimerStyle({
      ...timerStyle,
      fontFamily: family
    });
  };

  const handleBackgroundOpacityChange = (opacity: number) => {
    setTimerStyle({
      ...timerStyle,
      backgroundOpacity: opacity
    });
  };

  const hasVideo = !!videoId;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-6">
        {/* Duration Slider */}
        <div>
          <label htmlFor="duration" className="block mb-1 font-medium text-gray-300">
            Timer Duration: {formatDuration(durationSeconds)}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id="duration"
              min="5"
              max="3600"
              step="5"
              value={durationSeconds}
              onChange={handleDurationChange}
              className="flex-grow accent-red-500"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5s</span>
            <span>30m</span>
            <span>60m</span>
          </div>
        </div>

        {/* Play/Pause and Reset Controls */}
        <PlayControls />

        {/* Ready Button for entering fullscreen mode */}
        <button
          onClick={toggleFullscreen}
          disabled={!hasVideo}
          className={`w-full px-4 py-3 rounded font-medium flex items-center justify-center ${
            hasVideo
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
          Ready - Enter Fullscreen
        </button>

        {/* Font Size */}
        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Font Size: {timerStyle.fontSize}px
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="12"
              max="100"
              value={timerStyle.fontSize}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
              className="flex-grow accent-red-500"
            />
          </div>
        </div>

        {/* Background Opacity */}
        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Background Opacity: {timerStyle.backgroundOpacity}%
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="100"
              value={timerStyle.backgroundOpacity}
              onChange={(e) => handleBackgroundOpacityChange(parseInt(e.target.value))}
              className="flex-grow accent-red-500"
            />
          </div>
        </div>

        {/* Font Dropdown */}
        <div>
          <label className="block mb-1 font-medium text-gray-300">Font:</label>
          <FontDropdown 
            value={timerStyle.fontFamily}
            onChange={handleFontFamilyChange}
            fontCategories={FONT_CATEGORIES}
          />
        </div>

        {/* Position and Size Information */}
        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Timer Position & Size:
          </label>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>X: {Math.round(timerStyle.position?.x || 50)}%</span>
            <span>Y: {Math.round(timerStyle.position?.y || 10)}%</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-gray-400">
            <span>Width: {Math.round(timerDimensions.width)}px</span>
            <span>Height: {Math.round(timerDimensions.height)}px</span>
          </div>
          <div className="p-4 mt-2 border border-gray-700 rounded bg-gray-900 text-center">
            <p className="text-sm">Drag the timer on the video to reposition</p>
            <p className="text-sm mt-1">Use corner handles to resize</p>
          </div>
        </div>
      </div>
    </div>
  );
} 