export const metadata = {
  title: "AI Chatbot Tanpa Filter",
  description: "Chatbot AI tanpa larangan dan filter bawaan."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 20, fontFamily: 'sans-serif', background: '#f9f9f9' }}>{children}</body>
    </html>
  );
}
