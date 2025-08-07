'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Search, 
  Plus, 
  Sparkles, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp,
  Users,
  Coins,
  Star,
  ArrowRight,
  Menu,
  ChevronDown
} from 'lucide-react'
import { Navbar } from './components/Navbar'
import { ClientOnly } from './components/ClientOnly'

interface NFTListing {
  seller: string
  mint: string
  price: number
  created_at: number
  listing_bump: number
}

export default function Home() {
  const { publicKey } = useWallet()
  const [listings, setListings] = useState<NFTListing[]>([])
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockListings: NFTListing[] = [
      {
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        price: 1000000000, // 1 SOL in lamports
        created_at: Date.now() / 1000,
        listing_bump: 1,
      },
      {
        seller: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
        mint: 'So11111111111111111111111111111111111111112',
        price: 2500000000, // 2.5 SOL in lamports
        created_at: Date.now() / 1000 - 86400, // 1 day ago
        listing_bump: 2,
      },
    ]
    setListings(mockListings)
    setIsLoading(false)
  }, [])

  const handleListNFT = async (mint: string, price: number) => {
    if (!publicKey) return
    try {
      console.log('Listing NFT:', { mint, price })
    } catch (error) {
      console.error('Failed to list NFT:', error)
      throw error
    }
  }

  const handlePurchase = async (listing: NFTListing) => {
    if (!publicKey) return
    try {
      console.log('Purchasing NFT:', listing)
    } catch (error) {
      console.error('Failed to purchase NFT:', error)
      throw error
    }
  }

  const filteredListings = listings.filter(listing =>
    listing.mint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.seller.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section - Inspired by the minimalist designs */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.1) 2px,
              rgba(255,255,255,0.1) 4px
            )`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Column - Main Content */}
            <div className="lg:w-2/3 space-y-12 z-10">
              {/* Brand/Logo Area */}
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse-slow">
                    <Sparkles className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-wider animate-slide-in-left">ETHEREAL</h2>
                    <p className="text-sm text-gray-400 tracking-wider animate-slide-in-left-delay">NFT MARKETPLACE</p>
                  </div>
                </div>
              </div>

              {/* Main Headline - Simplified */}
              <div className="space-y-8">
                <h1 className="text-7xl md:text-9xl font-bold leading-tight tracking-tight">
                  <span className="text-white animate-fade-in-up-delay">REDEFINING</span>
                  <br />
                  <span className="text-white animate-fade-in-up-delay-2" style={{
                    WebkitTextStroke: '2px white',
                    color: 'transparent'
                  }}>COMMERCE</span>
                </h1>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up-delay-3">
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-bold border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  EXPLORE
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="lg:w-1/3 flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative animate-float">
                <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse-slow">
                  <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse-slow-delay">
                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse-slow-delay-2">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse-slow-delay-3">
                        <Sparkles className="h-8 w-8 text-black animate-spin-slow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Minimalist */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="text-center animate-fade-in-up">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400 text-sm tracking-wider">ACTIVE TRADERS</div>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400 text-sm tracking-wider">NFTS TRADED</div>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-white mb-2">$2M+</div>
              <div className="text-gray-400 text-sm tracking-wider">VOLUME TRADED</div>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-gray-400 text-sm tracking-wider">USER RATING</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean Grid */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">WHY CHOOSE OUR PLATFORM?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Built for the future of digital commerce</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center animate-pulse-slow">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white">LIGHTNING FAST</h3>
              <p className="text-gray-300 leading-relaxed">
                Experience instant transactions with Solana's high-performance blockchain. 
                No more waiting for confirmations.
              </p>
            </div>
            
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center animate-pulse-slow">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white">SECURE & TRUSTLESS</h3>
              <p className="text-gray-300 leading-relaxed">
                Your assets are protected by smart contracts. No intermediaries, 
                no trust required.
              </p>
            </div>
            
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center animate-pulse-slow">
                <Globe className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white">GLOBAL ACCESS</h3>
              <p className="text-gray-300 leading-relaxed">
                Trade with anyone, anywhere in the world. 
                No geographical restrictions or barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section - Clean Layout */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">FEATURED NFTS</h2>
              <p className="text-xl text-gray-300">Discover the latest and greatest digital assets</p>
            </div>
            
            <ClientOnly>
              {publicKey && (
                <Dialog open={isListModalOpen} onOpenChange={setIsListModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-6 sm:mt-0 bg-white text-black hover:bg-gray-100 border-0 px-8 py-4 text-lg font-bold">
                      <Plus className="mr-3 h-6 w-6" />
                      LIST NFT
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-effect-dark border-white/10 bg-black/90">
                    <DialogHeader>
                      <DialogTitle className="text-white text-2xl">List Your NFT</DialogTitle>
                      <DialogDescription className="text-gray-300 text-lg">
                        Enter the details of the NFT you want to list for sale.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="mint" className="text-white text-lg">NFT Mint Address</Label>
                        <Input 
                          id="mint" 
                          placeholder="Enter NFT mint address"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price" className="text-white text-lg">Price (SOL)</Label>
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="0.0"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                        />
                      </div>
                      <Button className="w-full bg-white text-black hover:bg-gray-100 border-0 py-4 text-lg font-bold">
                        List NFT
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </ClientOnly>
          </div>

          {/* Search */}
          <div className="mb-16">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by mint address or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 py-4 text-lg"
              />
            </div>
          </div>

          {/* NFT Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-6">
                <Search className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No listings found</h3>
              <p className="text-gray-400 text-lg">
                {searchTerm ? 'Try adjusting your search terms.' : 'Be the first to list an NFT!'}
              </p>
            </div>
          ) : (
            <ClientOnly>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredListings.map((listing, index) => (
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
                        
                        <Button className="w-full bg-white text-black hover:bg-gray-100 border-0 font-bold">
                          Purchase NFT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ClientOnly>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold">ETHEREAL NFT MARKETPLACE</span>
            </div>
            <div className="text-sm text-gray-400">
              E-MAIL / LINKEDIN / INSTAGRAM
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 