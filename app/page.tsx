'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plus, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navbar } from './components/Navbar'
import { ClientOnly } from './components/ClientOnly'
import Link from 'next/link'

export default function Home() {
  const { publicKey } = useWallet()

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
                <h1 className="text-7xl md:text-9xl font-bold leading-tight tracking-tight mt-12">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Black & White Theme */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6 group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-white/25 transition-all duration-300 hover:scale-110">
                <TrendingUp className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">10,000+</h3>
              <p className="text-gray-400 text-lg font-medium">NFTs Traded</p>
            </div>
            <div className="space-y-6 group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-white/25 transition-all duration-300 hover:scale-110">
                <Users className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">5,000+</h3>
              <p className="text-gray-400 text-lg font-medium">Active Users</p>
            </div>
            <div className="space-y-6 group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-white/25 transition-all duration-300 hover:scale-110">
                <Zap className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">50,000+</h3>
              <p className="text-gray-400 text-lg font-medium">SOL Volume</p>
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