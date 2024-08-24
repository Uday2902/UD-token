# Uday-Token (UD)

Uday-Token (UD) is an ERC-20 compatible token deployed on the public test network Sepolia. This project includes a smart contract written in Solidity and a front-end integration using JavaScript and the ethers.js library. The primary functionalities of this project include token transfers, approvals, and an airdrop mechanism. Users can connect their MetaMask wallet to interact with the token.

## Features

- **Token Name:** Uday-Token
- **Token Symbol:** UD
- **Decimals:** 18
- **Total Supply:** 1,000,000 UD
- **Airdrop:** 500 UD tokens per user, claimable once.

## Smart Contract

The smart contract is implemented in Solidity and provides the following functionalities:

- **Transfer:** Transfer tokens from one address to another.
- **Approve:** Allow another address to spend tokens on your behalf.
- **TransferFrom:** Execute a transfer on behalf of an approved address.
- **Airdrop:** Users can claim a one-time airdrop of 500 UD tokens.

### Key Functions

- `transfer(address _to, uint256 _value)`: Transfers `_value` tokens to the `_to` address.
- `approve(address _spender, uint256 _value)`: Approves `_spender` to transfer `_value` tokens on behalf of the message sender.
- `transferFrom(address _from, address _to, uint256 _value)`: Transfers `_value` tokens from `_from` to `_to` on behalf of an approved address.
- `airdrop()`: Allows users to claim their airdrop of 500 UD tokens.

## Front-End Integration

The front-end code is written in JavaScript using the ethers.js library for blockchain interaction. It includes:

- **Wallet Connection:** Users can connect their MetaMask wallet to the application.
- **Claim Airdrop:** Users can claim the 500 UD token airdrop.
- **Check Balance:** Users can check their UD token balance.
- **Transaction History:** Users can view all transactions involving their address (sent and received).

### Key Functions

- `handleConnectWallet()`: Connects the user's MetaMask wallet to the dApp.
- `getUday()`: Claims the airdrop for the connected wallet.
- `getBalance()`: Retrieves the UD token balance of the connected wallet.
- `getAllContractEvents()`: Fetches all events related to the UD token contract.
- `getUserTransactions(signerAddress)`: Fetches transactions related to the connected user's address.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MetaMask browser extension installed.
- Sepolia Test network selected in MetaMask.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Uday2902/UD-token.git
   cd UD-token

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Run the application:**
   ```bash
   npm run dev
