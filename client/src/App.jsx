import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import Campaigns from './pages/Campaigns';

function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/view-campaigns" element={<Campaigns/>} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
