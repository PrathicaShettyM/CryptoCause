import { useState } from 'react';
import { useStateContext } from '../context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const Verify = () => {
  const { getCampaigns, getDonations } = useStateContext();

  const [enteredTxHash, setEnteredTxHash] = useState('');
  const [enteredDonor, setEnteredDonor] = useState('');
  const [certificateFound, setCertificateFound] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setCertificateFound(false);
    setMetadata(null);

    try {
      if (!enteredDonor || !enteredTxHash) {
        throw new Error("Please fill in both Donor Address and Transaction Hash.");
      }

      const allCampaigns = await getCampaigns();
      let found = false;

      for (const camp of allCampaigns) {
        const donations = await getDonations(camp.pId);
        const index = donations.findIndex(
          (d) => d.donator.toLowerCase() === enteredDonor.trim().toLowerCase()
        );

        if (index !== -1) {
          const storedTx = sessionStorage.getItem(`${enteredDonor}-tx-${camp.pId}`);

          if (
            storedTx &&
            storedTx.trim().toLowerCase() === enteredTxHash.trim().toLowerCase()
          ) {
            setMetadata({
              donorAddress: enteredDonor,
              recipientAddress: camp.owner,
              campaignTitle: camp.title,
              donationAmount: donations[index].donation,
              transactionHash: storedTx,
              pId: camp.pId,
            });
            setCertificateFound(true);
            toast.success("Valid donation certificate found.");
            found = true;
            break;
          }
        }
      }

      if (!found) {
        throw new Error("No valid certificate matched the given details.");
      }

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-10 text-center mt-14">
          Verify Donation Certificate
        </h1>

        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-200 space-y-6">
          <input
            type="text"
            placeholder="Enter Donor Address"
            className="w-full px-4 py-3 border rounded-lg text-base"
            value={enteredDonor}
            onChange={(e) => setEnteredDonor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Transaction Hash"
            className="w-full px-4 py-3 border rounded-lg text-base"
            value={enteredTxHash}
            onChange={(e) => setEnteredTxHash(e.target.value)}
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
          >
            {loading ? 'Verifying...' : 'Verify Certificate'}
          </button>

          {certificateFound && metadata && (
            <div className="mt-6 space-y-4 text-center bg-gray-50 p-6 rounded-lg border">
              <div className="text-left space-y-2">
                <p><strong>Token ID:</strong> {metadata.pId}</p>
                <p><strong>Donor:</strong> {metadata.donorAddress}</p>
                <p><strong>Recipient:</strong> {metadata.recipientAddress}</p>
                <p><strong>Campaign:</strong> {metadata.campaignTitle}</p>
                <p><strong>Amount:</strong> {metadata.donationAmount} GO</p>
                <p className="break-all"><strong>Transaction Hash:</strong> {metadata.transactionHash}</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Verify;
