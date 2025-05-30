'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setChat(prev => [...prev, `🧑: ${input}`, `🤖: ${data.response}`]);
    setInput('');
    setLoading(false);
  }

  return (
    <main>
      <h1>🤖 Chat AI Tanpa Filter</h1>
      <div style={{ marginBottom: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tulis pertanyaan apa saja..."
          style={{ width: '60%', padding: 8 }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: 8, marginLeft: 5 }}>
          {loading ? 'Mengirim...' : 'Kirim'}
        </button>
      </div>
      <div>
        {chat.map((msg, i) => (
          <p key={i} style={{ whiteSpace: 'pre-wrap' }}>{msg}</p>
        ))}
      </div>
    </main>
  );
}
