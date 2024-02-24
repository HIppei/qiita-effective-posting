import Logo from '@/components/Logo';
import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import Header from '@/components/header';
import NavMenu from '@/components/nav-menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Qiita Effective Posting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <div className="w-2/12 py-2 px-6">
            <Logo />
          </div>
          <div className="w-10/12">
            <Header />
          </div>
        </div>
        <div className="flex">
          <div className="w-2/12">
            <NavMenu />
          </div>
          <div className="bg-gray-50 w-10/12 h-screen">{children}</div>
        </div>
      </body>
    </html>
  );
}
