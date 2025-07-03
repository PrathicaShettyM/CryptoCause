import { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

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
    certNode.style.width = '1000px';
    certNode.style.height = '700px';
    certNode.style.background = 'white';
    certNode.style.fontFamily = 'Arial, sans-serif';
    certNode.style.position = 'relative';
    certNode.style.borderRadius = '12px';
    certNode.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    certNode.style.overflow = 'hidden';

    const qrData = `Campaign: ${campaign.title}\nTxHash: ${campaign.txHash}\nDonor: ${address}`;
    const qrImage = await QRCode.toDataURL(qrData, {
      width: 80,
      margin: 1,
      color: {
        dark: '#2c3e50',
        light: '#ffffff'
      }
    });

    certNode.innerHTML = `
      <div style="background: #2c3e50; color: white; padding: 30px 40px; position: relative;">
        <div style="font-size: 28px; font-weight: bold;">CryptoCause</div>
        <div style="font-size: 34px; font-weight: 600; margin-top: 10px;">Certificate of Donation</div>
        <div style="font-size: 14px; opacity: 0.85;">Digitally Signed Blockchain-Verified Contribution</div>

      </div>

      <div style="padding: 30px 40px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 16px; font-weight: 600; color: #2c3e50;">${campaign.title}</div>
          <div style="font-size: 32px; font-weight: 700; color: #27ae60; margin-top: 5px;">${campaign.donationAmount} GO</div>
          <div style="font-size: 13px; color: #7f8c8d;">Cryptocurrency Donation</div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="width: 48%; font-size: 13px;">
            <div style="font-weight: bold; color: #34495e; margin-bottom: 5px;">Donor</div>
            <div style="font-family: monospace; word-break: break-all;">${address}</div>
          </div>
          <div style="width: 48%; font-size: 13px;">
            <div style="font-weight: bold; color: #34495e; margin-bottom: 5px;">Recipient (NGO)</div>
            <div style="font-family: monospace; word-break: break-all;">${campaign.owner}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="font-size: 12px; line-height: 1.4; max-width: 70%;">
            <strong style="color: #2c3e50;">Blockchain Verified:</strong> This transaction is stored immutably on-chain. Verify using QR code or hash.
          </div>
          <div style="background: #fff; padding: 6px; border-radius: 6px;">
            <img src="${qrImage}" style="width: 70px; height: 70px;" />
          </div>
        </div>

        <div style="font-size: 12px; font-family: monospace; word-break: break-all; background: #ecf0f1; padding: 10px; border-radius: 6px; margin-bottom: 20px;">
          ${campaign.txHash}
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 13px; border-top: 1px solid #ccc; padding-top: 15px;">
          <div>
            <div style="font-weight: 500;">Digitally Signed By</div>
            <div style="margin-top: 4px; color: #2c3e50;">CryptoCause Platform</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 500;">Issued On</div>
            <div style="margin-top: 4px; color: #2c3e50;">
              ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(certNode);

    await new Promise(resolve => {
      if (document.fonts) {
        document.fonts.ready.then(() => setTimeout(resolve, 300));
      } else {
        setTimeout(resolve, 500);
      }
    });

    const canvas = await html2canvas(certNode, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 1000,
      height: 700
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1000, 700]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 1000, 700);
    pdf.save(`CryptoCause-Certificate-${campaign.pId}.pdf`);

    document.body.removeChild(certNode);
  };

  return (
    <>
      <Navbar />
      <div className="px-8 py-12 min-h-screen bg-white text-gray-800">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-10 text-center mt-14">
          Your Profile
        </h1>

        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Your Campaigns</h2>
            <p className="text-sm text-gray-600 mb-4">Total Raised: <span className="font-semibold text-green-700">{totalRaised} GO coins</span></p>
            {campaigns.length === 0 ? (
              <p className="text-gray-500">You haven't created any campaigns yet.</p>
            ) : (
              <ul className="space-y-2">
                {campaigns.map((c) => (
                  <li key={c.pId} className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition">
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
              <p className="text-gray-500">You haven't donated to any campaigns yet.</p>
            ) : (
              <ul className="space-y-2">
                {donatedCampaigns.map((c) => (
                  <li key={c.pId} className="border border-gray-100 rounded-lg p-4 shadow hover:shadow-md transition">
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
