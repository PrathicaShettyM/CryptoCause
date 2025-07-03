# 🚀 **CryptoCause**
A Blockchain-Based Architecture for Verifiable Philanthropic Engagement Using Cryptographic NFT Certificates

## Feature List
### Part 1: 🎯 Core Crowdfunding Features
🧩 **1. Campaign Creation & Management**
Users can create crowdfunding campaigns with the following fields:

- Campaign title
- Description
- Funding target (in ETH)
- Deadline (timestamp)
- Campaign image (stored via URL/IPFS)
- Campaigns are stored on-chain in a mapping structure.
- The contract enforces deadlines to be in the future.

💰 **2. Transparent ETH Donations**
Anyone can connect their wallet (e.g., MetaMask) and donate ETH to active campaigns.
ETH donations are immediately transferred to the campaign creator’s wallet.

Tracks:
- Total raised amount
- Donors and their individual contributions
- Public donation history per campaign

📖 **3. Public Campaign Explorer**
All campaigns can be retrieved and displayed on the frontend.
Each campaign includes all its on-chain details:

- Owner
- Title, image, description
- Goal vs amount collected
- Deadline status
- Donor list

### Part 2: 🎟️ NFT-Based Donation Certification System
🧾 **4. Automatic NFT Certificate Minting**
- Every successful donation triggers an NFT minting process.
- The NFT acts as a blockchain-verified certificate of donation, tied to the donor’s address.
- Minted using manually written **ERC-721** logic within the Funding.sol contract.

🖼️ **5. Metadata-Driven, On-Chain NFT Proofs**
Each NFT has a tokenURI that links to JSON metadata (hosted via IPFS or public storage).

Includes details such as:
- Donor address
- Campaign title or ID
- Donation amount
- NGO or cause
- Timestamp of donation
- Ethereum transaction hash
- The NFT can be programmatically verified for authenticity.

✅ Real-World Utility & Verification
🛡️ **6. Verifiable Blockchain-Based Donation Receipts**
NFTs can be used as legal proof of donation for:

- CSR contributions by companies
- 80G income tax deduction (India)
- NGO donation acknowledgements

Publicly verifiable on blockchain:
✅ Who donated
✅ How much
✅ To which campaign/NGO
✅ Transaction hash and NFT issuer (contract address)

📎 **7. NFT Verifier Page**
The platform includes a "Verify Donation Certificate" section where:
- Government agencies, NGOs, or auditors can paste a token ID
System fetches NFT metadata, owner, and transaction hash
- Displays a "✅ Verified by CryptoCause" result if everything checks out



🖼️ **8. HTML-to-PDF Certificate Export**
NFT certificate metadata is used to render a downloadable PDF version of the certificate via frontend

Includes:

Donor name
NGO name
Amount
Timestamp
Blockchain transaction hash

Enables donors to attach PDF receipts to reports or CSR filings

📤 **9. IPFS Integration for Image Hosting**
- Campaign images and NFT certificate images are stored using IPFS via Pinata/Web3.Storage
- Ensures decentralized, tamper-proof storage of donation metadata

## 🌍 Real-World Use Case:
🧾 Why CryptoCause Matters in the Real World
CryptoCause is not just a blockchain demo. It is a verifiable, decentralized platform that enables individuals and organizations to:

1. Donate ETH to legitimate social causes
2. Receive on-chain proof of donation as NFTs
3. Use these certificates for CSR, legal reporting, or tax deduction.
4. Allow governments, auditors, or NGOs to verify the donation with zero third-party involvement

✅ This project demonstrates how blockchain and NFTs can power transparent philanthropy and create trustless proof of donations — useful in real-world systems like CSR, 80G tax deduction, or ESG compliance.

## Execution commands
### **smartcontracts:** 
1. Terminal 1: Run the hardhat local nodes
```bash
npx hardhat node
```
2. Terminal 2: Compile and deploy the script
- Compile the solidity file
```bash
npx hardhat compile
```
- deploy it to the local network
```bash
npx hardhat run scripts/deploy.js --network localhost
```

everytime copy paste the private key (delete the previous accounts) to import ethers


Toasts instead of alerts
Mint certificate UI
IPFS upload for real metadata
Filtering by owner or date

Current Functionality (What it Does)
Connects to MetaMask to access blockchain.

Fetches campaign data from your deployed smart contract (getCampaigns()).

Generates a real-time force-directed graph:

Campaign nodes (blue)

Donor nodes (green)

Edges/links between donor and campaign based on on-chain data

Generates SHA-256 hashes from (address + donationAmountInWei) to allow donation verification.

Highlights matching donation edges when correct data is entered — simulates hash matching.

Tooltips on hover display hashes for verification.

Auto-refreshes graph every 15 seconds to reflect live blockchain updates.


python -m http.server 8000