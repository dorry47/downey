'use client';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import footerLinks from '../data/footerLinks.json';
import { StateProvider } from '../../context/StateContext';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = typeof window !== 'undefined' && window.location.pathname;
  const isMainPage = pathName === '/';
  // const queryClient = new QueryClient();

  const footerHeight =
    (typeof window !== 'undefined' &&
      document.querySelector('footer')?.clientHeight) ||
    0;

  const screenHeight =
    typeof window !== 'undefined' && window.innerHeight - footerHeight;

  return (
    <StateProvider>
      <html lang="en">
        <Head>
          <title>Downey Street Events - Planning App</title>
          <meta
            name="description"
            content="Downey Street Events Planning App"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="Downey Street Events - Planning App" />
        </Head>
        <body className={`${inter.className} `}>
          <Navigation showLinks={!isMainPage} />

          <div style={{ minHeight: Number(screenHeight) - 120 + 'px' }}>
            {children}
          </div>

          {!isMainPage && <Footer links={footerLinks} />}
        </body>
      </html>
    </StateProvider>
  );
}
