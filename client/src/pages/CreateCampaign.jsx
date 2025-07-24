// ✅ FINAL CreateCampaign.jsx with Cloudinary Upload + Debug Logs + Improved UI (Updated)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import { useStateContext } from '../context';
import { FaMoneyCheckAlt } from "react-icons/fa";
import CustomButton from '../components/CustomButton.jsx';
import Loader from "../components/Loader.jsx";
import FormField from "../components/FormField.jsx";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign, address, connect } = useStateContext();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');

    if (!address) {
      toast.error('Please connect your wallet before submitting.');
      if (connect) await connect();
      return;
    }

    const { name, title, description, target, deadline, image } = form;
    if (!name || !title || !description || !target || !deadline || !image) {
      toast.error('Please fill all required fields.');
      return;
    }


    try {
      setIsLoading(true);
      const formattedTarget = ethers.parseUnits(target.replace(/[^\d.]/g, ''), 18);
      const deadlineInSeconds = Math.floor(new Date(deadline).getTime() / 1000);

      console.log('📤 Submitting campaign with:', {
        ...form,
        target: formattedTarget,
        deadline: deadlineInSeconds
      });

      await createCampaign({ ...form, target: formattedTarget });

      setIsLoading(false);
      toast.success('Campaign created successfully!');
      console.log('✅ Campaign creation successful.');
      setForm({ name: '', title: '', description: '', target: '', deadline: '', image: '' });
      navigate('/');
    } catch (error) {
      console.error('❌ Error creating campaign:', error);
      toast.error('Something went wrong. Check the console for details.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar address={address} connect={connect} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && <Loader />}

        <div className="text-center mb-12 mt-14">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-8">
            Start Your Campaign
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your vision into reality. Create a campaign and let the community support your innovative ideas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                labelName="Recipient Organisation*"
                placeholder="Microsoft..."
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Food donation..."
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange('title', e)}
              />
            </div>

            <FormField
              labelName="Description of the campaign *"
              placeholder="Write a description of your campaign"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaMoneyCheckAlt className="text-white text-xl" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    You will get 100% of the raised amount
                  </h4>
                  <p className="text-gray-600 mt-1">
                    No hidden fees. Every contribution goes directly to your campaign.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                labelName="Goal *"
                placeholder="ETH 10"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange('deadline', e)}
              />
            </div>

            <FormField
              labelName="Campaign Image *"
              isImageUpload={true}
              value={form.image}
              setImageUrl={(url) => {
                console.log('📸 Image uploaded:', url);
                setForm({ ...form, image: url });
              }}
            />

            <div className="flex justify-center pt-6">
              <CustomButton
                btnType="submit"
                title="Submit new campaign"
                styles="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCampaign;
