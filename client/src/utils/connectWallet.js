export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0]; // Return connected wallet address
    } catch (error) {
      console.error("User rejected the wallet connection:", error);
      return null;
    }
  } else {
    alert("🦊 Please install MetaMask to use this feature.");
    return null;
  }
};
