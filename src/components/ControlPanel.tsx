import { TimerPosition, TimerStyle } from '@/types/timer';
import { useId } from 'react';

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
  const selectId = useId();

  const positions: { value: TimerPosition; label: string }[] = [
    { value: 'center', label: 'Center' },
    { value: 'topLeft', label: 'Top Left' },
    { value: 'topRight', label: 'Top Right' },
    { value: 'bottomLeft', label: 'Bottom Left' },
    { value: 'bottomRight', label: 'Bottom Right' }
  ];

  // Expanded font families list with categorization
  const fontFamilies = [
    // Sans-serif fonts
    { value: 'Arial, sans-serif', label: 'Arial', category: 'Sans-serif' },
    { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica', category: 'Sans-serif' },
    { value: 'Verdana, sans-serif', label: 'Verdana', category: 'Sans-serif' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma', category: 'Sans-serif' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS', category: 'Sans-serif' },
    { value: 'system-ui, sans-serif', label: 'System UI', category: 'Sans-serif' },
    { value: '"Segoe UI", sans-serif', label: 'Segoe UI', category: 'Sans-serif' },
    { value: '"Open Sans", sans-serif', label: 'Open Sans', category: 'Sans-serif' },
    { value: 'Roboto, sans-serif', label: 'Roboto', category: 'Sans-serif' },
    { value: '"Noto Sans", sans-serif', label: 'Noto Sans', category: 'Sans-serif' },
    
    // Serif fonts
    { value: '"Times New Roman", serif', label: 'Times New Roman', category: 'Serif' },
    { value: 'Georgia, serif', label: 'Georgia', category: 'Serif' },
    { value: 'Garamond, serif', label: 'Garamond', category: 'Serif' },
    { value: 'Baskerville, serif', label: 'Baskerville', category: 'Serif' },
    { value: '"Playfair Display", serif', label: 'Playfair Display', category: 'Serif' },
    { value: 'Merriweather, serif', label: 'Merriweather', category: 'Serif' },
    
    // Monospace fonts
    { value: '"Courier New", monospace', label: 'Courier New', category: 'Monospace' },
    { value: '"Lucida Console", monospace', label: 'Lucida Console', category: 'Monospace' },
    { value: 'Consolas, monospace', label: 'Consolas', category: 'Monospace' },
    { value: '"Roboto Mono", monospace', label: 'Roboto Mono', category: 'Monospace' },
    { value: '"Source Code Pro", monospace', label: 'Source Code Pro', category: 'Monospace' },
    
    // Display fonts
    { value: 'Impact, sans-serif', label: 'Impact', category: 'Display' },
    { value: '"Arial Black", sans-serif', label: 'Arial Black', category: 'Display' },
    { value: '"Bebas Neue", sans-serif', label: 'Bebas Neue', category: 'Display' },
    { value: '"Anton", sans-serif', label: 'Anton', category: 'Display' },
    
    // Handwriting-style fonts
    { value: '"Comic Sans MS", cursive', label: 'Comic Sans MS', category: 'Handwriting' },
    { value: '"Brush Script MT", cursive', label: 'Brush Script MT', category: 'Handwriting' },
    { value: '"Dancing Script", cursive', label: 'Dancing Script', category: 'Handwriting' },
    { value: '"Pacifico", cursive', label: 'Pacifico', category: 'Handwriting' }
  ];

  // Group fonts by category for the dropdown
  const fontCategories = fontFamilies.reduce<Record<string, typeof fontFamilies>>((acc, font) => {
    if (!acc[font.category]) {
      acc[font.category] = [];
    }
    acc[font.category].push(font);
    return acc;
  }, {});

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

  const handleBackgroundOpacityChange = (opacity: number) => {
    onTimerStyleChange({
      ...timerStyle,
      backgroundOpacity: opacity
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
            <label htmlFor="bg-opacity" className="mb-1 font-medium text-gray-300">Background Opacity:</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="bg-opacity"
                min="0"
                max="100"
                value={timerStyle.backgroundOpacity}
                onChange={(e) => handleBackgroundOpacityChange(parseInt(e.target.value))}
                className="flex-grow accent-red-500"
              />
              <span className="font-medium text-white">{timerStyle.backgroundOpacity}%</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor={selectId} className="mb-1 font-medium text-gray-300">Font:</label>
            <select
              id={selectId}
              value={timerStyle.fontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              style={{ fontFamily: timerStyle.fontFamily }}
            >
              {Object.entries(fontCategories).map(([category, fonts]) => (
                <optgroup key={category} label={category}>
                  {fonts.map((font) => (
                    <option 
                      key={font.value} 
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="mt-3 p-3 bg-gray-700 border border-gray-600 rounded text-white text-center" style={{ fontFamily: timerStyle.fontFamily }}>
              Sample: 00:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 