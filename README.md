# TSender UI - Multi-Chain Token Airdrop Platform

A decentralized application (dApp) for performing batch ERC20 token transfers (airdrops) across multiple blockchain networks. Built with modern web3 technologies, TSender UI provides a user-friendly interface for distributing tokens to multiple recipients in a single transaction. Website: https://ts-tsender-ui-two.vercel.app/

## 🎯 Business Case

### Problem Statement

Traditional token distributions require multiple individual transactions, which:

- Are time-consuming and inefficient
- Incur high cumulative gas fees
- Are prone to human error when managing multiple recipients
- Lack transparency and auditability

### Solution

TSender UI leverages smart contracts to enable:

- **Batch Processing**: Send tokens to hundreds of recipients in a single transaction
- **Cost Efficiency**: Significantly reduce gas fees compared to individual transfers
- **Multi-Chain Support**: Deploy across multiple EVM-compatible networks
- **User Experience**: Simple, intuitive interface with wallet integration
- **Transparency**: All transactions are verifiable on-chain

### Use Cases

- Token airdrops for community rewards
- Salary/payment distribution in crypto
- NFT holder rewards distribution
- Bounty and incentive programs
- Multi-recipient fundraising distributions

## 🚀 Features

- ✅ **Multi-Chain Support**: Ethereum, Arbitrum, Optimism, Base, zkSync Era, and Sepolia testnet
- ✅ **Wallet Integration**: RainbowKit with support for multiple wallet providers
- ✅ **Real-Time Balance Checking**: Automatic token balance and allowance validation
- ✅ **Smart Approval Management**: Automatic token approval when needed
- ✅ **Persistent State**: Local storage for form data (token address, recipients, amounts)
- ✅ **Loading States**: User-friendly feedback during transaction processing
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Type-Safe**: Full TypeScript implementation
- ✅ **Comprehensive Testing**: Unit tests with Vitest and E2E tests with Playwright/Synpress

## 🛠 Tech Stack

### Frontend Framework

- **Next.js 15.1** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5.4** - Type safety and developer experience

### Web3 Integration

- **Wagmi 2.14** - React Hooks for Ethereum
- **Viem 2.22** - TypeScript interface for Ethereum
- **RainbowKit 2.2** - Wallet connection UI
- **TanStack Query 5.45** - Async state management

### Styling

- **Tailwind CSS 4.0** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Testing

- **Vitest** - Unit testing framework
- **Playwright 1.48** - End-to-end testing
- **Synpress 4.1** - Web3-specific E2E testing with MetaMask

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **Prettier** - Code formatting
- **ESLint** - Code linting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- A **Web3 wallet** (MetaMask, Rainbow, Coinbase Wallet, etc.)
- **Git** for version control

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anton-kovachev/ts-tsender-ui.git
cd ts-tsender-ui
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables (Optional)

Create a `.env.local` file in the root directory if you need custom configurations:

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Local Blockchain (For Development)

If testing locally with Anvil:

```bash
pnpm anvil
```

This loads a pre-configured state with deployed TSender contracts.

## 🎮 Usage

### Basic Airdrop Flow

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the header
   - Select your preferred wallet provider
   - Approve the connection

2. **Select Network**
   - Switch to your desired network (Ethereum, Arbitrum, etc.)
   - Ensure you have sufficient ETH for gas fees

3. **Enter Token Details**
   - Paste the ERC20 token contract address
   - The app will automatically fetch token symbol, decimals, and your balance

4. **Add Recipients**
   - Enter recipient addresses (comma or newline separated)
   - Format: `0x1234..., 0x5678..., 0x9abc...`

5. **Specify Amounts**
   - Enter amounts corresponding to each recipient
   - Format: `100, 200, 150`
   - Must match the number of recipients

6. **Review & Send**
   - Check the total tokens needed vs your balance
   - Click "Send Tokens"
   - Approve token spending (if needed)
   - Confirm the airdrop transaction

### Supported Networks

| Network          | Chain ID | TSender Contract                             |
| ---------------- | -------- | -------------------------------------------- |
| Ethereum Mainnet | 1        | `0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821` |
| Arbitrum One     | 42161    | `0xA2b5aEDF7EEF6469AB9cBD99DE24a6881702Eb19` |
| Optimism         | 10       | `0xAaf523DF9455cC7B6ca5637D01624BC00a5e9fAa` |
| Base             | 8453     | `0x31801c3e09708549c1b2c9E1CFbF001399a1B9fa` |
| zkSync Era       | 324      | `0x7e645Ea4386deb2E9e510D805461aA12db83fb5E` |
| Sepolia Testnet  | 11155111 | `0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a` |
| Local (Anvil)    | 31337    | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
pnpm test:unit

# Run with coverage
pnpm coverage
```

### End-to-End Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm exec playwright test --ui

# Run Synpress tests (with MetaMask)
pnpm synpress
```

## 📁 Project Structure

```
ts-tsender-ui/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── providers.tsx      # Web3 providers wrapper
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── AirdropForm.tsx    # Main airdrop interface
│   │   ├── Header.tsx         # Navigation with wallet connect
│   │   └── UI/
│   │       └── InputField.tsx # Reusable input component
│   ├── utils/
│   │   └── calculateTotal/    # Total amount calculation logic
│   │       ├── calculateTotal.ts
│   │       ├── calculateTotal.test.ts
│   │       └── index.ts
│   ├── contants.ts            # Contract addresses & ABIs
│   └── rainbowKitConfig.tsx   # Wallet connection config
├── test/
│   └── playwright/            # E2E tests
├── public/                    # Static assets
├── package.json
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
├── playwright.config.ts      # Playwright configuration
└── vitest.config.mts         # Vitest configuration
```

## 🔐 Security Considerations

- **Always verify** contract addresses before sending tokens
- **Test on testnets** (Sepolia) before mainnet deployments
- **Review recipient lists** carefully to avoid irreversible mistakes
- **Check token balances** to ensure sufficient funds
- **Monitor gas prices** for optimal transaction timing
- **Use hardware wallets** for large-value transfers

## 🛣 Roadmap

- [ ] CSV file upload for bulk recipient import
- [ ] Token search/selection interface
- [ ] Transaction history tracking
- [ ] Gas estimation preview
- [ ] Multi-token airdrops in single transaction
- [ ] Scheduled/delayed airdrops
- [ ] Whitelist/blacklist management
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (Prettier config)
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Wallet integration by [RainbowKit](https://www.rainbowkit.com/)
- Web3 utilities by [Wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on [GitHub](https://github.com/anton-kovachev/ts-tsender-ui/issues)
- Check existing issues before creating new ones

## ⚠️ Disclaimer

This software is provided "as is" without warranty of any kind. Use at your own risk. Always verify transactions before confirmation. The developers are not responsible for any loss of funds due to user error or contract vulnerabilities.

---

**Made with ❤️ for the Web3 community**
