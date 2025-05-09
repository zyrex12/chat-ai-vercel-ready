import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Asisten AI Bahasa Indonesia</h1>
      <ChatBox />
    </main>
  );
}
