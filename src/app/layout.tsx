import type { Metadata } from 'next';
import type { Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const satoshi = localFont({ src: '../fonts/WEB/fonts/Satoshi-Regular.woff2' });

export const metadata: Metadata = {
  title: 'Omnihale',
  description: 'Providing your everyday care needs',
  icons: '/logo.svg',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={satoshi.className}>
        <div id='modal' style={{ zIndex: 20 }}></div>
        {children}
      </body>
    </html>
  );
}
