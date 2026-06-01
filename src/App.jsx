import { useState, useCallback } from 'react';
import ApiKeyBar from './components/ApiKeyBar';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { generateReport } from './utils/openai';
import { STORAGE_KEY } from './constants';

function loadApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export default function App() {
  const [apiKey, setApiKey] = useState(loadApiKey);
  const [lastInput, setLastInput] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveKey = useCallback((key) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  }, []);

  const handleClearKey = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
  }, []);

  const handleGenerate = useCallback(
    async (input) => {
      setLoading(true);
      setError(null);
      setReport(null);
      setLastInput(input);

      try {
        const result = await generateReport(apiKey, input);
        setReport(result);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  const handleRegenerate = useCallback(() => {
    if (lastInput) {
      handleGenerate(lastInput);
    }
  }, [lastInput, handleGenerate]);

  return (
    <div className="min-h-screen flex flex-col">
      <ApiKeyBar apiKey={apiKey} onSave={handleSaveKey} onClear={handleClearKey} />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left Panel */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            <InputPanel
              onGenerate={handleGenerate}
              loading={loading}
              hasApiKey={!!apiKey}
            />
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-3/5">
            <OutputPanel
              report={report}
              loading={loading}
              error={error}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
        AI Weekly Report Generator &middot; Powered by OpenAI GPT-3.5 Turbo
      </footer>
    </div>
  );
}
