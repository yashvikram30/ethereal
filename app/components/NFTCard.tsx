'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Eye, 
  Heart, 
  Share2, 
  Verified, 
  Clock, 
  User,
  ExternalLink,
  Image as ImageIcon
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

interface NFTCardProps {
  mint: string
  seller: string
  price: number
  metadata?: NFTMetadata
  isVerified?: boolean
  isDevnet?: boolean
  onPurchase?: () => void
  onView?: () => void
  onFavorite?: () => void
  onShare?: () => void
}

export function NFTCard({
  mint,
  seller,
  price,
  metadata,
  isVerified = false,
  isDevnet = true,
  onPurchase,
  onView,
  onFavorite,
  onShare
}: NFTCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    if (onPurchase) {
      setIsLoading(true)
      try {
        await onPurchase()
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    if (onFavorite) onFavorite()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: metadata?.name || 'NFT',
        text: `Check out this NFT: ${metadata?.name}`,
        url: window.location.href
      })
    } else if (onShare) {
      onShare()
    }
  }

  const formatPrice = (price: number) => {
    return (price / 1e9).toFixed(4) + ' SOL'
  }

  const getShortAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const getImageUrl = () => {
    if (metadata?.image) {
      return metadata.image
    }
    if (metadata?.properties?.files?.[0]?.uri) {
      return metadata.properties.files[0].uri
    }
    return null
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-black border-gray-800">
      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        {getImageUrl() && !imageError ? (
          <img
            src={getImageUrl()!}
            alt={metadata?.name || 'NFT'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={onView}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleFavorite}
            className={`bg-white/20 hover:bg-white/30 text-white border-0 ${
              isFavorited ? 'text-red-400' : ''
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleShare}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Verification Badge */}
        {isVerified && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-600 hover:bg-green-700">
              <Verified className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}

        {/* Devnet Badge */}
        {isDevnet && (
          <div className="absolute top-2 left-2">
            <Badge variant="outline" className="bg-orange-600/20 text-orange-400 border-orange-400">
              Devnet
            </Badge>
          </div>
        )}
      </div>

      {/* NFT Info */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title & Price */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">
                {metadata?.name || 'Unknown NFT'}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {metadata?.symbol || 'NFT'}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-white text-lg">
                {formatPrice(price)}
              </p>
            </div>
          </div>

          {/* Description */}
          {metadata?.description && (
            <p className="text-sm text-gray-300 line-clamp-2">
              {metadata.description}
            </p>
          )}

          {/* Seller Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs bg-gray-700">
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-400">
                {getShortAddress(seller)}
              </span>
            </div>
            <Button
              size="sm"
              onClick={handlePurchase}
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              {isLoading ? 'Processing...' : 'Buy Now'}
            </Button>
          </div>

          {/* Attributes Preview */}
          {metadata?.attributes && metadata.attributes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {metadata.attributes.slice(0, 3).map((attr, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-gray-800/50 border-gray-600 text-gray-300"
                >
                  {attr.trait_type}: {attr.value}
                </Badge>
              ))}
              {metadata.attributes.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-800/50 border-gray-600 text-gray-300"
                >
                  +{metadata.attributes.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 