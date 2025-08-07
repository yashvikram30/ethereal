'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
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
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const { publicKey } = useWallet()
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  const handleListNFT = async (mint: string, price: number) => {
    if (!publicKey) return
    try {
      console.log('Listing NFT:', { mint, price })
    } catch (error) {
      console.error('Failed to list NFT:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section - Inspired by the minimalist designs */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black"></div>
        
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
                {/* Brand Section */}
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center space-x-4">
                    {/* Logo Image */}
                    <div className="w-12 h-12 flex items-center justify-center animate-pulse-slow">
                      <Image 
                        src="/logo.png" 
                        alt="Ethereal Logo" 
                        width={48} 
                        height={48}
                        className="rounded-full"
                      />
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
                    <span className="text-white animate-fade-in-up-delay">WHERE ART</span>
                    <br />
                    <span className="text-white animate-fade-in-up-delay-2" style={{
                      WebkitTextStroke: '2px white',
                      color: 'transparent'
                    }}>MEETS BLOCKCHAIN</span>
                  </h1>
                </div>

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
                Trade with anyone, anywhere in the world. No borders, 
                no restrictions.
              </p>
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