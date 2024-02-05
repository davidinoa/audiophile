import { SpeedInsights } from '@vercel/speed-insights/next'
import { cookies } from 'next/headers'
import { manrope } from '~/lib/fonts'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'
import Footer from './components/footer'
import Header from './components/header'
import Providers from './providers'

export const metadata = {
  title: 'Audiophile',
  description: 'Audiophile e-commerce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.className} antialiased`}>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
