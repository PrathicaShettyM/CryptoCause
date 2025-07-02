import { useState } from 'react';
import { useStateContext } from '../context';

const Verify = () => {
  const { contract, getTokenURI } = useStateContext();

  const [tokenId, setTokenId] = useState('');
  const [certificateURI, setCertificateURI] = useState('');
  const [owner, setOwner] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    setCertificateURI('');
    setOwner('');

    try {
      if (!contract || tokenId === '') throw new Error("Missing contract or token ID");

      const uri = await getTokenURI(tokenId);
      const ownerAddress = await contract.ownerOf(tokenId);

      setCertificateURI(uri);
      setOwner(ownerAddress);
    } catch (err) {
      console.error(err);
      setError("Invalid Token ID or NFT not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-12 min-h-screen bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-10 text-center">
        Verify Donation Certificate
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-200 space-y-6">
        <input
          type="number"
          placeholder="Enter NFT Token ID"
          className="w-full px-4 py-3 border rounded-lg text-base"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
        >
          {loading ? 'Verifying...' : 'Verify Certificate'}
        </button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {certificateURI && (
          <div className="mt-6 space-y-4 text-center">
            <img
              src={certificateURI}
              alt="NFT Certificate"
              className="w-full h-72 object-contain mx-auto rounded-md shadow"
            />
            <p className="text-sm text-gray-700">
              <strong>Owner:</strong> {owner}
            </p>
            <a
              href={certificateURI}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Download Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
