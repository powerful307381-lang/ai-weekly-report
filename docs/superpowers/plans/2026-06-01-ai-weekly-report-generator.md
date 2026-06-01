# AI Weekly Report Generator — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React+Vite app that generates weekly reports via OpenAI GPT-3.5-turbo

**Architecture:** React 18 + Vite + Tailwind CSS v4. Single page with three panels: top API key bar, left input panel, right output panel. All state managed in App.jsx with props drilling. OpenAI calls via a utility module.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v4, no router needed (single page)

---

### Task 0: Git Init & Project Scaffold

**Files:**
- Create: `.gitignore`
- Create: `.env.example`
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`

- [ ] **Step 1: Initialize git repository**

```bash
cd D:/Claude/ai-weekly-report && git init
```

- [ ] **Step 2: Create .gitignore**

```
node_modules
dist
.env
*.local
.DS_Store
```

- [ ] **Step 3: Create .env.example**

```
VITE_OPENAI_API_KEY=sk-your-api-key-here
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

- [ ] **Step 4: Create package.json**

```json
{
  "name": "ai-weekly-report",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.4",
    "@vitejs/plugin-react": "^4.5.2",
    "tailwindcss": "^4.1.4",
    "vite": "^6.3.5"
  }
}
```

- [ ] **Step 5: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 6: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Weekly Report Generator</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>📊</text></svg>" />
  </head>
  <body class="bg-gray-50 text-gray-900 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold project with Vite + React + Tailwind"
```

---

### Task 1: Tailwind CSS Setup & Global Styles

**Files:**
- Create: `src/index.css`

- [ ] **Step 1: Create src/index.css**

```css
@import "tailwindcss";

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }
}

@layer components {
  .card {
    @apply bg-white rounded-2xl shadow-sm border border-gray-100 p-6;
  }

  .btn-primary {
    @apply px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl
           hover:bg-indigo-700 active:scale-[0.97]
           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600
           transition-all duration-200 cursor-pointer select-none;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl
           hover:bg-gray-200 active:scale-[0.97]
           transition-all duration-200 cursor-pointer select-none;
  }

  .input-field {
    @apply w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
           focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
           placeholder:text-gray-400 transition-all duration-200;
  }

  .textarea-field {
    @apply input-field resize-none;
  }

  .select-field {
    @apply input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10;
  }
}

@layer utilities {
  .markdown-body h1 { @apply text-xl font-bold mt-6 mb-3 text-gray-900; }
  .markdown-body h2 { @apply text-lg font-semibold mt-5 mb-2 text-gray-800; }
  .markdown-body h3 { @apply text-base font-semibold mt-4 mb-1.5 text-gray-800; }
  .markdown-body p { @apply mb-3 leading-relaxed; }
  .markdown-body ul { @apply list-disc pl-5 mb-3 space-y-1; }
  .markdown-body ol { @apply list-decimal pl-5 mb-3 space-y-1; }
  .markdown-body li { @apply leading-relaxed; }
  .markdown-body strong { @apply font-semibold text-gray-900; }
  .markdown-body code { @apply bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-700; }
  .markdown-body pre { @apply bg-gray-900 text-gray-100 p-4 rounded-xl mb-3 overflow-x-auto; }
  .markdown-body pre code { @apply bg-transparent text-gray-100 p-0; }
  .markdown-body hr { @apply my-4 border-gray-200; }
  .markdown-body blockquote { @apply border-l-4 border-indigo-300 pl-4 italic text-gray-600 my-3; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css && git commit -m "style: add Tailwind v4 setup and global utility classes"
```

---

### Task 2: Constants

**Files:**
- Create: `src/constants.js`

- [ ] **Step 1: Create src/constants.js**

```js
export const STYLE_OPTIONS = [
  { value: 'formal', label: 'Formal' },
  { value: 'concise', label: 'Concise' },
  { value: 'highlights', label: 'Highlights' },
];

export const STYLE_PROMPTS = {
  formal:
    'You are a professional business report writer. Use formal, structured language with clear sections. Include a summary, detailed accomplishments, challenges, and next steps.',
  concise:
    'You are a concise report writer. Use bullet points and brief language. Keep the report short and scannable.',
  highlights:
    'You are an achievement-focused report writer. Bold key metrics and accomplishments. Use an enthusiastic but professional tone. Emphasize impact and results.',
};

export const STORAGE_KEY = 'openai_api_key';

export const DEFAULT_MODEL = 'gpt-3.5-turbo';
```

- [ ] **Step 2: Commit**

```bash
git add src/constants.js && git commit -m "feat: add style options and prompt constants"
```

---

### Task 3: OpenAI Utility

**Files:**
- Create: `src/utils/openai.js`

- [ ] **Step 1: Create src/utils/openai.js**

```js
import { STYLE_PROMPTS } from '../constants';

const BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1';
const MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo';

/**
 * Build system and user messages from input data.
 */
export function buildMessages({ tasks, style, problems, nextWeek }) {
  const systemPrompt =
    STYLE_PROMPTS[style] || STYLE_PROMPTS.formal;

  const userContent = [
    "This week's tasks:",
    tasks,
    '',
    'Problems encountered:',
    problems || 'None',
    '',
    'Next week plan:',
    nextWeek || 'Not specified',
  ].join('\n');

  return {
    system: systemPrompt,
    user: userContent,
  };
}

/**
 * Call OpenAI chat completions API.
 * @param {string} apiKey
 * @param {{ tasks: string, style: string, problems?: string, nextWeek?: string }} input
 * @returns {Promise<string>} Generated markdown report
 */
export async function generateReport(apiKey, input) {
  const { system, user } = buildMessages(input);

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData.error?.message || `API request failed with status ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content generated. Please try again.');
  }

  return content.trim();
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/openai.js && git commit -m "feat: add OpenAI API utility with prompt builder"
```

---

### Task 4: LoadingSpinner Component

**Files:**
- Create: `src/components/LoadingSpinner.jsx`

- [ ] **Step 1: Create src/components/LoadingSpinner.jsx**

```jsx
export default function LoadingSpinner({ text = 'Generating...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 font-medium">{text}</p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoadingSpinner.jsx && git commit -m "feat: add LoadingSpinner component with bouncing dots"
```

---

### Task 5: ApiKeyBar Component

**Files:**
- Create: `src/components/ApiKeyBar.jsx`

- [ ] **Step 1: Create src/components/ApiKeyBar.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ApiKeyBar.jsx && git commit -m "feat: add ApiKeyBar component with masked display and save/clear"
```

---

### Task 6: InputPanel Component

**Files:**
- Create: `src/components/InputPanel.jsx`

- [ ] **Step 1: Create src/components/InputPanel.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InputPanel.jsx && git commit -m "feat: add InputPanel with tasks, style, problems, and next-week fields"
```

---

### Task 7: OutputPanel Component

**Files:**
- Create: `src/components/OutputPanel.jsx`

- [ ] **Step 1: Create src/components/OutputPanel.jsx**

```jsx
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function OutputPanel({ report, loading, error, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = report;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="card min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-600 font-medium text-sm text-center max-w-xs">{error}</p>
        <button onClick={onRegenerate} className="btn-secondary text-sm">
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (!report) {
    return (
      <div className="card min-h-[400px] flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm font-medium">Your weekly report will appear here</p>
        <p className="text-gray-300 text-xs">Fill in your tasks and click Generate</p>
      </div>
    );
  }

  // Report rendered state
  return (
    <div className="card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Generated Report
        </h2>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="btn-secondary text-xs flex items-center gap-1.5">
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </button>
          <button onClick={onRegenerate} className="btn-secondary text-xs flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Regenerate
          </button>
        </div>
      </div>

      <div
        className="markdown-body prose prose-sm max-w-none text-sm text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatMarkdown(report) }}
      />
    </div>
  );
}

/**
 * Simple markdown-to-HTML formatter.
 * Handles: headings, bold, italic, lists, code blocks, paragraphs, horizontal rules.
 */
function formatMarkdown(md) {
  let html = md
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Unordered lists — group consecutive items
  html = html.replace(/((?:^- .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => `<li>${line.replace(/^- /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => `<li>${line.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs — wrap remaining text blocks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(\s*<(?:h[1-4]|ul|ol|pre|hr))/g, '$1');
  html = html.replace(/(<\/(?:h[1-4]|ul|ol|pre)>)\s*<\/p>/g, '$1');

  return html;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/OutputPanel.jsx && git commit -m "feat: add OutputPanel with markdown rendering, copy, and error states"
```

---

### Task 8: App.jsx (Root Component)

**Files:**
- Create: `src/App.jsx`

- [ ] **Step 1: Create src/App.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx && git commit -m "feat: add App root component with state management and layout"
```

---

### Task 9: Entry Point

**Files:**
- Create: `src/main.jsx`

- [ ] **Step 1: Create src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 2: Commit**

```bash
git add src/main.jsx && git commit -m "feat: add React entry point"
```

---

### Task 10: README.md

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

````markdown
# 📊 AI Weekly Report Generator

A modern web application that generates professional weekly reports using OpenAI's GPT-3.5-turbo. Input your tasks, choose a style, and get a polished markdown report in seconds.

![Screenshot Placeholder](docs/screenshot.png)

## Features

- **Three Report Styles** — Formal, Concise, and Highlights-focused
- **OpenAI Powered** — Uses GPT-3.5-turbo for natural, professional writing
- **Markdown Output** — Rich formatting with headings, lists, bold, and more
- **One-Click Copy** — Copy the generated report to clipboard instantly
- **Local API Key Storage** — Your key stays in your browser's localStorage
- **Responsive Design** — Works on desktop and mobile
- **Zero Backend** — Pure frontend, no server needed

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| OpenAI API (gpt-3.5-turbo) | Report generation |

## Prerequisites

- **Node.js** >= 18
- **OpenAI API Key** — Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-weekly-report.git
cd ai-weekly-report

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will open at `http://localhost:5173`.

## Usage

1. **Set your API Key** — Enter your OpenAI API key in the top bar and click Save. It's stored only in your browser.
2. **Enter tasks** — Type your weekly tasks in the left panel, one per line.
3. **Choose style** — Select Formal, Concise, or Highlights from the dropdown.
4. **Optional fields** — Add problems/challenges and next week's plan for a more complete report.
5. **Generate** — Click the Generate button and wait a few seconds.
6. **Copy or Regenerate** — Copy the markdown to your clipboard, or regenerate if you want a different version.

## Configuration

You can customize the API endpoint and model via environment variables:

```bash
# .env (copy from .env.example)
VITE_OPENAI_API_KEY=sk-your-key-here      # Optional — set in UI instead
VITE_OPENAI_BASE_URL=https://api.openai.com/v1  # Default OpenAI endpoint
VITE_OPENAI_MODEL=gpt-3.5-turbo           # Model to use
```

**Note:** Environment variables prefixed with `VITE_` are exposed to the browser. Only use them for non-sensitive config. Store your API key in the UI for safety.

## Project Structure

```
src/
├── App.jsx                      # Root component
├── main.jsx                     # Entry point
├── index.css                    # Global styles + Tailwind
├── constants.js                 # Style options and prompts
├── components/
│   ├── ApiKeyBar.jsx            # API key input bar
│   ├── InputPanel.jsx           # Task input and controls
│   ├── OutputPanel.jsx          # Report display and actions
│   └── LoadingSpinner.jsx       # Loading animation
└── utils/
    └── openai.js                # OpenAI API helper
```

## License

MIT
````

- [ ] **Step 2: Commit**

```bash
git add README.md && git commit -m "docs: add README with installation and usage instructions"
```

---

### Task 11: Install Dependencies & Verify Build

- [ ] **Step 1: Install npm dependencies**

```bash
cd D:/Claude/ai-weekly-report && npm install
```
Expected: packages installed successfully, no errors.

- [ ] **Step 2: Run production build to verify no errors**

```bash
cd D:/Claude/ai-weekly-report && npm run build
```
Expected: `dist/` directory created, build completes with no errors.

- [ ] **Step 3: Verify all files exist**

```bash
cd D:/Claude/ai-weekly-report && find . -not -path './node_modules/*' -not -path './dist/*' -not -path './.git/*' -type f | sort
```
Expected: All 15 source files present.

- [ ] **Step 4: Final commit if any lockfile changes**

```bash
git add -A && git commit -m "chore: add lockfile after install" || echo "Nothing to commit"
```
