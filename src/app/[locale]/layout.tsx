import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import IntlErrorHandlingProvider from "@/components/providers/IntlErrorHandlingProvider";
import AIAssistant from "@/components/ai/AIAssistant";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "HolidaySync | Book Your Dream Activities & Tours",
    template: "%s | HolidaySync"
  },
  description: "Find and book the best holiday activities, tours, and services worldwide. Seamless booking and premium experiences.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar" | "de" | "pl" | "fr")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-white text-slate-900 antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <IntlErrorHandlingProvider locale={locale}>
            <SessionProvider>
              <Navbar />
              <main className="pt-20 md:pt-24">{children}</main>
              <AIAssistant />
              <Footer />
            </SessionProvider>
          </IntlErrorHandlingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
