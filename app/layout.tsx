import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from './components/WalletProvider'
import { mursGothic } from './fonts'

export const metadata: Metadata = {
  title: 'Solana NFT Marketplace',
  description: 'A decentralized NFT marketplace built on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${mursGothic.variable} font-murs dark`}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
} 