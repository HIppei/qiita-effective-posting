import Logo from '@/components/Logo';
import Header from '@/components/header';
import NavMenu from '@/components/nav-menu';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TokenProvider from '@/providers/token-provider';

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
        <TokenProvider>
          <div className="flex">
            <div className="w-2/12 px-6 py-2">
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
            <div className="h-screen w-10/12 bg-gray-50">{children}</div>
          </div>
        </TokenProvider>
      </body>
    </html>
  );
}
