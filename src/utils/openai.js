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
