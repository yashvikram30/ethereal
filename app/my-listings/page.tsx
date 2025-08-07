'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { ArrowLeft, Package, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Navbar } from '../components/Navbar'
import { ClientOnly } from '../components/ClientOnly'

interface NFTListing {
  seller: string
  mint: string
  price: number
  created_at: number
  listing_bump: number
}

export default function MyListings() {
  const { publicKey } = useWallet()
  const [listings, setListings] = useState<NFTListing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    if (!publicKey) {
      setListings([])
      setIsLoading(false)
      return
    }

    const mockListings: NFTListing[] = [
      {
        seller: publicKey.toString(),
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        price: 1000000000, // 1 SOL in lamports
        created_at: Date.now() / 1000,
        listing_bump: 1,
      },
    ]
    setListings(mockListings)
    setIsLoading(false)
  }, [publicKey])

  const handleDelist = async (listing: NFTListing) => {
    try {
      console.log('Delisting NFT:', listing)
      setListings(prev => prev.filter(l => l.mint !== listing.mint))
    } catch (error) {
      console.error('Failed to delist NFT:', error)
      throw error
    }
  }

  if (!publicKey) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-32">
            <div className="text-gray-400 mb-8">
              <Package className="h-24 w-24 mx-auto" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">CONNECT YOUR WALLET</h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto">Please connect your wallet to view your listings.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-16">
          <Link href="/">
            <Button variant="ghost" className="mr-8 text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5 mr-3" />
              BACK
            </Button>
          </Link>
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">MY LISTINGS</h1>
            <p className="text-xl text-gray-300">Manage your NFT listings</p>
          </div>
        </div>

        {/* Listings */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-gray-400 mb-8">
              <Package className="h-24 w-24 mx-auto" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">NO LISTINGS YET</h3>
            <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">You haven't listed any NFTs for sale yet.</p>
            <Link href="/">
              <Button className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-4 text-lg font-bold">
                BROWSE MARKETPLACE
              </Button>
            </Link>
          </div>
        ) : (
          <ClientOnly>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {listings.map((listing, index) => (
                <Card key={`${listing.seller}-${listing.mint}-${index}`} className="glass-effect-dark border-white/10 bg-black/50 hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Sparkles className="h-10 w-10 text-black" />
                        </div>
                        <p className="text-sm text-gray-400">NFT #{listing.mint.slice(0, 8)}...</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-white text-black font-bold">
                              {listing.seller.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-400">
                            {listing.seller.slice(0, 4)}...{listing.seller.slice(-4)}
                          </span>
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                          {(listing.price / 1e9).toFixed(4)} SOL
                        </Badge>
                      </div>
                      
                      <Button 
                        variant="destructive" 
                        className="w-full bg-red-600 hover:bg-red-700 border-0 font-bold"
                        onClick={() => handleDelist(listing)}
                      >
                        DELIST NFT
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ClientOnly>
        )}
      </main>
    </div>
  )
} 