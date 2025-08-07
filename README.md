# Solana NFT Marketplace

A decentralized NFT marketplace built on Solana using Anchor framework with a modern React frontend.

## Features

- **List NFTs**: Sellers can list their NFTs for sale with custom pricing
- **Purchase NFTs**: Buyers can purchase listed NFTs with automatic fee distribution
- **Delist NFTs**: Sellers can remove their listings and get their NFTs back
- **Wallet Integration**: Seamless integration with Phantom, Solflare, and other Solana wallets
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Real-time Updates**: Live updates of marketplace activity

## Smart Contract Features

- **Marketplace Initialization**: Set up marketplace with fee structure and treasury
- **NFT Listing**: Secure listing with metadata validation and collection verification
- **Secure Purchases**: Automated payment processing with fee distribution
- **Safe Delisting**: Secure NFT return to original owner

## Tech Stack

### Backend
- **Solana**: High-performance blockchain
- **Anchor**: Framework for Solana program development
- **Rust**: Smart contract language

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Solana Web3.js**: Solana blockchain interaction
- **Wallet Adapter**: Multi-wallet support

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Solana CLI tools
- Anchor CLI
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketplace
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Build the smart contract**
   ```bash
   anchor build
   ```

4. **Deploy to localnet**
   ```bash
   anchor deploy
   ```

5. **Start the frontend development server**
   ```bash
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

1. **Configure Solana CLI**
   ```bash
   solana config set --url localhost
   ```

2. **Create a wallet**
   ```bash
   solana-keygen new
   ```

3. **Airdrop SOL for testing**
   ```bash
   solana airdrop 2
   ```

## Usage

### For Sellers

1. **Connect your wallet** using the wallet button in the top right
2. **Click "List NFT"** to create a new listing
3. **Enter the NFT mint address** and set your desired price
4. **Confirm the transaction** in your wallet
5. **Manage your listings** from the "My Listings" page

### For Buyers

1. **Browse available NFTs** on the main marketplace page
2. **Click "Purchase NFT"** on any listing you want to buy
3. **Confirm the transaction** in your wallet
4. **Receive your NFT** automatically

## Smart Contract Architecture

### Key Accounts

- **MarketplaceAccount**: Global marketplace configuration
- **ListingAccount**: Individual NFT listing data
- **Treasury**: Fee collection account

### Instructions

- `initialize_marketplace`: Set up marketplace with fees
- `list_nft`: Create new NFT listing
- `purchase_nft`: Buy listed NFT
- `delist_nft`: Remove NFT from marketplace

## Development

### Running Tests
```bash
anchor test
```

### Building for Production
```bash
yarn build:frontend
```

### Linting
```bash
yarn lint
```

## Project Structure

```
marketplace/
├── app/                    # Next.js frontend
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── page.tsx          # Main marketplace page
├── programs/              # Solana smart contracts
│   └── marketplace/
│       ├── src/
│       │   ├── instructions/  # Program instructions
│       │   ├── state/         # Account structures
│       │   └── lib.rs         # Main program
├── tests/                 # Integration tests
└── migrations/            # Deployment scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue on GitHub.

## Security

This project is for educational purposes. Please conduct thorough security audits before using in production. 