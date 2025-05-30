export const metadata = {
  title: "AI Chatbot Bebas Filter",
  description: "Chat AI gratis tanpa batasan topik."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 20, fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  );
}
