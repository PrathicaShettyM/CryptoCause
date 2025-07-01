import { useState, useEffect } from 'react';
import { useStateContext } from '../context';

const Profile = () => {
  const { getUserCampaigns, getMyCertificates, address, contract, getTokenURI } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const myCamps = await getUserCampaigns();
      setCampaigns(myCamps);

      const myCertIds = await contract.getMyCertificates(address);
      const uris = await Promise.all(myCertIds.map(id => getTokenURI(id)));
      setCerts(uris);
    };
    fetchData();
  }, [contract]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Campaigns</h2>
      <ul className="list-disc ml-6 mb-8">{campaigns.map(c => <li key={c.pId}>{c.title}</li>)}</ul>

      <h2 className="text-2xl font-bold mb-4">Donation Certificates</h2>
      <ul className="list-disc ml-6">{certs.map((uri, i) => <li key={i}><a href={uri} target="_blank" className="text-blue-600 underline">View Certificate #{i + 1}</a></li>)}</ul>
    </div>
  );
};

export default Profile;
