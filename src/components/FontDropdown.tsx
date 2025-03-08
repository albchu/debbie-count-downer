import { useState, useRef, useEffect } from 'react';

type FontOption = {
  label: string;
  value: string;
};

type FontCategory = {
  [category: string]: FontOption[];
};

interface FontDropdownProps {
  value: string;
  onChange: (value: string) => void;
  fontCategories: FontCategory;
}

export default function FontDropdown({ value, onChange, fontCategories }: FontDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Find the current font label
  const getCurrentFontLabel = () => {
    for (const category of Object.values(fontCategories)) {
      const font = category.find(f => f.value === value);
      if (font) return font.label;
    }
    return 'Select font';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger button */}
      <button
        type="button"
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-red-500 focus:border-transparent flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span style={{ fontFamily: value }}>
          {getCurrentFontLabel()}
        </span>
        <svg 
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-600 rounded shadow-xl max-h-[350px] overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 #1F2937'
          }}
        >
          {Object.entries(fontCategories).map(([category, fonts]) => (
            <div key={category} className="px-2 py-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-2 pb-1 sticky top-0 bg-gray-800 z-10">
                {category}
              </div>
              {fonts.map((font) => (
                <button
                  key={font.value}
                  className={`w-full text-left px-3 py-2.5 rounded transition-colors ${
                    value === font.value 
                      ? 'bg-red-500 text-white' 
                      : 'text-white hover:bg-gray-700'
                  }`}
                  style={{ fontFamily: font.value }}
                  onClick={() => {
                    onChange(font.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-base">{font.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 