import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

export interface PurchaseResult {
  signature: string
  explorerUrl: string
  success: boolean
}

export class SimpleMarketplaceService {
  private connection: Connection
  private wallet: any

  constructor(connection: Connection, wallet: any) {
    this.connection = connection
    this.wallet = wallet
  }

  async purchaseNFT(
    buyer: PublicKey,
    seller: PublicKey,
    mint: PublicKey,
    price: number
  ): Promise<PurchaseResult> {
    if (!this.wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    try {
      console.log('Starting NFT purchase...')
      console.log('Buyer:', buyer.toString())
      console.log('Seller:', seller.toString())
      console.log('Mint:', mint.toString())
      console.log('Price:', price, 'SOL')

      // Check buyer balance
      const buyerBalance = await this.connection.getBalance(buyer)
      const priceInLamports = price * LAMPORTS_PER_SOL
      
      if (buyerBalance < priceInLamports) {
        throw new Error(`Insufficient balance. You have ${buyerBalance / LAMPORTS_PER_SOL} SOL, need ${price} SOL`)
      }

      // Create transaction
      const transaction = new Transaction()

      // Transfer SOL from buyer to seller
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: buyer,
          toPubkey: seller,
          lamports: priceInLamports,
        })
      )

      // Set transaction details
      transaction.feePayer = buyer
      const { blockhash } = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash

      console.log('Transaction prepared, sending...')

      // Send the transaction
      const signature = await this.wallet.sendTransaction(transaction, this.connection, {
        preflightCommitment: 'confirmed',
        maxRetries: 3,
      })

      console.log('Transaction sent, waiting for confirmation...')

      // Wait for confirmation
      const confirmation = await this.connection.confirmTransaction(signature, 'confirmed')

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err}`)
      }

      console.log('NFT purchase successful!')
      console.log('Transaction signature:', signature)

      return {
        signature,
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
        success: true
      }

    } catch (error) {
      console.error('Error purchasing NFT:', error)
      throw error
    }
  }

  async getWalletBalance(): Promise<number> {
    if (!this.wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    const balance = await this.connection.getBalance(this.wallet.publicKey)
    return balance / LAMPORTS_PER_SOL
  }
}
