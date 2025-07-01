import React, { useState, useEffect } from 'react';
import DisplayCampaigns  from '../pages/DisplayCampaigns';
import { useStateContext } from '../context/index';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <>
      <Navbar />
      <DisplayCampaigns
        title="Campaigns List"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      <Footer />
    </>
  );
};

export default Campaigns;
