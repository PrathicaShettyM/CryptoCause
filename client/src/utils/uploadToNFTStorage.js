import * as Web3Storage from '@web3-storage/w3up-client';

let client;

/**
 * Initializes the Web3Storage client once (singleton) and sets current space.
 */
async function getClient() {
  if (!client) {
    client = await Web3Storage.create();

    // ✅ 1. Create a new space
    const space = await client.createSpace();

    // ✅ 2. Set it as current
    await client.setCurrentSpace(space);

    console.log('🧠 Web3.Storage space ID:', space.did());
  }

  return client;
}

/**
 * Uploads a certificate image blob to Web3.Storage.
 * @param {Blob} blob - PNG or image blob.
 * @returns {Promise<string>} - IPFS gateway URL to the uploaded image.
 */
export const uploadCertificateImage = async (blob) => {
  try {
    const client = await getClient();
    const file = new File([blob], `certificate-${Date.now()}.png`, {
      type: 'image/png',
    });

    const cid = await client.uploadFile(file);
    const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
    return ipfsUrl;
  } catch (error) {
    console.error('❌ Error uploading to Web3.Storage:', error);
    throw error;
  }
};
