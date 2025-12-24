import { motion } from 'framer-motion';
import { useWallet } from '../../hooks/useWallet';
import { QuestCard } from '../../components/quest/QuestCard';
import { Badge } from '../../components/ui/Badge';
import { Trophy, Flame, Target, Share2 } from 'lucide-react';

// Mock Data
const ACTIVE_QUESTS = [
  {
    id: 1,
    title: 'Hello Stacks',
    description: 'Write your first Clarity smart contract and deploy it to the testnet.',
    difficulty: 'Beginner' as const,
    reward: 10,
    category: 'Clarity',
    completed: true,
  },
  {
    id: 3,
    title: 'Sip-009 NFT',
    description: 'Build your own NFT contract implementing the SIP-009 standard.',
    difficulty: 'Intermediate' as const,
    reward: 50,
    category: 'NFTs',
    completed: false,
  }
];

const EARNED_BADGES = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Completed your first Clarity quest.',
    earnedAt: 'Dec 24, 2024',
    locked: false,
  },
  {
    id: 2,
    name: 'NFT Master',
    description: 'Minted your first NFT collection.',
    locked: true,
  },
  {
    id: 3,
    name: 'DeFi Wizard',
    description: 'Executed a token swap on Stacks.',
    locked: true,
  }
];

export const DashboardPage = () => {
  const { isConnected, balance } = useWallet();

  if (!isConnected) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Connect Wallet to View Dashboard</h2>
          <p className="text-gray-400">Please connect your Stacks wallet to track your progress.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Welcome back, Builder</h1>
            <p className="mt-2 text-gray-400">Your journey to mastering Stacks continues.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-violet-400">
            <Share2 className="h-4 w-4" />
            Share Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          {[
            { label: 'Total Earnings', value: `${balance} STX`, icon: <Trophy className="h-5 w-5 text-yellow-400" /> },
            { label: 'Quests Completed', value: '1', icon: <Target className="h-5 w-5 text-green-400" /> },
            { label: 'Current Streak', value: '3 Days', icon: <Flame className="h-5 w-5 text-orange-400" /> },
            { label: 'Global Rank', value: '#42', icon: <Trophy className="h-5 w-5 text-violet-400" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-xl font-bold text-white">Current Quests</h2>
            <div className="flex flex-col gap-4">
              {ACTIVE_QUESTS.map((quest) => (
                <QuestCard key={quest.id} {...quest} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-xl font-bold text-white">Your Achievements</h2>
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                {EARNED_BADGES.map((badge) => (
                  <Badge key={badge.id} {...badge} />
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6">
              <h3 className="mb-2 font-bold text-white">Next Milestone</h3>
              <p className="mb-4 text-sm text-gray-400">Complete 3 quests to unlock the "Consistent Coder" badge.</p>
              <div className="h-2 w-full rounded-full bg-black/50">
                <div className="h-full w-1/3 rounded-full bg-violet-500" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>1/3 Quests</span>
                <span>33%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
