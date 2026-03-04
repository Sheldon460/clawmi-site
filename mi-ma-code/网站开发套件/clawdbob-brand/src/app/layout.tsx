import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

import { Providers } from "@/components/providers"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "ClawdBob - 你的AI智能助手",
    template: "%s | ClawdBob",
  },
  description: "ClawdBob是一个智能AI助手，提供对话、技能包、商店等多种功能。让你体验未来的AI交互方式。",
  keywords: ["AI", "人工智能", "聊天机器人", "智能助手", "ClawdBob"],
  authors: [{ name: "ClawdBob Team" }],
  creator: "ClawdBob",
  publisher: "ClawdBob",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://clawdbob.com",
    siteName: "ClawdBob",
    title: "ClawdBob - 你的AI智能助手",
    description: "ClawdBob是一个智能AI助手，提供对话、技能包、商店等多种功能。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClawdBob",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawdBob - 你的AI智能助手",
    description: "ClawdBob是一个智能AI助手，提供对话、技能包、商店等多种功能。",
    images: ["/og-image.jpg"],
    creator: "@clawdbob",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://clawdbob.com",
    languages: {
      "zh-CN": "https://clawdbob.com",
      "en-US": "https://clawdbob.com/en",
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
