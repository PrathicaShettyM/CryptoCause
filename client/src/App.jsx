import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import Campaigns from './pages/Campaigns';
import Profile from './pages/Profile';
import Verify from './pages/Verify';

function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/view-campaigns" element={<Campaigns/>} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-nfts" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
