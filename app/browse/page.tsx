'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Search, Filter, Grid3X3, List, ArrowUpDown } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navbar } from '../components/Navbar'
import { NFTGallery } from '../components/NFTGallery'
import { CreateNFTModal } from '../components/CreateNFTModal'

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

interface NFTMetadata {
  name: string
  symbol: string
  description: string
  image: string
  attributes: Array<{ trait_type: string; value: string }>
}

export default function BrowsePage() {
  const { publicKey } = useWallet()
  const [listings, setListings] = useState<NFTListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockListings: NFTListing[] = [
      {
        id: '1',
        mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        price: 0.5,
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
        name: 'Cosmic Dreamer #1',
        symbol: 'COSMIC',
        description: 'A mesmerizing digital artwork featuring cosmic elements and vibrant colors.',
        attributes: [
          { trait_type: 'Background', value: 'Cosmic' },
          { trait_type: 'Rarity', value: 'Legendary' },
          { trait_type: 'Edition', value: '1/100' }
        ],
        verified: true,
        createdAt: Date.now() - 86400000 // 1 day ago
      },
      {
        id: '2',
        mint: '8xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV',
        price: 1.2,
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        name: 'Neon City #42',
        symbol: 'NEON',
        description: 'Cyberpunk-inspired cityscape with neon lights and futuristic architecture.',
        attributes: [
          { trait_type: 'Style', value: 'Cyberpunk' },
          { trait_type: 'Rarity', value: 'Epic' },
          { trait_type: 'Edition', value: '42/500' }
        ],
        verified: true,
        createdAt: Date.now() - 172800000 // 2 days ago
      },
      {
        id: '3',
        mint: '9xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW',
        price: 0.8,
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        name: 'Abstract Harmony #7',
        symbol: 'ABSTR',
        description: 'Abstract composition with flowing lines and harmonious color palette.',
        attributes: [
          { trait_type: 'Style', value: 'Abstract' },
          { trait_type: 'Rarity', value: 'Rare' },
          { trait_type: 'Edition', value: '7/250' }
        ],
        verified: false,
        createdAt: Date.now() - 259200000 // 3 days ago
      },
      {
        id: '4',
        mint: 'AxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX',
        price: 2.5,
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
        name: 'Digital Portrait #15',
        symbol: 'PORT',
        description: 'Stunning digital portrait with intricate details and emotional depth.',
        attributes: [
          { trait_type: 'Category', value: 'Portrait' },
          { trait_type: 'Rarity', value: 'Legendary' },
          { trait_type: 'Edition', value: '15/50' }
        ],
        verified: true,
        createdAt: Date.now() - 345600000 // 4 days ago
      },
      {
        id: '5',
        mint: 'BxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY',
        price: 0.3,
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
        name: 'Minimalist Geometry #23',
        symbol: 'MIN',
        description: 'Clean geometric shapes with minimalist design principles.',
        attributes: [
          { trait_type: 'Style', value: 'Minimalist' },
          { trait_type: 'Rarity', value: 'Common' },
          { trait_type: 'Edition', value: '23/1000' }
        ],
        verified: false,
        createdAt: Date.now() - 432000000 // 5 days ago
      },
      {
        id: '6',
        mint: 'CxKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ',
        price: 1.8,
        seller: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        name: 'Futuristic Landscape #8',
        symbol: 'FUTURE',
        description: 'Imaginative landscape with futuristic elements and vibrant colors.',
        attributes: [
          { trait_type: 'Category', value: 'Landscape' },
          { trait_type: 'Rarity', value: 'Epic' },
          { trait_type: 'Edition', value: '8/300' }
        ],
        verified: true,
        createdAt: Date.now() - 518400000 // 6 days ago
      }
    ]

    // Simulate loading
    setTimeout(() => {
      setListings(mockListings)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handlePurchase = async (listing: NFTListing) => {
    console.log('Purchasing NFT:', listing)
    // Implementation for purchasing NFT
  }

  const handleViewNFT = (listing: NFTListing) => {
    console.log('Viewing NFT:', listing)
    // Implementation for viewing NFT details
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
                Browse NFTs
              </h1>
              <p className="text-xl text-gray-300">
                Discover unique digital assets on the Solana blockchain
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <CreateNFTModal />
              {publicKey && (
                <Dialog open={isListModalOpen} onOpenChange={setIsListModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 font-bold border-0">
                      <Plus className="mr-2 h-5 w-5" />
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
            </div>
          </div>
        </div>
      </div>

      {/* NFT Gallery */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NFTGallery 
            listings={listings}
            isLoading={isLoading}
            onPurchase={handlePurchase}
            onView={handleViewNFT}
          />
        </div>
      </div>
    </div>
  )
} 