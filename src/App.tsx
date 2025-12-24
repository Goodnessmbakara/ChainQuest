import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './components/wallet/WalletProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';

import { QuestsPage } from './pages/QuestsPage';
import { QuestDetailPage } from './pages/QuestDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <WalletProvider>
        <div className="min-h-screen bg-black text-white selection:bg-violet-500/30">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/quests" element={<QuestsPage />} />
              <Route path="/quests/:id" element={<QuestDetailPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WalletProvider>
    </Router>
  );
}

export default App;
