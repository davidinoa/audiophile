import { cookies } from 'next/headers'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'
import Providers from './providers'
import { manrope } from './ui/fonts'
import Footer from './ui/footer'
import Header from './ui/header'

export const metadata = {
  title: 'Audiophile',
  description: 'Audiophile e-commerce website',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
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
      </body>
    </html>
  )
}
