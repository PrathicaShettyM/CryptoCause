import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletProvider } from './context/WalletContext';
import { StateContextProvider } from './context';
import { ThirdwebProvider } from '@thirdweb-dev/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThirdwebProvider
    activeChain={{
      chainId: 31337,
      rpc: ['http://127.0.0.1:8545'], // ✅ Hardhat RPC URL
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      shortName: 'local',
      slug: 'local',
      testnet: true,
      chain: 'Localhost',
      name: 'Localhost 1337',
    }}
    clientId="1917b7628ab4dd7d66916a6e8a39756a" // ✅ Your Thirdweb API key
  >
      <StateContextProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </StateContextProvider>
    </ThirdwebProvider>
  </StrictMode>,
)
