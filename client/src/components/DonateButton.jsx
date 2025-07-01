import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { uploadToPinata, uploadMetadataToPinata } from '../utils/uploadToPinata';
import CertificateTemplate from '../components/CertificateTemplate';
import { useStateContext } from '../context';

const DonateButton = ({ pId, target, amountCollected, campaign }) => {
  const { donate, address } = useStateContext();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const certRef = useRef(null);

  const handleDonate = async () => {
    try {
      if (!amount || parseFloat(amount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      const remaining = parseFloat(target) - parseFloat(amountCollected);
      if (parseFloat(amount) > remaining) {
        alert("Donation exceeds campaign target.");
        return;
      }

      setLoading(true);

      // Step 1: Generate certificate image (off-screen)
      const dataUrl = await toPng(certRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const certFile = new File([blob], `donation-cert-${Date.now()}.png`, { type: 'image/png' });

      // Step 2: Upload image to IPFS
      const imageUrl = await uploadToPinata(certFile);

      // Step 3: Create and upload metadata
      const metadata = {
        name: `Donation Certificate`,
        description: `Proof of donation to "${campaign.title}" by ${address}`,
        image: imageUrl,
      };
      const tokenURI = await uploadMetadataToPinata(metadata);

      // Step 4: Donate to smart contract with tokenURI
      const tx = await donate(pId, amount, tokenURI);
      console.log("✅ Donation TX:", tx.hash);

      alert("🎉 Donation successful and certificate NFT minted!");
      setAmount('');
    } catch (error) {
      console.error("❌ Donation or upload failed:", error);
      alert("Something went wrong during donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-5">
      <input
        type="number"
        placeholder="Enter donation amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-700 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
      >
        {loading ? 'Processing...' : 'Donate & Mint Certificate'}
      </button>

      {/* Hidden cert for HTML-to-Image generation */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div ref={certRef}>
          <CertificateTemplate
            donor={address}
            amount={amount}
            campaignTitle={campaign.title}
            txHash={"TX_hash_exists"} // Optional: replace with actual tx hash if needed
          />
        </div>
      </div>
    </div>
  );
};

export default DonateButton;
