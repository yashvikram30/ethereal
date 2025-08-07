'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { X, Upload } from 'lucide-react'
import { useState } from 'react'

interface ListNFTModalProps {
  isOpen: boolean
  onClose: () => void
  onList: (mint: string, price: number) => Promise<void>
}

export function ListNFTModal({ isOpen, onClose, onList }: ListNFTModalProps) {
  const { publicKey } = useWallet()
  const [mint, setMint] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !mint || !price) return

    setIsLoading(true)
    try {
      const priceInLamports = parseFloat(price) * 1e9 // Convert SOL to lamports
      await onList(mint, priceInLamports)
      onClose()
      setMint('')
      setPrice('')
    } catch (error) {
      console.error('List NFT failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">List NFT for Sale</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mint" className="block text-sm font-medium text-gray-700 mb-1">
              NFT Mint Address
            </label>
            <input
              type="text"
              id="mint"
              value={mint}
              onChange={(e) => setMint((e.target as HTMLInputElement).value)}
              placeholder="Enter NFT mint address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (SOL)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice((e.target as HTMLInputElement).value)}
              placeholder="0.0"
              step="0.001"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !publicKey}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-400 transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Listing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  List NFT
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 