import { ReactNode } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  onError?: () => void;
  embedError?: boolean;
  children?: ReactNode;
}

export default function YouTubePlayer({ 
  videoId, 
  onError, 
  embedError = false, 
  children 
}: YouTubePlayerProps) {
  // Standard YouTube embed parameters
  const embedParams = new URLSearchParams({
    autoplay: '0',
    modestbranding: '1',
    rel: '0',
    showinfo: '0',
    fs: '1'
  }).toString();
  
  // Construct embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${embedParams}`;
  
  return (
    <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
      {embedError ? (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="text-xl font-bold mb-2">Video Embed Error</p>
            <p>Unable to load the video. Please check the URL and try again.</p>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={onError}
        ></iframe>
      )}
      
      {/* Render children (like the timer) above the video */}
      {children}
    </div>
  );
} 