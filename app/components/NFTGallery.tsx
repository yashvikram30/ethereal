'use client'

import { useState, useMemo } from 'react'
import { NFTCard } from './NFTCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'

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

interface NFTGalleryProps {
  listings: NFTListing[]
  onPurchase?: (listing: NFTListing) => void
  onView?: (listing: NFTListing) => void
  onFavorite?: (listing: NFTListing) => void
  onShare?: (listing: NFTListing) => void
  isLoading?: boolean
}

type SortOption = 'price-asc' | 'price-desc' | 'date-new' | 'date-old' | 'name-asc' | 'name-desc'
type ViewMode = 'grid' | 'list'

export function NFTGallery({
  listings,
  onPurchase,
  onView,
  onFavorite,
  onShare,
  isLoading = false
}: NFTGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('date-new')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    let filtered = listings.filter(listing => {
      // Search filter
      const searchMatch = 
        listing.metadata?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.metadata?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.metadata?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.mint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchTerm.toLowerCase())

      // Price filter
      const priceInSol = listing.price / 1e9
      const priceMatch = priceInSol >= priceRange[0] && priceInSol <= priceRange[1]

      // Verification filter
      const verificationMatch = !showVerifiedOnly || listing.isVerified

      return searchMatch && priceMatch && verificationMatch
    })

    // Sort listings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'date-new':
          return b.createdAt - a.createdAt
        case 'date-old':
          return a.createdAt - b.createdAt
        case 'name-asc':
          return (a.metadata?.name || '').localeCompare(b.metadata?.name || '')
        case 'name-desc':
          return (b.metadata?.name || '').localeCompare(a.metadata?.name || '')
        default:
          return 0
      }
    })

    return filtered
  }, [listings, searchTerm, sortBy, priceRange, showVerifiedOnly])

  const handlePurchase = (listing: NFTListing) => {
    if (onPurchase) {
      onPurchase(listing)
    }
  }

  const handleView = (listing: NFTListing) => {
    if (onView) {
      onView(listing)
    }
  }

  const handleFavorite = (listing: NFTListing) => {
    if (onFavorite) {
      onFavorite(listing)
    }
  }

  const handleShare = (listing: NFTListing) => {
    if (onShare) {
      onShare(listing)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg aspect-square animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search NFTs by name, description, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-900 border-gray-700 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Price:</span>
              <Input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-20 bg-gray-900 border-gray-700 text-white text-sm"
              />
              <span className="text-gray-400">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-20 bg-gray-900 border-gray-700 text-white text-sm"
              />
            </div>

            {/* Verified Only Toggle */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showVerifiedOnly}
                onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-primary-600"
              />
              <span className="text-sm text-gray-400">Verified Only</span>
            </label>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className="bg-gray-800 hover:bg-gray-700 border-gray-600"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="bg-gray-800 hover:bg-gray-700 border-gray-600"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {filteredAndSortedListings.length} of {listings.length} NFTs
          </p>
          {searchTerm && (
            <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
              Search: &quot;{searchTerm}&quot;
            </Badge>
          )}
        </div>
      </div>

      {/* NFT Grid/List */}
      {filteredAndSortedListings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No NFTs Found</h3>
          <p className="text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredAndSortedListings.map((listing) => (
            <NFTCard
              key={listing.mint}
              mint={listing.mint}
              seller={listing.seller}
              price={listing.price}
              metadata={listing.metadata}
              isVerified={listing.isVerified}
              isDevnet={listing.isDevnet}
              onPurchase={() => handlePurchase(listing)}
              onView={() => handleView(listing)}
              onFavorite={() => handleFavorite(listing)}
              onShare={() => handleShare(listing)}
            />
          ))}
        </div>
      )}
    </div>
  )
} 