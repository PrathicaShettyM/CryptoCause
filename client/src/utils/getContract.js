import { ethers } from 'ethers';
import FundingABI from '../../../smartcontract/artifacts/contracts/Funding.sol/Funding.json';

const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with actual address

export const getFundingContract = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not detected');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum); // v5
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, FundingABI.abi, signer);
};

export const getDonationsForCampaign = async (campaignId) => {
  const contract = await getFundingContract();
  const [donators, donations] = await contract.getDonators(campaignId);

  return donators.map((addr, i) => ({
    donor: addr,
    amount: ethers.formatEther(donations[i]) // convert Wei to ETH
  }));
};
