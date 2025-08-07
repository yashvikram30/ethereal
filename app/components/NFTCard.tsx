'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { ShoppingCart, Clock, User } from 'lucide-react'
import { useState } from 'react'

interface NFTListing {
  seller: string
  mint: string
  price: number
  created_at: number
  listing_bump: number
}

interface NFTCardProps {
  listing: NFTListing
  onPurchase: (listing: NFTListing) => void
  onDelist?: (listing: NFTListing) => void
}

export function NFTCard({ listing, onPurchase, onDelist }: NFTCardProps) {
  const { publicKey } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    if (!publicKey) return
    setIsLoading(true)
    try {
      await onPurchase(listing)
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelist = async () => {
    if (!publicKey) return
    setIsLoading(true)
    try {
      await onDelist?.(listing)
    } catch (error) {
      console.error('Delist failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isOwner = publicKey?.toString() === listing.seller
  const priceInSol = listing.price / 1e9 // Convert lamports to SOL

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <p className="text-sm text-gray-600">NFT #{listing.mint.slice(0, 8)}...</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {listing.seller.slice(0, 4)}...{listing.seller.slice(-4)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {new Date(listing.created_at * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">
            {priceInSol.toFixed(4)} SOL
          </span>
        </div>
        
        <div className="space-y-2">
          {isOwner ? (
            <button
              onClick={handleDelist}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isLoading ? 'Delisting...' : 'Delist NFT'}
            </button>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={isLoading || !publicKey}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isLoading ? 'Purchasing...' : 'Purchase NFT'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 