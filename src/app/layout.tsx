import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { NotificationsModal } from '@/components/layout/NotificationsModal';

export const metadata: Metadata = {
  title: 'Namma Gauribidanur | Civic & Community Platform',
  description: 'Independent, mobile-first civic technology platform for Gauribidanur town and taluk in Chikkaballapur district, Karnataka. Report civic issues, view interactive maps, explore public officials directory, and read verified local news.',
  keywords: ['Gauribidanur', 'Chikkaballapur', 'Civic Complaints', 'Gauribidanur Town Municipal Council', 'Vidurashwatha', 'Taluk Office', 'Namma Gauribidanur'],
  authors: [{ name: 'Namma Gauribidanur Community Project' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#14532D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-civic-100 selection:text-civic-900">
        <AppProvider>
          <DisclaimerBanner />
          <Header />
          <main className="flex-1 safe-bottom-padding lg:pb-8">
            {children}
          </main>
          <NotificationsModal />
          <BottomNav />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
