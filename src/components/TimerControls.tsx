import FontDropdown from "./FontDropdown";
import PlayControls from "./PlayControls";
import { useTimer } from "@/context/TimerContext";
import { FONT_CATEGORIES } from "@/constants/fonts";
import { FullscreenIcon } from "./icons/PlayerIcons";

export default function TimerControls() {
  const {
    durationSeconds,
    setDurationSeconds,
    videoId,
    timerStyle,
    setTimerStyle,
    toggleFullscreen,
    timerDimensions,
  } = useTimer();

  // Format duration for display (MM:SS)
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
      fontSize: size,
    });
  };

  const handleFontFamilyChange = (family: string) => {
    setTimerStyle({
      ...timerStyle,
      fontFamily: family,
    });
  };

  const handleBackgroundOpacityChange = (opacity: number) => {
    setTimerStyle({
      ...timerStyle,
      backgroundOpacity: opacity,
    });
  };

  const hasVideo = !!videoId;

  return (
    <div className="flex flex-col space-y-6 p-6 ">
      {/* Duration Slider */}
      <div>
        <label
          htmlFor="duration"
          className="block mb-1 font-medium text-gray-300"
        >
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
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        <FullscreenIcon />
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
            onChange={(e) =>
              handleBackgroundOpacityChange(parseInt(e.target.value))
            }
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
    </div>
  );
}
