import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
import FullscreenView from '@/components/FullscreenView';
import { useTimer } from '@/context/TimerContext';
import TimerControls from '@/components/TimerControls';
import YouTubeUrlInput from '@/components/YouTubeUrlInput';

export default function CountdownApp() {
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

      <main className="w-full max-w-5xl bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        {/* YouTube URL input section */}
        <YouTubeUrlInput youtubeUrl={youtubeUrl} setYoutubeUrl={setYoutubeUrl} />

        {/* Responsive container for control panel and video */}
        <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-8">
          <TimerControls />
          
          {/* Video preview - always render the frame */}
          <div className="flex items-start">
            <div className="w-full relative bg-black rounded-lg overflow-hidden shadow-2xl aspect-video">
              {videoId ? (
                <YouTubePlayer />
              ) : (
                <div className="flex items-center justify-center h-full">
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