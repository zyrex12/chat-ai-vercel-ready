import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const defaultPrompt = process.env.BOT_PERSONALITY || 'Kamu adalah asisten AI yang ramah dan cerdas. Jawab dengan sopan dan gunakan bahasa Indonesia.';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: defaultPrompt },
      ...messages,
    ],
  });

  const reply = completion.data.choices[0].message?.content;
  return NextResponse.json({ reply });
}
