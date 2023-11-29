import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Pricel3ss',
  description:
    'Track product prices effortlessly and save money on your next purchase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950`}>
        <main className="max-w-10xl mx-auto bg-gray-950">
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
