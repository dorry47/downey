'use client';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import footerLinks from '../data/footerLinks.json';
import { usePathname } from 'next/navigation';
import { StateProvider } from '../../context/StateContext';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isMainPage = pathName === '/';

  return (
    <StateProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Navigation showLinks={!isMainPage} />
          {children}
          {!isMainPage && <Footer links={footerLinks} />}
        </body>
      </html>
    </StateProvider>
  );
}
