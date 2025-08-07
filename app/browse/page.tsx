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
import { Navbar } from '../components/Navbar'
import { ClientOnly } from '../components/ClientOnly'
import { NFTGallery } from '../components/NFTGallery'

interface NFTMetadata {
  name: string
  symbol: string
  description: string
  image: string
  attributes?: Array<{
    trait_type: string
    value: string
  }>
  properties?: {
    files?: Array<{
      uri: string
      type: string
    }>
  }
}

interface NFTListing {
  mint: string
  seller: string
  price: number
  metadata?: NFTMetadata
  isVerified?: boolean
  isDevnet?: boolean
  createdAt: number
}

export default function BrowsePage() {
  const { publicKey } = useWallet()
  const [listings, setListings] = useState<NFTListing[]>([])
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data with actual NFT images and metadata
  useEffect(() => {
    const mockListings: NFTListing[] = [
      {
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        price: 1000000000, // 1 SOL in lamports
        createdAt: Date.now() / 1000,
        isDevnet: true,
        isVerified: false,
        metadata: {
          name: 'Cosmic Dreamer #001',
          symbol: 'COSMIC',
          description: 'A mesmerizing digital artwork featuring cosmic landscapes and ethereal beings. This piece explores the intersection of technology and spirituality.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
          attributes: [
            { trait_type: 'Background', value: 'Cosmic' },
            { trait_type: 'Rarity', value: 'Legendary' },
            { trait_type: 'Edition', value: '1 of 100' }
          ]
        }
      },
      {
        mint: 'So11111111111111111111111111111111111111112',
        seller: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
        price: 2500000000, // 2.5 SOL in lamports
        createdAt: Date.now() / 1000 - 86400, // 1 day ago
        isDevnet: true,
        isVerified: false,
        metadata: {
          name: 'Neon City Nights',
          symbol: 'NEON',
          description: 'A cyberpunk-inspired digital cityscape with neon lights and futuristic architecture. This piece captures the essence of urban futurism.',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
          attributes: [
            { trait_type: 'Style', value: 'Cyberpunk' },
            { trait_type: 'Rarity', value: 'Epic' },
            { trait_type: 'Edition', value: '1 of 50' }
          ]
        }
      },
      {
        mint: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
        seller: '3XwxHcbyqcd1xkB3KhC9zXKzX7KzX7KzX7KzX7KzX7Kz',
        price: 5000000000, // 5 SOL in lamports
        createdAt: Date.now() / 1000 - 172800, // 2 days ago
        isDevnet: true,
        isVerified: false,
        metadata: {
          name: 'Abstract Harmony',
          symbol: 'ABSTRACT',
          description: 'An abstract composition exploring color theory and geometric forms. This piece represents the harmony between chaos and order.',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
          attributes: [
            { trait_type: 'Style', value: 'Abstract' },
            { trait_type: 'Rarity', value: 'Rare' },
            { trait_type: 'Edition', value: '1 of 25' }
          ]
        }
      },
      {
        mint: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        seller: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        price: 7500000000, // 7.5 SOL in lamports
        createdAt: Date.now() / 1000 - 259200, // 3 days ago
        isDevnet: true,
        isVerified: false,
        metadata: {
          name: 'Digital Garden',
          symbol: 'GARDEN',
          description: 'A lush digital garden filled with exotic flora and fauna. This piece celebrates the beauty of nature in the digital realm.',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
          attributes: [
            { trait_type: 'Theme', value: 'Nature' },
            { trait_type: 'Rarity', value: 'Common' },
            { trait_type: 'Edition', value: '1 of 200' }
          ]
        }
      },
      {
        mint: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
        seller: 'So11111111111111111111111111111111111111112',
        price: 3000000000, // 3 SOL in lamports
        createdAt: Date.now() / 1000 - 345600, // 4 days ago
        isDevnet: true,
        isVerified: false,
        metadata: {
          name: 'Quantum Dreams',
          symbol: 'QUANTUM',
          description: 'A surreal exploration of quantum mechanics and consciousness. This piece delves into the mysteries of the universe.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
          attributes: [
            { trait_type: 'Concept', value: 'Quantum' },
            { trait_type: 'Rarity', value: 'Legendary' },
            { trait_type: 'Edition', value: '1 of 10' }
          ]
        }
      },
      {
        mint: '3XwxHcbyqcd1xkB3KhC9zXKzX7KzX7KzX7KzX7KzX7Kz',
        seller: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
        price: 1500000000, // 1.5 SOL in lamports
        createdAt: Date.now() / 1000 - 432000, // 5 days ago
        isDevnet: true,
        isVerified: false,
        metadata: {
          name: 'Retro Wave',
          symbol: 'RETRO',
          description: 'A nostalgic journey through 80s aesthetics with modern digital art techniques. This piece combines retro and contemporary styles.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
          attributes: [
            { trait_type: 'Era', value: '80s' },
            { trait_type: 'Rarity', value: 'Epic' },
            { trait_type: 'Edition', value: '1 of 75' }
          ]
        }
      }
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

  const handleViewNFT = (listing: NFTListing) => {
    console.log('Viewing NFT:', listing)
    // TODO: Implement NFT detail view
  }

  const handleFavoriteNFT = (listing: NFTListing) => {
    console.log('Favoriting NFT:', listing)
    // TODO: Implement favorite functionality
  }

  const handleShareNFT = (listing: NFTListing) => {
    console.log('Sharing NFT:', listing)
    // TODO: Implement share functionality
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Browse Header */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-8 tracking-tight">BROWSE NFTS</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover unique digital artworks from talented creators around the world
            </p>
          </div>
          
          {/* List NFT Button */}
          <div className="flex justify-center mb-12">
            <ClientOnly>
              {publicKey && (
                <Dialog open={isListModalOpen} onOpenChange={setIsListModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-bold border-0 transition-all duration-300 hover:scale-105">
                      <Plus className="mr-3 h-6 w-6" />
                      LIST YOUR NFT
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
          
          {/* NFT Gallery */}
          <NFTGallery
            listings={listings}
            onPurchase={handlePurchase}
            onView={handleViewNFT}
            onFavorite={handleFavoriteNFT}
            onShare={handleShareNFT}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  )
} 