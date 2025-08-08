# NFT Minting on Solana Devnet - Complete Guide

## Overview

This application now supports **real NFT minting on Solana devnet** using the Metaplex Token Metadata program. You can create actual NFTs that will be visible on Solana explorers and can be traded on marketplaces.

## Prerequisites

### 1. Solana Wallet
You need a Solana wallet (like Phantom, Solflare, or Backpack) installed in your browser.

### 2. Devnet SOL
You need some devnet SOL to pay for transaction fees. Each NFT mint costs approximately 0.001-0.002 SOL in fees.

## Getting Started

### Step 1: Connect Your Wallet
1. Click the "Connect Wallet" button in the top right corner
2. Select your preferred wallet (Phantom, Solflare, etc.)
3. Approve the connection

### Step 2: Get Devnet SOL
1. Once connected, you'll see your wallet balance in the navbar
2. If your balance is low (< 0.01 SOL), click the "Get Devnet SOL" button in the NFT creation modal
3. This will open the Solana faucet with your wallet address pre-filled
4. Request 2 SOL (this is free on devnet)

### Step 3: Create Your NFT
1. Click the "CREATE YOUR NFT" button on the homepage
2. Fill in the required information:
   - **NFT Name**: The name of your NFT
   - **Symbol**: A short symbol (e.g., "MNFT")
   - **Description**: A description of your NFT
   - **Image URL**: A direct link to your NFT image (must be publicly accessible)
   - **Attributes**: Optional traits for your NFT

### Step 4: Mint Your NFT
1. Click "Create NFT" to start the minting process
2. Approve the transaction in your wallet
3. Wait for confirmation (usually 10-30 seconds)
4. Once successful, you'll see the mint address and transaction details

## What Happens During Minting

When you mint an NFT, the following happens on Solana devnet:

1. **Create Mint Account**: A new token mint is created
2. **Create Token Account**: An associated token account is created for your wallet
3. **Mint Token**: 1 NFT token is minted to your account
4. **Create Metadata**: Metadata is attached to your NFT using Metaplex
5. **Create Master Edition**: A master edition is created (required for NFTs)

## Transaction Details

After successful minting, you'll see:
- **Mint Address**: The unique identifier for your NFT
- **Transaction Signature**: The transaction that created your NFT
- **Explorer Link**: View your NFT on Solana Explorer

## Viewing Your NFT

### On Solana Explorer
1. Click "View on Explorer" to see your transaction
2. Navigate to the mint address to see your NFT details

### In Your Wallet
1. Open your Solana wallet
2. Switch to devnet network
3. Your NFT should appear in your wallet's NFT collection

## Troubleshooting

### Common Issues

**"Insufficient funds" error**
- Get more devnet SOL from the faucet
- Each mint costs ~0.001-0.002 SOL

**"Transaction failed" error**
- Check your internet connection
- Try again in a few minutes
- Make sure your wallet is connected to devnet

**"Wallet not connected" error**
- Reconnect your wallet
- Make sure you're on devnet network

### Getting Help

1. Check the browser console for detailed error messages
2. Verify your wallet is connected to Solana devnet
3. Ensure you have sufficient devnet SOL
4. Try refreshing the page and reconnecting your wallet

## Technical Details

### Networks
- **Devnet**: For testing (current implementation)
- **Mainnet**: For real NFTs (requires real SOL)

### Programs Used
- **Token Program**: For creating the mint and token accounts
- **Metaplex Token Metadata**: For NFT metadata and master editions
- **Associated Token Program**: For creating token accounts

### Transaction Structure
```
1. Create Account (mint)
2. Initialize Mint
3. Create Associated Token Account
4. Mint To (1 token)
5. Create Metadata Account
6. Create Master Edition Account
```

## Next Steps

Once you've successfully minted an NFT on devnet:

1. **Test Listing**: Try listing your NFT on the marketplace
2. **Test Trading**: Try buying/selling NFTs with other users
3. **Mainnet**: When ready, deploy to mainnet for real NFTs

## Security Notes

- **Devnet Only**: This implementation is for devnet testing only
- **No Real Value**: Devnet SOL and NFTs have no real value
- **Test Thoroughly**: Always test on devnet before mainnet
- **Secure Keys**: Never share your wallet's private keys

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your wallet is properly connected
3. Ensure you have sufficient devnet SOL
4. Try the transaction again

Happy minting! 🚀 