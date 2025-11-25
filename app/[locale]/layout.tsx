import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider";
import { NoPrefetch } from "@/components/NoPrefetch";
import { routing } from "@/i18n/routing"

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale)
  
  // Load messages for the current locale
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="light" 
        enableSystem={false} 
        disableTransitionOnChange
      >
        <NoPrefetch />
        <Navigation />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
