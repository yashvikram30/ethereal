'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Plus, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navbar } from './components/Navbar'
import { ClientOnly } from './components/ClientOnly'
import { CreateNFTModal } from './components/CreateNFTModal'
import Link from 'next/link'

export default function Home() {
  const { publicKey } = useWallet()
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  const handleListNFT = async (mint: string, price: number) => {
    // Implementation for listing NFT
    console.log('Listing NFT:', mint, 'for price:', price)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section - Inspired by the minimalist designs */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Left Column - Content */}
              <div className="lg:w-2/3 space-y-8">
                {/* Main Headline - Simplified */}
                <h1 className="text-7xl md:text-9xl font-bold leading-tight tracking-tight">
                  <span className="text-white animate-fade-in-up-delay">WHERE ART</span>
                  <br />
                  <span className="text-white animate-fade-in-up-delay-2" style={{
                    WebkitTextStroke: '2px white',
                    color: 'transparent'
                  }}>MEETS BLOCKCHAIN</span>
                </h1>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-gray-300 max-w-xl animate-fade-in-up-delay-3">
                  Discover, collect, and trade unique digital assets on the Solana blockchain.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up-delay-3">
                  <Link href="/browse">
                    <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-bold border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      BROWSE NFTS
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <ClientOnly>
                    {publicKey && (
                      <Dialog open={isListModalOpen} onOpenChange={setIsListModalOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-transparent text-white hover:bg-white/10 px-8 py-4 text-lg font-bold border border-white/20 transition-all duration-300 hover:scale-105">
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

                {/* Create NFT Button */}
                <div className="pt-4 animate-fade-in-up-delay-4">
                  <CreateNFTModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Minimalist */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">10,000+</h3>
              <p className="text-gray-400 text-lg">NFTs Traded</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">5,000+</h3>
              <p className="text-gray-400 text-lg">Active Users</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">50,000+</h3>
              <p className="text-gray-400 text-lg">SOL Volume</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">READY TO START TRADING?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of users who are already trading NFTs on our platform
            </p>
            <Link href="/browse">
              <Button className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl font-bold border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                START BROWSING
                <ArrowRight className="ml-4 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 