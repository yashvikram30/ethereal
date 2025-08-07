'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Sparkles, Loader2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface NFTFormData {
  name: string
  symbol: string
  description: string
  imageUrl: string
  attributes: Array<{ trait_type: string; value: string }>
}

export function CreateNFTModal() {
  const { publicKey } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<NFTFormData>({
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
    attributes: [{ trait_type: '', value: '' }]
  })

  const handleInputChange = (field: keyof NFTFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAttributeChange = (index: number, field: 'trait_type' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }))
  }

  const addAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: '', value: '' }]
    }))
  }

  const removeAttribute = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }))
  }

  const createNFT = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsCreating(true)

    try {
      // Simulate NFT creation process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert(`NFT created successfully! This is a demo - in a real implementation, your NFT would be minted on Solana devnet.`)
      setIsOpen(false)
      setFormData({
        name: '',
        symbol: '',
        description: '',
        imageUrl: '',
        attributes: [{ trait_type: '', value: '' }]
      })

    } catch (error) {
      console.error('Error creating NFT:', error)
      alert('Error creating NFT. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-6 py-3 font-bold">
          <Plus className="mr-2 h-5 w-5" />
          CREATE YOUR NFT
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-effect-dark border-white/10 bg-black/90 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-purple-400" />
            Create Your NFT
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-lg">
            Mint your own NFT on Solana devnet and list it for sale
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Basic Information</h3>
            
            <div>
              <Label htmlFor="name" className="text-white text-sm">NFT Name *</Label>
              <Input
                id="name"
                placeholder="My Awesome NFT"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="symbol" className="text-white text-sm">Symbol *</Label>
              <Input
                id="symbol"
                placeholder="MNFT"
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white text-sm">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your NFT..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl" className="text-white text-sm">Image URL *</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.png"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-1"
              />
            </div>
          </div>

          {/* Attributes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold">Attributes</h3>
              <Button
                type="button"
                onClick={addAttribute}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Attribute
              </Button>
            </div>

            {formData.attributes.map((attr, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Trait Type"
                  value={attr.trait_type}
                  onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Input
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  variant="outline"
                  size="sm"
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Preview */}
          {formData.name && (
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Preview</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{formData.name}</h4>
                    <p className="text-gray-400 text-sm">{formData.symbol}</p>
                  </div>
                </div>
                {formData.description && (
                  <p className="text-gray-300 text-sm mb-3">{formData.description}</p>
                )}
                {formData.attributes.some(attr => attr.trait_type && attr.value) && (
                  <div className="flex flex-wrap gap-2">
                    {formData.attributes
                      .filter(attr => attr.trait_type && attr.value)
                      .map((attr, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {attr.trait_type}: {attr.value}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={createNFT}
              disabled={!formData.name || !formData.symbol || !formData.imageUrl || isCreating}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 font-bold"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating NFT...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create NFT
                </>
              )}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> This is a demo implementation. In a real application, 
              this would create your NFT on Solana devnet using the Metaplex Token Metadata program. 
              You'll need some devnet SOL to cover transaction fees.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 