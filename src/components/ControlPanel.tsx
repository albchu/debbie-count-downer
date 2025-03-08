import { TimerStyle } from '@/types/timer';
import { useId } from 'react';
import Instructions from './Instructions';
import FontDropdown from './FontDropdown';

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
  const fontCategories = {
    'Sans-Serif': [
      { label: 'Arial', value: 'Arial, sans-serif' },
      { label: 'Helvetica', value: 'Helvetica, sans-serif' },
      { label: 'Open Sans', value: '"Open Sans", sans-serif' },
      { label: 'Roboto', value: 'Roboto, sans-serif' },
      { label: 'Verdana', value: 'Verdana, sans-serif' },
    ],
    'Serif': [
      { label: 'Georgia', value: 'Georgia, serif' },
      { label: 'Times New Roman', value: '"Times New Roman", serif' },
      { label: 'Playfair Display', value: '"Playfair Display", serif' },
    ],
    'Monospace': [
      { label: 'Courier New', value: '"Courier New", monospace' },
      { label: 'Roboto Mono', value: '"Roboto Mono", monospace' },
      { label: 'Source Code Pro', value: '"Source Code Pro", monospace' },
    ],
    'Display': [
      { label: 'Impact', value: 'Impact, sans-serif' },
      { label: 'Bebas Neue', value: '"Bebas Neue", sans-serif' },
      { label: 'Permanent Marker', value: '"Permanent Marker", cursive' },
    ],
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    onTimerStyleChange({
      ...timerStyle,
      fontFamily,
    });
  };

  const handleBackgroundOpacityChange = (backgroundOpacity: number) => {
    onTimerStyleChange({
      ...timerStyle,
      backgroundOpacity,
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
            <label className="block mb-1 font-medium text-gray-300">Font:</label>
            <FontDropdown 
              value={timerStyle.fontFamily}
              onChange={handleFontFamilyChange}
              fontCategories={fontCategories}
            />
          </div>
        </div>
      </div>
      
      {/* Instructions Container */}
      <Instructions />
    </div>
  );
} 