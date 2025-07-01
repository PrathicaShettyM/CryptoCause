export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0]; // return connected wallet address
  } catch (error) {
    console.error("Wallet connection error:", error);
    return null;
  }
};
