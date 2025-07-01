import React, { useContext, createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../constants/index';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');

  const connect = async () => {
    if (window.ethereum) {
      try {
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        await providerInstance.send("eth_requestAccounts", []);
        const signerInstance = await providerInstance.getSigner();
        const userAddress = await signerInstance.getAddress();

        const contractInstance = new ethers.Contract(contractAddress, contractABI, signerInstance);

        setProvider(providerInstance);
        setSigner(signerInstance);
        setContract(contractInstance);
        setAddress(userAddress);

        console.log("✅ Wallet connected:", userAddress);
      } catch (err) {
        console.error("❌ Wallet connection failed:", err);
      }
    } else {
      alert("🦊 Please install MetaMask to continue.");
    }
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum) {
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
          const signerInstance = await providerInstance.getSigner();
          const contractInstance = new ethers.Contract(contractAddress, contractABI, signerInstance);

          setProvider(providerInstance);
          setSigner(signerInstance);
          setContract(contractInstance);
          setAddress(accounts[0]);
        }
      }
    };

    autoConnect();
  }, []);

  const publishCampaign = async (form) => {
    try {
      if (!contract) throw new Error("Smart contract not connected.");
      if (!address) throw new Error("Wallet not connected.");

      const parsedTarget = ethers.parseUnits(form.target.toString(), 18);
      const parsedDeadline = Math.floor(new Date(form.deadline).getTime() / 1000);

      console.log("🚀 Calling createCampaign with:", {
        address,
        title: form.title,
        description: form.description,
        target: parsedTarget,
        deadline: parsedDeadline,
        image: form.image,
      });

      const tx = await contract.createCampaign(
        address,
        form.title,
        form.description,
        parsedTarget,
        parsedDeadline,
        form.image
      );

      console.log("⏳ Transaction sent:", tx.hash);
      await tx.wait();
      console.log("✅ Campaign created in TX:", tx.hash);
    } catch (error) {
      console.error("❌ Failed to create campaign:", {
        message: error.message,
        reason: error.reason,
        code: error.code,
        data: error.data,
        stack: error.stack
      });

      if (error.code === "INSUFFICIENT_FUNDS") {
        alert("💸 You don't have enough ETH for gas or donation target!");
      } else {
        alert("❌ Transaction failed: " + (error.reason || error.message));
      }

      throw error;
    }
  };

  const getCampaigns = async () => {
    try {
      if (!contract) throw new Error("Contract not connected");

      console.log("📞 Calling getCampaigns...");
      
      // Direct contract call - much simpler and more reliable
      const campaigns = await contract.getCampaigns();
      
      console.log("📋 Raw campaigns data:", campaigns);

      // Transform the data
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.formatEther(campaign.target.toString()),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i,
      }));

      console.log("✅ Parsed campaigns:", parsedCampaigns);
      return parsedCampaigns;
    } catch (error) {
      console.error("❌ Error fetching campaigns:", error);
      return [];
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    return allCampaigns.filter((campaign) => campaign.owner.toLowerCase() === address.toLowerCase());
  };

  const donate = async (pId, amount, tokenURI) => {
    try {
      const tx = await contract.donateToCampaign(pId, tokenURI, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("❌ Donation failed:", error);
      throw error;
    }
  };

  const getDonations = async (pId) => {
    try {
      const donations = await contract.getDonators(pId);
      const numberOfDonations = donations[0].length;

      const parsed = [];
      for (let i = 0; i < numberOfDonations; i++) {
        parsed.push({
          donator: donations[0][i],
          donation: ethers.formatEther(donations[1][i].toString())
        });
      }

      return parsed;
    } catch (err) {
      console.error("❌ Error getting donations:", err);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        contract
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);