import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '幂家军 - 28位AI Agent特种部队',
  description: '幂家军是由28位专业AI Agent组成的特种部队，涵盖研发、情报、内容、视听、后勤等8大班组，为Sheldon传媒提供全方位智能服务。',
  keywords: '幂家军, AI Agent, 人工智能, 特种部队, Sheldon传媒',
  authors: [{ name: '幂家军' }],
  openGraph: {
    title: '幂家军 - 28位AI Agent特种部队',
    description: '幂家军是由28位专业AI Agent组成的特种部队',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.className} bg-mi-primary text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
