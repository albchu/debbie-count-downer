import React from 'react';

interface YouTubeUrlInputProps {
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
}

const YouTubeUrlInput: React.FC<YouTubeUrlInputProps> = ({ youtubeUrl, setYoutubeUrl }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8 inline-block min-w-[150px] max-w-full">
        <input
          type="text"
          id="youtube-url"
          placeholder="Paste a YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white w-full text-ellipsis overflow-hidden"
          size={Math.max(20, youtubeUrl.length)}
        />
    </div>
  );
};

export default YouTubeUrlInput; 