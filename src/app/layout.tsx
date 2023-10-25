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
  const [appReady, setAppReady] = useState(false); // Add a state for app readiness

  useEffect(() => {
    const footerHeight = document.querySelector('footer')?.clientHeight || 0;
    setScreenHeight(window.innerHeight - footerHeight);

    setTimeout(() => {
      setAppReady(true); // Set app readiness to true when loading is complete
    }, 500); // Replace 2000 with your loading time
  }, []);

  function LoadingScreen() {
    return (
      <div className=" h-fit w-fit m-auto flex text-center text-2xl">
        Loading...
      </div>
    );
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
          <body
            className={`${inter.className} ${
              !appReady && 'flex align-middle h-screen'
            }`}>
            {appReady ? (
              <>
                <Navigation showLinks={!isMainPage} />
                <div style={{ minHeight: screenHeight - 120 + 'px' }}>
                  {children}
                </div>
                {!isMainPage && <Footer links={footerLinks} />}
              </>
            ) : (
              <LoadingScreen />
            )}
          </body>
        </html>
      </QueryClientProvider>
    </StateProvider>
  );
}
