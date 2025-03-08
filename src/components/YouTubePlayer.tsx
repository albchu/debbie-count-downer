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
        <div className="border border-gray-300 rounded p-6 text-center bg-gray-50 w-full aspect-video flex flex-col items-center justify-center">
          <p className="text-red-600 font-medium mb-4">
            This video cannot be embedded due to the creator's settings.
          </p>
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Watch on YouTube
          </a>
          {children}
        </div>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube"
            className="w-full aspect-video"
            onError={onError}
          />
          {children}
        </>
      )}
    </div>
  );
} 