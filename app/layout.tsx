import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/ModalProvider'
import ToasterProvider from '@/components/ToasterProvider'
import CrispProvider from '@/components/CrispProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Gene: Unleash AI-Powered Creativity",
  description: "Boost creativity and efficiency with Gene — the AI platform for smarter content generation.",
  keywords: [
    "AI SaaS",
    "Content Generation",
    "AI Platform",
    "Next.js",
    "Tailwind CSS",
    "Prisma",
    "Stripe Payments",
  ],
  authors: [{ name: "Anisubhra Sarkar", url: "https://github.com/Anisubhra" }],
  openGraph: {
    title: "Gene | AI SaaS Platform",
    description: "Unlock smarter, faster content creation with Gene — your all-in-one AI SaaS solution.",
    url: "https://ai-saas-pi-orpin.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://ai-saas-pi-orpin.vercel.app/preview.jpeg",
        width: 1200,
        height: 630,
        alt: "Gene - AI SaaS Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gene | AI SaaS Platform",
    description: "Create content smarter and faster with Gene, the AI-powered SaaS platform.",
    creator: "@anisubhrasarkar",
    images: ["https://ai-saas-pi-orpin.vercel.app/preview.jpeg"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#111827",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
