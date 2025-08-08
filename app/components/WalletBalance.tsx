'use client'

import { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Badge } from '@/components/ui/badge'
import { Wallet, Coins } from 'lucide-react'

export function WalletBalance() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!publicKey || !connection) return

    const fetchBalance = async () => {
      setLoading(true)
      try {
        const balance = await connection.getBalance(publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error('Error fetching balance:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()

    // Set up a subscription to listen for balance changes
    const subscriptionId = connection.onAccountChange(publicKey, () => {
      fetchBalance()
    })

    return () => {
      connection.removeAccountChangeListener(subscriptionId)
    }
  }, [publicKey, connection])

  if (!publicKey) return null

  return (
    <div className="flex items-center space-x-2">
      <Wallet className="h-4 w-4 text-gray-400" />
      <span className="text-sm text-gray-300">Balance:</span>
      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
        {loading ? (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 border-2 border-green-300 border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Coins className="h-3 w-3" />
            <span>{balance !== null ? `${balance.toFixed(4)} SOL` : 'Unknown'}</span>
          </div>
        )}
      </Badge>
      {balance !== null && balance < 0.01 && (
        <Badge variant="outline" className="border-yellow-500/20 text-yellow-300 text-xs">
          Low Balance
        </Badge>
      )}
    </div>
  )
} 