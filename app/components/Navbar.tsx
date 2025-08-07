'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Store, Menu } from 'lucide-react'
import Link from 'next/link'
import { WalletMultiButtonDynamic } from './WalletProvider'
import { ClientOnly } from './ClientOnly'

export function Navbar() {
  const { publicKey } = useWallet()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left - Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Store className="h-4 w-4 text-black" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider">ETHEREAL</span>
                <span className="text-sm text-gray-400 tracking-wider block">MARKETPLACE</span>
              </div>
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 text-sm font-medium tracking-wider">
                BROWSE
              </Button>
            </Link>
            {publicKey && (
              <Link href="/my-listings">
                <Button variant="ghost" className="text-white hover:bg-white/10 text-sm font-medium tracking-wider">
                  MY LISTINGS
                </Button>
              </Link>
            )}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4">
            <ClientOnly>
              <div className="flex items-center space-x-3">
                <WalletMultiButtonDynamic className="bg-white text-black hover:bg-gray-100 border-0 font-bold px-4 py-2 text-sm" />
                {publicKey && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    CONNECTED
                  </Badge>
                )}
              </div>
            </ClientOnly>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" className="md:hidden text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 