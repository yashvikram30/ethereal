import { 
  Connection, 
  PublicKey, 
  Transaction, 
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram
} from '@solana/web3.js'

export interface NFTMetadata {
  name: string
  symbol: string
  description: string
  imageUrl: string
  attributes: Array<{ trait_type: string; value: string }>
}

export interface MintResult {
  mint: string
  signature: string
  explorerUrl: string
}

export class BasicNFTMintService {
  private connection: Connection
  private wallet: any

  constructor(connection: Connection, wallet: any) {
    this.connection = connection
    this.wallet = wallet
  }

  async mintNFT(metadata: NFTMetadata): Promise<MintResult> {
    if (!this.wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    try {
      console.log('Starting basic NFT minting process...')
      
      // Create a new mint account
      const mint = Keypair.generate()
      console.log('Generated mint keypair:', mint.publicKey.toString())
      
      // Get minimum rent for mint account
      const mintRent = await this.connection.getMinimumBalanceForRentExemption(82)
      console.log('Mint rent:', mintRent)

      // Create the transaction
      const transaction = new Transaction()

      // Add create account instruction for mint
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: this.wallet.publicKey,
          newAccountPubkey: mint.publicKey,
          space: 82,
          lamports: mintRent,
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        })
      )

      // Set transaction details
      transaction.feePayer = this.wallet.publicKey
      const { blockhash } = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      
      console.log('Transaction prepared, signing...')
      
      // Sign the transaction with the mint keypair
      transaction.sign(mint)
      
      // Send the transaction
      console.log('Sending transaction...')
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

      console.log('NFT minted successfully!')
      console.log('Mint address:', mint.publicKey.toString())
      console.log('Transaction signature:', signature)

      return {
        mint: mint.publicKey.toString(),
        signature,
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`
      }

    } catch (error) {
      console.error('Error minting NFT:', error)
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
