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
