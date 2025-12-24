import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './components/wallet/WalletProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';

// Placeholder components for routes not yet implemented
const QuestsPage = () => <div className="pt-24 text-center text-white">Quests Coming Soon</div>;
const LeaderboardPage = () => <div className="pt-24 text-center text-white">Leaderboard Coming Soon</div>;
const DashboardPage = () => <div className="pt-24 text-center text-white">Dashboard Coming Soon</div>;

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
