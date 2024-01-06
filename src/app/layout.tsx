import { cookies } from 'next/headers'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'
import { manrope } from './ui/fonts'
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
    <html lang="en">
      <body className={`font-sans ${manrope.variable} antialiased`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  )
}
