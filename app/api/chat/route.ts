import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPINFRA_API_KEY}`
    },
    body: JSON.stringify({
      model: 'meta-llama/Meta-Llama-3-70B-Instruct',
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content || 'Gagal mendapatkan respons.';
  return NextResponse.json({ response: reply });
}
