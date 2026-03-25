import './globals.css';

export const metadata = {
  title: 'CosmeticTrust',
  description: 'Verify skincare authenticity, freshness, and tamper safety.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-md px-4 py-6 md:max-w-5xl">{children}</main>
      </body>
    </html>
  );
}
