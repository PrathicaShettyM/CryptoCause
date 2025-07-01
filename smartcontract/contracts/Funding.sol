// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Funding {
    // 👤 Campaign Structure
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    // 🎁 NFT Donation Certificates
    string public name = "DonationCertificate";
    string public symbol = "DCRT";

    uint256 public tokenIdCounter;
    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256[]) public ownedTokens;
    mapping(uint256 => string) public tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // 🔧 Campaign Creation
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    // 💸 Donation + NFT Minting
    function donateToCampaign(uint256 _id, string memory _tokenURI) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.deadline, "Campaign expired.");
        require(amount > 0, "Donation must be greater than 0.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Transfer failed.");

        campaign.amountCollected += amount;

        // 🧾 Mint donation NFT certificate
        _mintNFT(msg.sender, _tokenURI);
    }

    // 📤 Public Getters
    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory all = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            all[i] = campaigns[i];
        }
        return all;
    }

    function getMyCertificates(address _donor) public view returns (uint256[] memory) {
        return ownedTokens[_donor];
    }

    function getTokenURI(uint256 _tokenId) public view returns (string memory) {
        return tokenURIs[_tokenId];
    }

    // 🧱 Simple ERC-721 Logic
    function _mintNFT(address _to, string memory _uri) internal {
        uint256 newId = tokenIdCounter;
        ownerOf[newId] = _to;
        tokenURIs[newId] = _uri;
        ownedTokens[_to].push(newId);

        emit Transfer(address(0), _to, newId);
        tokenIdCounter++;
    }
}
