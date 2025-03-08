import { TimerPosition, TimerStyle } from '@/types/timer';

interface ControlPanelProps {
  youtubeUrl: string;
  onUrlChange: (url: string) => void;
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  hasVideo: boolean;
  timerPosition: TimerPosition;
  onTimerPositionChange: (position: TimerPosition) => void;
  timerStyle: TimerStyle;
  onTimerStyleChange: (style: TimerStyle) => void;
}

export default function ControlPanel({
  youtubeUrl,
  onUrlChange,
  minutes,
  onMinutesChange,
  isPlaying,
  onPlayPause,
  onReset,
  hasVideo,
  timerPosition,
  onTimerPositionChange,
  timerStyle,
  onTimerStyleChange
}: ControlPanelProps) {
  const positions: { value: TimerPosition; label: string }[] = [
    { value: 'center', label: 'Center' },
    { value: 'topLeft', label: 'Top Left' },
    { value: 'topRight', label: 'Top Right' },
    { value: 'bottomLeft', label: 'Bottom Left' },
    { value: 'bottomRight', label: 'Bottom Right' }
  ];

  const fontFamilies = [
    'sans-serif',
    'serif',
    'monospace',
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New'
  ];

  const handleFontSizeChange = (size: number) => {
    onTimerStyleChange({
      ...timerStyle,
      fontSize: size
    });
  };

  const handleFontFamilyChange = (family: string) => {
    onTimerStyleChange({
      ...timerStyle,
      fontFamily: family
    });
  };

  return (
    <div className="w-full p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Video Setup</h2>
          
          <div className="flex flex-col">
            <label htmlFor="youtube-url" className="mb-1 font-medium text-gray-300">YouTube URL:</label>
            <input
              type="text"
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="minutes" className="mb-1 font-medium text-gray-300">Countdown Minutes:</label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => onMinutesChange(parseInt(e.target.value) || 0)}
              min="1"
              max="180"
              className="p-2 bg-gray-700 border border-gray-600 rounded text-white w-32 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <button 
              onClick={onPlayPause} 
              disabled={!hasVideo}
              className={`py-2 px-4 rounded-md flex items-center justify-center w-24 font-medium transition-colors ${
                isPlaying 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed`}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button 
              onClick={onReset} 
              disabled={!hasVideo}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Timer Display</h2>
          
          <div className="flex flex-col">
            <label htmlFor="timer-position" className="mb-1 font-medium text-gray-300">Initial Position:</label>
            <select
              id="timer-position"
              value={timerPosition}
              onChange={(e) => onTimerPositionChange(e.target.value as TimerPosition)}
              className="p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {positions.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-400 mt-1">You can drag the timer to reposition it on the video.</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="font-size" className="mb-1 font-medium text-gray-300">Font Size:</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="font-size"
                min="12"
                max="72"
                value={timerStyle.fontSize}
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                className="flex-grow accent-red-500"
              />
              <span className="font-medium text-white">{timerStyle.fontSize}px</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="font-family" className="mb-1 font-medium text-gray-300">Font:</label>
            <select
              id="font-family"
              value={timerStyle.fontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 