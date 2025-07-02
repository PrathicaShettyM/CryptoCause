import contractJson from '../../../smartcontract/artifacts/contracts/Funding.sol/Funding.json';

export const contractABI = contractJson.abi;
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const cloudinaryPresetName = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;

export const pinataJWT = import.meta.env.VITE_PINATA_JWT;
export const nftApiKey = import.meta.env.VITE_NFT_STORAGE_KEY;



