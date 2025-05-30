'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)
    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.response }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Terjadi kesalahan.' }])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">AI Chat (Tanpa Filter)</h1>
      <div className="border rounded p-4 h-96 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-blue-600' : 'text-green-700'}>
            <b>{m.role === 'user' ? 'Kamu' : 'AI'}:</b> {m.text}
          </div>
        ))}
        {loading && <div className="text-gray-400">AI sedang mengetik...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Tulis pesan..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          Kirim
        </button>
      </div>
    </div>
  )
}
