import { ReactNode, useEffect, useRef } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  embedError: boolean;
  onError: () => void;
  children?: ReactNode;
}

export default function YouTubePlayer({ videoId, embedError, onError, children }: YouTubePlayerProps) {
  // Use a ref to allow direct interaction with the iframe
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full relative">
      {embedError ? (
        <div className="border border-gray-700 rounded-lg p-6 text-center bg-gray-800 w-full aspect-video flex flex-col items-center justify-center">
          <p className="text-red-400 font-medium mb-4">
            This video cannot be embedded due to the creator's settings.
          </p>
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Watch on YouTube
          </a>
          <div className="pointer-events-none">{children}</div>
        </div>
      ) : (
        <div className="relative">
          <iframe
            ref={iframeRef}
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube"
            className="w-full aspect-video rounded-lg"
            onError={onError}
          />
          {children}
        </div>
      )}
    </div>
  );
} 