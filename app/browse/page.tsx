'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Search, Filter, Grid3X3, List, ArrowUpDown } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRealMarketplace } from '../lib/use-real-marketplace'
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
  const { purchaseNFT, getWalletBalance, isReady } = useRealMarketplace()
  const [listings, setListings] = useState<NFTListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [listFormData, setListFormData] = useState({
    mint: '',
    price: ''
  })

  // Load existing listings from localStorage
  useEffect(() => {
    try {
      const storedListings = localStorage.getItem('userListings')
      if (storedListings) {
        const allListings: NFTListing[] = JSON.parse(storedListings)
        setListings(allListings)
      } else {
        setListings([])
      }
    } catch (error) {
      console.error('Error loading listings:', error)
      setListings([])
    }
    
    setIsLoading(false)
  }, [])

  const handlePurchase = async (listing: NFTListing) => {
    if (!publicKey || !isReady) {
      alert('Please connect your wallet first')
      return
    }

    try {
      // Check wallet balance
      const balance = await getWalletBalance()
      if (balance < listing.price) {
        alert(`Insufficient balance. You have ${balance.toFixed(4)} SOL, need ${listing.price} SOL`)
        return
      }

      // Confirm purchase
      const confirmed = window.confirm(
        `Are you sure you want to purchase "${listing.name}" for ${listing.price} SOL?`
      )
      
      if (!confirmed) return

      // Execute purchase
      const result = await purchaseNFT(
        listing.seller,
        listing.mint,
        listing.price
      )

      if (result.success) {
        alert(`Purchase successful! Transaction: ${result.signature}`)
        console.log('Purchase result:', result)
      } else {
        alert('Purchase failed. Please try again.')
      }
    } catch (error) {
      console.error('Error purchasing NFT:', error)
      alert(`Error purchasing NFT: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleViewNFT = (listing: NFTListing) => {
    console.log('Viewing NFT:', listing)
    // Implementation for viewing NFT details
  }

  const handleListNFT = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    if (!listFormData.mint || !listFormData.price) {
      alert('Please fill in all fields')
      return
    }

    const price = parseFloat(listFormData.price)
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price')
      return
    }

    try {
      // Create new listing with proper image
      const newListing: NFTListing = {
        id: Date.now().toString(),
        mint: listFormData.mint,
        price: price,
        seller: publicKey.toString(),
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        name: `Your Listed NFT #${Date.now()}`,
        symbol: 'LISTED',
        description: `NFT listed for ${price} SOL`,
        attributes: [
          { trait_type: 'Status', value: 'Listed' },
          { trait_type: 'Price', value: `${price} SOL` },
          { trait_type: 'Mint', value: listFormData.mint.slice(0, 8) + '...' }
        ],
        verified: false,
        createdAt: Date.now()
      }

      // Add to listings
      setListings(prev => [newListing, ...prev])
      
      // Save to localStorage
      const existingListings = localStorage.getItem('userListings')
      const allListings = existingListings ? JSON.parse(existingListings) : []
      allListings.unshift(newListing)
      localStorage.setItem('userListings', JSON.stringify(allListings))
      
      // Close modal and reset form
      setIsListModalOpen(false)
      setListFormData({ mint: '', price: '' })
      
      alert(`NFT listed successfully for ${price} SOL!`)
      console.log('NFT listed:', newListing)
      
    } catch (error) {
      console.error('Error listing NFT:', error)
      alert(`Error listing NFT: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
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
                          value={listFormData.mint}
                          onChange={(e) => setListFormData(prev => ({ ...prev, mint: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price" className="text-white text-lg">Price (SOL)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.0"
                          value={listFormData.price}
                          onChange={(e) => setListFormData(prev => ({ ...prev, price: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                        />
                      </div>
                      <Button 
                        onClick={handleListNFT}
                        className="w-full bg-white text-black hover:bg-gray-100 border-0 py-4 text-lg font-bold"
                      >
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