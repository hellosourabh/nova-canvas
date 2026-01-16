import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nova - Neural Canvas',
  description: 'AI-powered assistant for building web applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-kimi-dark text-kimi-text">
        {children}
      </body>
    </html>
  )
}
