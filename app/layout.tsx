import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abhishek AR - Full Stack Python Django Developer",
  description:
    "Full Stack Python Django Developer with 2 years of professional experience. Skilled in developing web applications using Django and Flask frameworks.",
  keywords: "Python Developer, Django, Flask, Full Stack Developer, Machine Learning, AWS, Kerala",
  authors: [{ name: "Abhishek AR" }],
  creator: "Abhishek AR",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Abhishek AR - Full Stack Python Django Developer",
    description: "Full Stack Python Django Developer with 2 years of professional experience.",
    siteName: "Abhishek AR Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek AR - Full Stack Python Django Developer",
    description: "Full Stack Python Django Developer with 2 years of professional experience.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
