'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { Package, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Navbar } from '../components/Navbar'
import { ClientOnly } from '../components/ClientOnly'

interface NFTListing {
  id: string
  mint: string
  price: number
  seller: string
  image: string
  name: string
  symbol: string
  description: string
  attributes: Array<{ trait_type: string; value: string }>
  verified: boolean
  createdAt: number
}

export default function MyListings() {
  const { publicKey } = useWallet()
  const [listings, setListings] = useState<NFTListing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load user listings from localStorage
  useEffect(() => {
    if (!publicKey) {
      setListings([])
      setIsLoading(false)
      return
    }

    try {
      const storedListings = localStorage.getItem('userListings')
      if (storedListings) {
        const allListings: NFTListing[] = JSON.parse(storedListings)
        // Filter listings for current user
        const userListings = allListings.filter(
          listing => listing.seller === publicKey.toString()
        )
        setListings(userListings)
      } else {
        setListings([])
      }
    } catch (error) {
      console.error('Error loading listings:', error)
      setListings([])
    }
    
    setIsLoading(false)
  }, [publicKey])

  const handleDelist = async (listing: NFTListing) => {
    try {
      console.log('Delisting NFT:', listing)
      
      // Remove from local state
      setListings(prev => prev.filter(l => l.mint !== listing.mint))
      
      // Remove from localStorage
      const storedListings = localStorage.getItem('userListings')
      if (storedListings) {
        const allListings: NFTListing[] = JSON.parse(storedListings)
        const updatedListings = allListings.filter(l => l.mint !== listing.mint)
        localStorage.setItem('userListings', JSON.stringify(updatedListings))
      }
      
      alert('NFT delisted successfully!')
    } catch (error) {
      console.error('Failed to delist NFT:', error)
      alert('Failed to delist NFT. Please try again.')
    }
  }

  if (!publicKey) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-32">
              <div className="text-gray-400 mb-8">
                <Package className="h-24 w-24 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">CONNECT YOUR WALLET</h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto">Please connect your wallet to view your listings.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My Listings
              </h1>
              <p className="text-xl text-gray-300">
                Manage your NFT listings on the Solana blockchain
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Gallery */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">You haven&apos;t listed any NFTs for sale yet.</p>
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
                    <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                      {listing.image ? (
                        <img 
                          src={listing.image} 
                          alt={listing.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Sparkles className="h-10 w-10 text-black" />
                          </div>
                          <p className="text-sm text-gray-400">NFT #{listing.mint.slice(0, 8)}...</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-white text-lg mb-1">{listing.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{listing.description}</p>
                      </div>
                      
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
                          {listing.price.toFixed(4)} SOL
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
        </div>
      </div>
    </div>
  )
} 