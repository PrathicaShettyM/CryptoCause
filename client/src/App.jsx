import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import CampaignExplorer from './pages/CampaignExplorer';

function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/explore" element={<CampaignExplorer />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
