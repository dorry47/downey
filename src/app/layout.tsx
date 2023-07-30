'use client';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import footerLinks from '../data/footerLinks.json';
import { usePathname, useRouter } from 'next/navigation';
import { StateProvider } from '../../context/StateContext';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isMainPage = pathName === '/';
  const queryClient = new QueryClient();

  const router = useRouter();

  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const footerHeight = document.querySelector('footer')?.clientHeight || 0;
    setScreenHeight(window.innerHeight - footerHeight);
  }, []);

  // if localstorage session is empty then redirect to login page
  if (typeof window !== 'undefined') {
    const session = JSON.parse(localStorage.getItem('session') as string);
    if (!session) {
      router.push('/');
    }
  }

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <Head>
            <title>Downey Street Events - Planning App</title>
            <meta
              name="description"
              content="Downey Street Events Planning App"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="title" content="Downey Street Events - Planning App" />
          </Head>
          <body className={`${inter.className} `}>
            <Navigation showLinks={!isMainPage} />
            <div style={{ minHeight: screenHeight - 120 + 'px' }}>
              {children}
            </div>
            {!isMainPage && <Footer links={footerLinks} />}
          </body>
        </html>
      </QueryClientProvider>
    </StateProvider>
  );
}
