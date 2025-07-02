import React, { useState } from 'react';
import { useStateContext } from '../context/index';

const DonateButton = ({ pId, target, amountCollected }) => {
  const { donate } = useStateContext();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

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

      // 💸 Just call the smart contract donate logic
      const tx = await donate(pId, amount);
      console.log("✅ Donation TX Hash:", tx.hash);

      alert("🎉 Donation successful!");
      setAmount('');
    } catch (err) {
      console.error("❌ Donation failed:", err);
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
        {loading ? 'Processing...' : 'Donate'}
      </button>
    </div>
  );
};

export default DonateButton;
