import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';

function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
