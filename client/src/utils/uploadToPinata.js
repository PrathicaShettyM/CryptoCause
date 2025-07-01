import axios from 'axios';

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};

export const uploadMetadataToPinata = async (metadata) => {
  const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};
