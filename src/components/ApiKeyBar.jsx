import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../constants';

export default function ApiKeyBar({ apiKey, onSave, onClear }) {
  const [inputValue, setInputValue] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setIsSaved(true);
      setInputValue('');
    }
  }, [apiKey]);

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  const handleClear = () => {
    setInputValue('');
    setIsSaved(false);
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
  };

  const maskKey = (key) => {
    if (key.length <= 8) return '••••••••';
    return key.slice(0, 3) + '••••' + key.slice(-4);
  };

  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          API Key
        </span>

        {isSaved ? (
          <div className="flex-1 flex items-center gap-3">
            <code className="text-xs bg-gray-50 px-3 py-1.5 rounded-lg text-gray-500 font-mono select-all">
              {maskKey(apiKey)}
            </code>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-600 font-medium">Saved</span>
            <button onClick={handleClear} className="btn-secondary text-xs ml-auto">
              Clear
            </button>
          </div>
        ) : (
          <>
            <input
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your OpenAI API key (sk-...)"
              className="input-field flex-1 text-sm"
            />
            <button
              onClick={handleSave}
              disabled={!inputValue.trim()}
              className="btn-primary text-sm"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}
