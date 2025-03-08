import { TimerStyle } from "@/types/timer";
import TimerControls from "./TimerControls";

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
  onTimerStyleChange,
}: ControlPanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <label
          htmlFor="youtube-url"
          className="block mb-1 font-medium text-gray-300"
        >
          YouTube Video URL:
        </label>
        <input
          type="text"
          id="youtube-url"
          placeholder="Paste a YouTube URL"
          value={youtubeUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <p className="mt-1 text-sm text-gray-400">
          Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </p>
      </div>

      <TimerControls
        minutes={minutes}
        onMinutesChange={onMinutesChange}
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        onReset={onReset}
        hasVideo={hasVideo}
        timerStyle={timerStyle}
        onTimerStyleChange={onTimerStyleChange}
      />
    </div>
  );
}
