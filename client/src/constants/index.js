import contractJson from '../../Funding.json';

export const contractABI = contractJson.abi;
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
export const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const cloudinaryPresetName = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;

