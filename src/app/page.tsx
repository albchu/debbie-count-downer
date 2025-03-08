"use client";

import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
import CountdownTimer from '@/components/CountdownTimer';
import ControlPanel from '@/components/ControlPanel';
import FullscreenView from '@/components/FullscreenView';
import { TimerProvider, useTimer } from '@/context/TimerContext';

function CountdownApp() {
  const { videoId, isFullscreen } = useTimer();

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
        {/* Responsive container for control panel and video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control panel */}
          <div>
            <ControlPanel />
          </div>
          
          {/* Video preview */}
          {videoId && (
            <div className="flex items-start">
              <div className="w-full relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <YouTubePlayer />
              </div>
            </div>
          )}
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
