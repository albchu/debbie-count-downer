"use client";

import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
import CountdownTimer from '@/components/CountdownTimer';
import ControlPanel from '@/components/ControlPanel';
import FullscreenView from '@/components/FullscreenView';
import { TimerProvider, useTimer } from '@/context/TimerContext';
import TimerControls from '@/components/TimerControls';

function CountdownApp() {
  const { videoId, isFullscreen, youtubeUrl, setYoutubeUrl } = useTimer();

  // If in fullscreen mode, render the fullscreen view
  if (isFullscreen && videoId) {
    return <FullscreenView />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-8">
        <div className="flex items-center justify-center">
          {/* Using the favicon SVG directly */}
          <Image
            src="/favicon.svg"
            alt="Countdowner Logo"
            width={48}
            height={48}
            className="mr-4"
          />
          <h1 className="text-4xl font-bold text-white inline-flex items-baseline">
            <span className="text-red-500">Count</span>
            <span>downer</span>
          </h1>
        </div>
      </header>

      <main className="w-full max-w-5xl">
        {/* YouTube URL input section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <div>
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
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <p className="mt-1 text-sm text-gray-400">
              Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </p>
          </div>
        </div>

        {/* Responsive container for control panel and video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TimerControls />
          
          {/* Video preview - always render the frame */}
          <div className="flex items-start">
            <div className="w-full relative bg-black rounded-lg overflow-hidden shadow-2xl" style={{minHeight: "240px"}}>
              {videoId ? (
                <YouTubePlayer />
              ) : (
                <div className="flex items-center justify-center h-full" style={{minHeight: "240px"}}>
                  <p className="text-gray-500">Enter a YouTube URL to preview video</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <TimerProvider>
      <CountdownApp />
    </TimerProvider>
  );
}
