# AI Weekly Report Generator — Design Spec

**Date:** 2026-06-01
**Status:** Approved

## Overview

A single-page web application that uses OpenAI's GPT-3.5-turbo to generate professional weekly reports. Users input their weekly tasks, select a tone style, optionally add problems and next-week plans, and receive a formatted markdown report.

**Tech Stack:** React 18 + Vite + Tailwind CSS v4

## Architecture

```
src/
├── App.jsx                  # Root layout, API key state, generate handler
├── components/
│   ├── ApiKeyBar.jsx        # Top bar: API key input, save/clear, mask display
│   ├── InputPanel.jsx       # Left panel: tasks textarea, style dropdown, optional fields
│   ├── OutputPanel.jsx      # Right panel: rendered markdown, copy, regenerate
│   └── LoadingSpinner.jsx   # Animated loading indicator
├── utils/
│   └── openai.js            # buildPrompt() + callOpenAI() helpers
├── constants.js             # STYLE_OPTIONS, default prompts per style
└── index.css                # Tailwind directives + custom scrollbar/animation
```

## Component Tree & Data Flow

```
App (state: apiKey, report, loading, error)
├── ApiKeyBar
│     props: apiKey, onSave, onClear
│     behavior: reads localStorage on mount, masks key display
├── InputPanel
│     props: onGenerate, loading
│     behavior: collects tasks[], style, problems, nextWeek → passes up on generate
└── OutputPanel
      props: report, loading, error, onRegenerate
      behavior: renders markdown, Copy-to-clipboard, retry on error
```

### State (all in App.jsx, no external library)

| State      | Type          | Initial | Description                        |
|------------|---------------|---------|------------------------------------|
| apiKey     | string        | ""      | From localStorage('openai_api_key')|
| report     | string | null | null    | Generated markdown, null = no gen  |
| loading    | boolean       | false   | True during API call               |
| error      | string | null | null    | Error message if API call fails    |

## Prompt Strategy

Each style maps to a distinct system prompt:

- **Formal**: "You are a professional business report writer. Use formal, structured language with clear sections. Include a summary, detailed accomplishments, challenges, and next steps."
- **Concise**: "You are a concise report writer. Use bullet points and brief language. Keep the report short and scannable."
- **Highlights**: "You are an achievement-focused report writer. Bold key metrics and accomplishments. Use an enthusiastic but professional tone. Emphasize impact and results."

User message template:
```
This week's tasks:
{tasks}

Problems encountered:
{problems or "None"}

Next week plan:
{nextWeek or "Not specified"}
```

## API Key Handling

- Stored in localStorage under key `openai_api_key`
- Displayed masked: `sk-...xxxx` (only last 4 chars visible when saved)
- Save/Clear buttons in top bar
- If no key saved, Generate button disabled with tooltip

## Error States

| Condition             | Handling                                        |
|-----------------------|-------------------------------------------------|
| No API key            | Generate disabled, "Please set API key" hint     |
| No tasks entered      | Generate disabled, "Enter tasks" hint            |
| Network/API error     | Red error card in OutputPanel + Retry button     |
| Empty response        | "No content generated" message                   |

## Empty States

- OutputPanel before first generation: centered illustration/text "Your weekly report will appear here"
- ApiKeyBar first visit: empty input with placeholder "Enter your OpenAI API key (sk-...)"

## Loading State

- Generate button shows spinner + "Generating..." text, disabled
- OutputPanel shows LoadingSpinner component (pulsing dots or skeleton)

## Responsive Behavior

- Desktop (>=768px): side-by-side panels (left 40%, right 60%)
- Mobile (<768px): stacked vertically, full width

## File Checklist

- [ ] `package.json` — React 18, Vite, Tailwind v4
- [ ] `vite.config.js`
- [ ] `index.html`
- [ ] `src/main.jsx`
- [ ] `src/App.jsx`
- [ ] `src/components/ApiKeyBar.jsx`
- [ ] `src/components/InputPanel.jsx`
- [ ] `src/components/OutputPanel.jsx`
- [ ] `src/components/LoadingSpinner.jsx`
- [ ] `src/utils/openai.js`
- [ ] `src/constants.js`
- [ ] `src/index.css`
- [ ] `README.md`
- [ ] `.env.example`
- [ ] `.gitignore`
