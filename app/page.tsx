"use client";
import { useChat } from "ai/react";
import { useEffect } from "react";

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Asisten AI Bahasa Indonesia</h1>
      <div
        id="chat-box"
        className="w-full max-w-2xl h-[60vh] overflow-y-auto bg-gray-800 p-4 rounded shadow"
      >
        {messages.map((m, i) => (
          <div key={i} className={`my-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <p
              className={`inline-block p-2 rounded-lg ${
                m.role === "user" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex mt-4 gap-2"
      >
        <input
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Ketik pesan..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
