import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

export async function requestAirdrop(connection: Connection, walletAddress: PublicKey): Promise<string> {
  try {
    const signature = await connection.requestAirdrop(walletAddress, 2 * LAMPORTS_PER_SOL) // 2 SOL
    await connection.confirmTransaction(signature, 'confirmed')
    console.log('Airdrop successful! Signature:', signature)
    return signature
  } catch (error) {
    console.error('Airdrop failed:', error)
    throw error
  }
}

export function getSolanaFaucetUrl(walletAddress: string): string {
  return `https://faucet.solana.com/?address=${walletAddress}&cluster=devnet`
}

export function getExplorerUrl(signature: string, cluster: 'devnet' | 'mainnet' = 'devnet'): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=${cluster}`
}

export function getMintExplorerUrl(mintAddress: string, cluster: 'devnet' | 'mainnet' = 'devnet'): string {
  return `https://explorer.solana.com/address/${mintAddress}?cluster=${cluster}`
} 