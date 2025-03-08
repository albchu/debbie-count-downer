export default function Instructions() {
  return (
    <div className="w-full bg-gray-700 rounded-lg p-3">
      <h3 className="font-bold text-white mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Timer Controls
      </h3>
      <ul className="text-sm text-gray-300 space-y-1.5 ml-1">
        <li className="flex items-start">
          <span className="text-white mr-1.5">•</span> <strong>Resize:</strong> Drag the bottom-right corner
        </li>
        <li className="flex items-start">
          <span className="text-white mr-1.5">•</span> <strong>Reposition:</strong> Drag the timer body
        </li>
        <li className="flex items-start">
          <span className="text-white mr-1.5">•</span> <strong>Transparency:</strong> Adjust with the opacity slider
        </li>
        <li className="flex items-start">
          <span className="text-white mr-1.5">•</span> <strong>Font:</strong> Select from the dropdown menu
        </li>
      </ul>
    </div>
  );
} 