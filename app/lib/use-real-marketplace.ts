import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'
import { SimpleMarketplaceService, PurchaseResult } from './simple-marketplace'
import { PublicKey } from '@solana/web3.js'

export function useRealMarketplace() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const marketplace = useMemo(() => {
    if (!wallet || !connection) return null
    return new SimpleMarketplaceService(connection, wallet)
  }, [connection, wallet])

  const purchaseNFT = async (
    seller: string,
    mint: string,
    price: number
  ): Promise<PurchaseResult> => {
    if (!marketplace) {
      throw new Error('Wallet not connected or marketplace not initialized')
    }

    return await marketplace.purchaseNFT(
      wallet.publicKey!,
      new PublicKey(seller),
      new PublicKey(mint),
      price
    )
  }

  const getWalletBalance = async (): Promise<number> => {
    if (!marketplace) {
      throw new Error('Wallet not connected or marketplace not initialized')
    }

    return await marketplace.getWalletBalance()
  }

  return {
    purchaseNFT,
    getWalletBalance,
    isReady: !!marketplace,
    wallet: wallet.publicKey
  }
}
