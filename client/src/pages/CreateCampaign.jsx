import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getFundingContract } from '../utils/getContract'; // Make sure this is async and correct
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // 1️⃣ Request user's wallet address from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];

      // 2️⃣ Load contract with signer
      const contract = await getFundingContract();

      // 3️⃣ Prepare parameters
      const targetInWei = ethers.utils.parseEther(form.target); // e.g. "1.5" ETH → BigInt
      const deadlineTimestamp = Math.floor(new Date(form.deadline).getTime() / 1000); // convert to seconds

      // 4️⃣ Call smart contract
      const tx = await contract.createCampaign(
        userAddress,
        form.title,
        form.description,
        targetInWei,
        deadlineTimestamp,
        form.image
      );

      await tx.wait();
      alert('✅ Campaign created successfully!');
      navigate('/');
    } catch (err) {
      console.error('❌ Error creating campaign:', err);
      alert('Something went wrong. Check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Campaign Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
          rows={4}
        />

        <input
          type="number"
          name="target"
          placeholder="Target Amount (ETH)"
          value={form.target}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL (IPFS/HTTP)"
          value={form.image}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90 ${
            isLoading ? 'opacity-50 cursor-wait' : ''
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Campaign'}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
