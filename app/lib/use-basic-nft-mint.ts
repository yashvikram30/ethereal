import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'
import { BasicNFTMintService, NFTMetadata } from './basic-nft-mint'

export function useBasicNFTMint() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const nftMintService = useMemo(() => {
    if (!wallet || !connection) return null
    return new BasicNFTMintService(connection, wallet)
  }, [connection, wallet])

  const mintNFT = async (metadata: NFTMetadata) => {
    if (!nftMintService) {
      throw new Error('Wallet not connected or service not initialized')
    }

    return await nftMintService.mintNFT(metadata)
  }

  const getWalletBalance = async () => {
    if (!nftMintService) {
      throw new Error('Wallet not connected or service not initialized')
    }

    return await nftMintService.getWalletBalance()
  }

  return {
    mintNFT,
    getWalletBalance,
    isReady: !!nftMintService,
    wallet: wallet.publicKey
  }
}
