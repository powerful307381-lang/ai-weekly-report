import { useState } from 'react';
import { STYLE_OPTIONS } from '../constants';

export default function InputPanel({ onGenerate, loading, hasApiKey }) {
  const [tasks, setTasks] = useState('');
  const [style, setStyle] = useState('formal');
  const [problems, setProblems] = useState('');
  const [nextWeek, setNextWeek] = useState('');

  const canGenerate = hasApiKey && tasks.trim().length > 0 && !loading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canGenerate) return;
    onGenerate({ tasks: tasks.trim(), style, problems: problems.trim(), nextWeek: nextWeek.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          This Week's Tasks
        </label>
        <textarea
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder="Enter each task on a new line...&#10;&#10;e.g.&#10;Completed user auth module&#10;Fixed 3 production bugs&#10;Reviewed PRs for team"
          rows={8}
          className="textarea-field"
        />
        <p className="text-xs text-gray-400 mt-1">
          One task per line — {tasks.split('\n').filter(Boolean).length} task(s) entered
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Report Style
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="select-field"
        >
          {STYLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Problems &amp; Challenges <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
          placeholder="Describe any blockers or difficulties..."
          rows={3}
          className="textarea-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Next Week Plan <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={nextWeek}
          onChange={(e) => setNextWeek(e.target.value)}
          placeholder="What you plan to work on next week..."
          rows={3}
          className="textarea-field"
        />
      </div>

      <button
        type="submit"
        disabled={!canGenerate}
        className="btn-primary w-full flex items-center justify-center gap-2"
        title={
          !hasApiKey
            ? 'Please set your API key first'
            : !tasks.trim()
              ? 'Enter at least one task'
              : ''
        }
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            Generate Report
          </>
        )}
      </button>
    </form>
  );
}
