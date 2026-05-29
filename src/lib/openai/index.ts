let openaiClient: import("openai").default | null = null;

if (process.env.OPENAI_API_KEY) {
  const OpenAI = require("openai"); // eslint-disable-line
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
  console.warn(
    "[OpenAI] OPENAI_API_KEY not set — OpenAI features are disabled."
  );
}

export const openai = openaiClient;
