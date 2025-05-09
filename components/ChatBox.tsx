'use client';
import { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-4">
      <div className="h-96 overflow-y-auto border-b mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={\`mb-2 \${msg.role === 'user' ? 'text-right' : 'text-left'}\`}>
            <div className={\`inline-block p-2 rounded-lg \${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}\`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-400">Sedang mengetik...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
