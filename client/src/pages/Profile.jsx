import { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Profile = () => {
  const {
    getUserCampaigns,
    getCampaigns,
    getDonations,
    address,
    contract,
  } = useStateContext();

  const [campaigns, setCampaigns] = useState([]);
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const [totalRaised, setTotalRaised] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      if (!contract || !address) return;

      const myCamps = await getUserCampaigns();
      setCampaigns(myCamps);

      let total = 0;
      for (const camp of myCamps) {
        total += parseFloat(camp.amountCollected);
      }
      setTotalRaised(total.toFixed(2));

      const allCampaigns = await getCampaigns();
      const donated = [];

      for (const camp of allCampaigns) {
        const donations = await getDonations(camp.pId);
        const index = donations.findIndex((d) => d.donator.toLowerCase() === address.toLowerCase());
        if (index !== -1) {
          const txHash = sessionStorage.getItem(`${address}-tx-${camp.pId}`) || 'Not stored';
          donated.push({
            ...camp,
            donationAmount: donations[index].donation,
            txHash,
          });
        }
      }

      setDonatedCampaigns(donated);
    };

    fetchData();
  }, [contract, address]);

  const handleCertificateDownload = async (campaign) => {
    const certNode = document.createElement('div');
    certNode.style.width = '800px';
    certNode.style.padding = '30px';
    certNode.style.border = '2px solid #4f46e5';
    certNode.style.borderRadius = '16px';
    certNode.style.backgroundColor = 'white';
    certNode.style.fontFamily = 'Arial, sans-serif';

    certNode.innerHTML = `
      <h1 style="text-align:center; font-size: 28px; color: #4f46e5;">CryptoCause Certificate of Donation</h1>
      <p style="margin-top: 24px;"><strong>Campaign:</strong> ${campaign.title}</p>
      <p><strong>Donor Address:</strong> ${address}</p>
      <p><strong>NGO (Receiver) Address:</strong> ${campaign.owner}</p>
      <p><strong>Donation Amount:</strong> ${campaign.donationAmount} GO Coins</p>
      <p><strong>Transaction Hash:</strong> ${campaign.txHash}</p>
      <p style="margin-top:24px; font-size: 14px; color: #444;">
        This certificate confirms a donation was made on the CryptoCause blockchain platform.<br/>
        Any third-party (like a government or audit body) may verify this information manually using the addresses and transaction hash.
      </p>
      <p style="margin-top:10px; font-style:italic;">Issued by CryptoCause</p>
    `;

    document.body.appendChild(certNode);

    const canvas = await html2canvas(certNode);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `CryptoCause-Certificate-${campaign.pId}.png`;
    link.click();

    document.body.removeChild(certNode);
  };

  return (
    <>
      <Navbar />
      <div className="px-8 py-12 min-h-screen bg-white text-gray-800">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-10 text-center">
          Your Profile
        </h1>

        <div className="max-w-6xl mx-auto space-y-12">

          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Your Campaigns</h2>
            <p className="text-sm text-gray-600 mb-4">Total Raised: <span className="font-semibold text-green-700">{totalRaised} GO coins</span></p>
            {campaigns.length === 0 ? (
              <p className="text-gray-500">You haven’t created any campaigns yet.</p>
            ) : (
              <ul className="space-y-2">
                {campaigns.map((c) => (
                  <li
                    key={c.pId}
                    className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
                  >
                    <Link to={`/campaign-details/${c.pId}`} className="text-lg font-medium text-blue-600 hover:underline">
                      {c.title}
                    </Link>
                    <p className="text-sm text-gray-600">{c.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Campaigns You Donated To</h2>
            {donatedCampaigns.length === 0 ? (
              <p className="text-gray-500">You haven’t donated to any campaigns yet.</p>
            ) : (
              <ul className="space-y-2">
                {donatedCampaigns.map((c) => (
                  <li
                    key={c.pId}
                    className="border border-gray-100 rounded-lg p-4 shadow hover:shadow-md transition"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <Link to={`/campaign-details/${c.pId}`} className="text-lg font-semibold text-purple-700 hover:underline">
                          {c.title}
                        </Link>
                        <p className="text-sm text-gray-600 mb-1">{c.description}</p>
                        <p className="text-sm text-gray-500">
                          Owned by <span className="text-blue-600">{c.owner}</span>
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:text-right">
                        <p className="text-sm text-gray-800 mb-1">
                          You donated: <span className="font-semibold text-green-700">{c.donationAmount} GO coins</span>
                        </p>
                        <button
                          className="mt-2 px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
                          onClick={() => handleCertificateDownload(c)}
                        >
                          Download Certificate
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
