import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Engelleri Aşın",
  description: "Cuma Karadaş'ın Freelancer web projesidir",
  generator: "Cuma Karadaş",
  icons: {
    icon: "/Logo.jpg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
