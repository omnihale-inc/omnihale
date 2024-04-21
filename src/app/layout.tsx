import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const satoshi = localFont({ src: '../fonts/WEB/fonts/Satoshi-Regular.woff2' });

export const metadata: Metadata = {
  title: 'Omnihale',
  description: 'Providing your everyday care needs',
  icons: '/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={satoshi.className}>{children}</body>
    </html>
  );
}
