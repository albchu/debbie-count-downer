import { TimerStyle } from '@/types/timer';
import { useId } from 'react';
import Instructions from './Instructions';

interface ControlPanelProps {
  youtubeUrl: string;
  onUrlChange: (url: string) => void;
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  hasVideo: boolean;
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
  timerStyle,
  onTimerStyleChange
}: ControlPanelProps) {
  const selectId = useId();

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
    <div className="w-full bg-gray-800 rounded-lg p-4 shadow-lg">
      {/* Main controls layout - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Left column - Form controls */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-300">YouTube URL:</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="Enter YouTube URL"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Minutes:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={minutes}
              onChange={(e) => onMinutesChange(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onPlayPause}
              disabled={!hasVideo}
              className={`flex-1 p-2 ${
                isPlaying
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-green-600 hover:bg-green-700'
              } rounded font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition`}
            >
              {isPlaying ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pause
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play
                </span>
              )}
            </button>
            <button
              onClick={onReset}
              disabled={!hasVideo}
              className="flex-1 p-2 bg-gray-600 hover:bg-gray-700 rounded font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </span>
            </button>
          </div>
        </div>
        
        {/* Right column - Timer style controls */}
        <div className="space-y-4">
          <div>
            <label htmlFor="bg-opacity" className="block mb-1 font-medium text-gray-300">Background Opacity:</label>
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
              <span className="font-medium text-white w-8 text-right">{timerStyle.backgroundOpacity}%</span>
            </div>
          </div>

          <div>
            <label htmlFor={selectId} className="block mb-1 font-medium text-gray-300">Font:</label>
            <select
              id={selectId}
              value={timerStyle.fontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
      
      {/* Instructions Container - now using the renamed component */}
      <Instructions />
    </div>
  );
} 