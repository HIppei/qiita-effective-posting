import Logo from '@/components/Logo';
import Header from '@/components/header';
import NavMenu from '@/components/nav-menu';
import TokenProvider from '@/providers/token-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
          <div className="h-screen min-w-[1080px]">
            <div className="flex h-[10%]">
              <div className="w-2/12 max-w-72 px-6 py-2">
                <Logo />
              </div>
              <div className="w-10/12">
                <Header />
              </div>
            </div>
            <div className="flex h-[90%]">
              <div className="w-2/12 max-w-72">
                <NavMenu />
              </div>
              <div className="w-10/12 border bg-gray-100 drop-shadow-sm">{children}</div>
            </div>
          </div>
        </TokenProvider>
      </body>
    </html>
  );
}
