import { TimerStyle } from '@/types/timer';
import FontDropdown from './FontDropdown';

interface TimerControlsProps {
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  hasVideo: boolean;
  timerStyle: TimerStyle;
  onTimerStyleChange: (style: TimerStyle) => void;
}

export default function TimerControls({
  minutes,
  onMinutesChange,
  isPlaying,
  onPlayPause,
  onReset,
  hasVideo,
  timerStyle,
  onTimerStyleChange
}: TimerControlsProps) {
  // Font categories for dropdown
  const fontCategories = {
    'System': [
      { label: 'Sans Serif', value: 'sans-serif' },
      { label: 'Serif', value: 'serif' },
      { label: 'Monospace', value: 'monospace' }
    ],
    'Sans-Serif': [
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
      { label: 'Verdana', value: 'Verdana' },
      { label: 'Trebuchet MS', value: 'Trebuchet MS' },
      { label: 'Gill Sans', value: 'Gill Sans' }
    ],
    'Serif': [
      { label: 'Times New Roman', value: 'Times New Roman' },
      { label: 'Georgia', value: 'Georgia' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Palatino', value: 'Palatino' }
    ],
    'Display': [
      { label: 'Impact', value: 'Impact' },
      { label: 'Comic Sans MS', value: 'Comic Sans MS' },
      { label: 'Copperplate', value: 'Copperplate' },
      { label: 'Papyrus', value: 'Papyrus' }
    ]
  };

  // Handle style changes
  const handleFontSizeChange = (size: number) => {
    onTimerStyleChange({ ...timerStyle, fontSize: size });
  };

  const handleFontFamilyChange = (family: string) => {
    onTimerStyleChange({ ...timerStyle, fontFamily: family });
  };

  const handleBackgroundOpacityChange = (opacity: number) => {
    onTimerStyleChange({ ...timerStyle, backgroundOpacity: opacity });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-6">
        {/* Minutes Input */}
        <div>
          <label htmlFor="minutes" className="block mb-1 font-medium text-gray-300">
            Timer Duration (minutes):
          </label>
          <input
            type="number"
            id="minutes"
            min="1"
            max="60"
            value={minutes}
            onChange={(e) => onMinutesChange(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        {/* Play/Pause and Reset Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onPlayPause}
            disabled={!hasVideo}
            className={`flex-1 px-4 py-2 rounded font-medium flex items-center justify-center ${
              hasVideo
                ? isPlaying
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                  : 'bg-green-500 hover:bg-green-600 text-gray-900'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isPlaying ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Start
              </>
            )}
          </button>
          <button
            onClick={onReset}
            disabled={!hasVideo}
            className={`flex-1 px-4 py-2 rounded font-medium flex items-center justify-center ${
              hasVideo
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Reset
          </button>
        </div>

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
            fontCategories={fontCategories}
          />
        </div>
      </div>
    </div>
  );
} 