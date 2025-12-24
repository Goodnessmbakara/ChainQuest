# ⚔️ ChainQuest

**The Gamified Learn-to-Earn Platform for Stacks & Bitcoin L2**

ChainQuest is an interactive educational platform where developers learn to build on Stacks by completing coding quests. Earn **STX rewards** and verifiable **NFT Achievement Badges** while mastering Clarity smart contracts and Bitcoin Layer 2 development.

Built for the **Stacks + WalletConnect Builder Challenge** (Week #3).

![ChainQuest Banner](https://placehold.co/1200x400/7c3aed/ffffff?text=ChainQuest+banner+placeholder)

## 🚀 Features

-   **Interactive Quests**: Step-by-step coding challenges teaching Stacks & Clarity.
-   **Proof-of-Learn Protocol**: Verifiable on-chain quest completion.
-   **Earn Real Rewards**: Receive STX micro-rewards for completing milestones.
-   **NFT Badges**: Mint SIP-009 compliant "Achievement Badges" that serve as your Web3 resume.
-   **Leaderboard**: Compete with other builders for the top spot.
-   **Seamless Onboarding**: Integrated with **Reown AppKit** for smooth WalletConnect support.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion
-   **Smart Contracts**: Clarity (Clarity 3.0)
-   **Blockchain**: Stacks Testnet
-   **Wallet Integration**: Reown AppKit + WalletConnect
-   **Testing**: Clarinet, Vitest

## 📦 Smart Contracts

ChainQuest utilizes a multi-contract architecture to manage state, assets, and rewards:

| Contract | Purpose |
| :--- | :--- |
| `quest-manager.clar` | Core logic for defining quests and tracking user progress. |
| `achievement-badges.clar` | SIP-009 NFT contract for minting unique achievement badges. |
| `reward-distributor.clar` | Manages the STX reward pool and distributes funds to learners. |
| `leaderboard.clar` | Tracks user scores and rankings based on completed quests. |

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18+)
-   [Clarinet](https://github.com/hirosystems/clarinet) (for smart contract development)
-   A Stacks Wallet (Leather, Xverse, or Asigna)

### 1. Clone the Repository

```bash
git clone https://github.com/Goodnessmbakara/ChainQuest.git
cd ChainQuest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
VITE_REOWN_PROJECT_ID=your_reown_project_id
VITE_STACKS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=your_deployer_address
```

### 4. Run Locally

start the development server:

```bash
npm run dev
```

### 5. Smart Contract Development

check contracts:

```bash
clarinet check
```

run tests:

```bash
clarinet test
```

## 🧪 Testing

We use Vitest with Clarinet SDK for robust smart contract testing.

```bash
npm test
```

## 📜 License

MIT License. Open source and built for the Stacks Community.
