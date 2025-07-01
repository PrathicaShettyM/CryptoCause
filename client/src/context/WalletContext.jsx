import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet } from '../utils/connectWallet';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  const connect = async () => {
    const addr = await connectWallet();
    if (addr) setAddress(addr);
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) setAddress(accounts[0]);
      }
    };
    autoConnect();
  }, []);

  return (
    <WalletContext.Provider value={{ address, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
