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
    <div className="w-full p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Video Setup</h2>
          
          <div className="flex flex-col">
            <label htmlFor="youtube-url" className="mb-1 font-medium">YouTube URL:</label>
            <input
              type="text"
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="minutes" className="mb-1 font-medium">Countdown Minutes:</label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => onMinutesChange(parseInt(e.target.value) || 0)}
              min="1"
              max="180"
              className="p-2 border border-gray-300 rounded w-32"
            />
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={onPlayPause} 
              disabled={!hasVideo}
              className={`py-2 px-4 rounded flex items-center justify-center w-24 ${
                isPlaying 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white disabled:bg-gray-400`}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button 
              onClick={onReset} 
              disabled={!hasVideo}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Timer Display</h2>
          
          <div className="flex flex-col">
            <label htmlFor="timer-position" className="mb-1 font-medium">Timer Position:</label>
            <select
              id="timer-position"
              value={timerPosition}
              onChange={(e) => onTimerPositionChange(e.target.value as TimerPosition)}
              className="p-2 border border-gray-300 rounded"
            >
              {positions.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="font-size" className="mb-1 font-medium">Font Size:</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="font-size"
                min="12"
                max="72"
                value={timerStyle.fontSize}
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                className="flex-grow"
              />
              <span className="font-medium">{timerStyle.fontSize}px</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="font-family" className="mb-1 font-medium">Font:</label>
            <select
              id="font-family"
              value={timerStyle.fontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="p-2 border border-gray-300 rounded"
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