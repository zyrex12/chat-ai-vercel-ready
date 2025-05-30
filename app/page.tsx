'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  async function sendMessage() {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setChat(prev => [...prev, `🧑: ${input}`, `🤖: ${data.response}`]);
    setInput('');
  }

  return (
    <main>
      <h1>AI Chatbot Tanpa Filter</h1>
      <div style={{ marginBottom: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Tanya apa saja..." style={{ width: '60%' }} />
        <button onClick={sendMessage}>Kirim</button>
      </div>
      <div>
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </main>
  );
}
