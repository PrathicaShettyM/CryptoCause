# 🚀 CryptoCause  
**A Blockchain-Based Architecture for Verifiable Philanthropic Engagement Using Cryptographic NFT Certificates**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Smart Contracts](https://img.shields.io/badge/Built%20With-Hardhat-yellow.svg)](https://hardhat.org/)  
[![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)](https://reactjs.org/)  
[![NFT Standard](https://img.shields.io/badge/ERC-721-green.svg)](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)

---

## 🧭 Project Overview

CryptoCause is a decentralized crowdfunding platform built on the Ethereum blockchain. It allows individuals to create and support charitable campaigns using cryptocurrency (ETH). What makes CryptoCause unique is its integration of **NFT-based donation certificates**, which act as cryptographic proof of donation. These NFTs are verifiable on-chain and can be used for real-world applications like CSR reporting, income tax deductions (e.g., under India’s 80G), or general acknowledgment of contributions to non-profit organizations.
The entire system ensures transparency, immutability, and trustless verification — all without relying on any central authority.

### **Youtube video link**
<iframe width="560" height="315" src="https://www.youtube.com/embed/EQ4p1rWDqfs?si=tolAPmW7k__DbZD_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


---

## 🌟 Features
### 🎯 1. Campaign Creation and Management
Users can launch their own fundraising campaigns directly on the platform. Each campaign includes the following attributes:
- **Title and Description**: To provide donors with context about the cause.
- **Funding Goal**: The amount of ETH the campaign aims to raise.
- **Deadline**: A UNIX timestamp indicating the end of the campaign.
- **Campaign Image**: Uploaded and stored via **Cloudinary**, then referenced in the campaign metadata.
  
All campaign data is stored on the Ethereum blockchain using a **mapping structure** inside the smart contract, ensuring transparency and immutability.

The smart contract logic strictly enforces the requirement that deadlines must be in the future. This prevents invalid or misleading campaign setups.

---

### 💰 2. Transparent ETH Donations

Once campaigns are live, users can donate ETH through their MetaMask wallet or any Web3-compatible wallet.

**How it works:**
- Donors connect their wallet to the dApp.
- They choose a campaign and enter the amount of ETH to donate.
- The smart contract transfers ETH directly to the **campaign owner's wallet**.
  
The platform keeps an **on-chain record of:**
- The total amount raised per campaign
- A list of all donors and their individual contributions
- Timestamps of donations

This data is public and queryable, ensuring complete visibility into the donation process.

---

### 📖 3. Public Campaign Explorer
All campaigns can be browsed and explored on the frontend. For each campaign, the following information is displayed:

- Campaign owner’s address
- Title, image, and detailed description
- Funding target vs. amount collected so far
- Deadline and current status (active or expired)
- List of all donors and the amount each contributed

This makes the donation process **transparent and verifiable** for both campaign creators and contributors.

---

## 🎟️ Innovations: NFT-Based Donation Certification System
### 🧾 4. Automatic NFT Certificate Minting
Every successful donation triggers an automated NFT minting process through smart contract logic. This NFT is:

- **Minted using ERC-721 standards**
- Linked directly to the **donor’s wallet address**
- Represents a **blockchain-verified certificate of donation**

Each NFT is a permanent record of a donor’s contribution and is **non-fungible**, meaning each is unique and cannot be altered or replaced.

---

### 🖼️ 5. Metadata-Driven On-Chain Proofs

Each NFT has a `tokenURI` that links to an IPFS or cloud-hosted JSON file. This metadata includes:

- Donor's wallet address
- Campaign title and description
- Amount donated in ETH
- The recipient NGO or cause name
- Ethereum transaction hash
- Issuer contract address

This metadata is **cryptographically verifiable** and can be inspected on-chain using a block explorer or via the platform’s frontend.

---

### 🛡️ 6. Verifiable Blockchain-Based Donation Receipts

These NFTs are not just decorative — they serve as **legal proof of donation** and can be used for:

- Corporate Social Responsibility (CSR) documentation
- Income tax deductions under sections like **80G in India**
- Acknowledgements from NGOs
- Auditable compliance reporting for ESG

Since the proof resides on the blockchain, **no centralized verification** is needed. Anyone can inspect the token, view the metadata, and confirm authenticity using blockchain tools.

---

### 📎 7. NFT Certificate Verifier Page

The platform features a built-in certificate verifier page where:
- Anyone (auditor, government agency, NGO) can enter a **token ID**
- The system fetches the NFT metadata using the tokenURI
- It displays:
  - Owner address
  - Campaign details
  - Ethereum transaction hash
  - Contract issuer address

The frontend validates the NFT and shows a message like:  
`✅ Verified by CryptoCause`  
if everything checks out.

---

### 🖨️ 8. HTML-to-PDF Certificate Export

For easier documentation and legal filing, users can export their donation NFT as a **printable PDF receipt**.

The PDF includes:

- Donor's name or wallet address
- Campaign or NGO name
- Donation amount in ETH
- Date and time (converted from timestamp)
- Ethereum transaction hash
- QR code linking to the NFT on a block explorer (optional)

This enables users to attach the document to government reports or CSR filings, bridging the gap between blockchain transparency and real-world utility.

---

## 🔬 Real-World Applications

### ✅ Why CryptoCause is Not Just a Demo

CryptoCause was built with real-world problems in mind. The lack of transparency and fraud in charitable giving, especially in large-scale donation systems, often erodes trust. CryptoCause addresses this by making every transaction traceable, verifiable, and permanent.

**Use Cases:**
1. **CSR Reporting**: Corporates can publicly prove their charitable spending via NFTs.
2. **Tax Deduction**: Individuals can submit NFTs or downloadable PDFs as valid receipts under applicable tax laws.
3. **NGO Compliance**: NGOs can validate and report donations received through verifiable blockchain records.
4. **Government Audits**: No need to rely on third-party records. All data is cryptographically secure and visible on the chain.

---

## ⚙️ How to Run the Project ?
### 1. 🛠 Frontend Setup (Using React):
Note: Make sure metamask is installed on the browser you are running your frontend before starting the subsequent steps.
1. **Terminal 1:**: Go to client directory
```
cd client
```

2. Install Node modules
```
npm install
```

3. Run the frontend
```
npm run dev
```

### 2. 🛠 Smart Contract Setup (Using Hardhat)
1. Go to the smart contract directory
```
cd smartcontract
```
```
Note: 
1. For both the terminals go to the smartcontract directory and execute the below steps 
2. Also execute these in these order itself or else you will be in trouble
```

2. **Terminal 2:** Run the hardhat nodes
```
npx hardhat node
```

3. **Terminal 3:** compile the smart contract
```
npx hardhat compile
```
- After compiling copy paste the deployed contract address in the frontend .env
- Deploy the smart contract locally
```
npx hardhat run scripts/deploy.js --network localhost
```

### 3. 🛠 Blockchain Visualizer 
1. Open one more tab on the browser where you are running your frontend, copy paste the below url
```
http://localhost:8000/index.html
```
- **Terminal 4:** is for the blockchain visualizer, go to the visualizer directory
```
cd Visualizer
```

- Run the following command
```
python -m http.server 8000
```

## Hardhat Accounts for testing
1. Copy paste the following private keys to import accounts

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

Account #6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000 ETH)
Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

Account #8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000 ETH)
Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

Account #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000 ETH)
Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Account #10: 0xBcd4042DE499D14e55001CcbB24a551F3b954096 (10000 ETH)
Private Key: 0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897

Account #11: 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 (10000 ETH)
Private Key: 0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82

Account #12: 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a (10000 ETH)
Private Key: 0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1

Account #13: 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec (10000 ETH)
Private Key: 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd

Account #14: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 (10000 ETH)
Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa

Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61

Account #16: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30 (10000 ETH)
Private Key: 0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0

Account #17: 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E (10000 ETH)
Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd

Account #18: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0 (10000 ETH)
Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0

Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
```