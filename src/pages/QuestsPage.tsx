import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestCard } from '../../components/quest/QuestCard';
import { Search, Filter } from 'lucide-react';

// Mock Data (Replace with contract data later)
const MOCK_QUESTS = [
  {
    id: 1,
    title: 'Hello Stacks',
    description: 'Write your first Clarity smart contract and deploy it to the testnet. Learn the basics of Clarity syntax.',
    difficulty: 'Beginner' as const,
    reward: 10,
    category: 'Clarity',
    completed: false,
  },
  {
    id: 2,
    title: 'Data Storage 101',
    description: 'Learn how to store and retrieve data on the Stacks blockchain using maps and variables.',
    difficulty: 'Beginner' as const,
    reward: 15,
    category: 'Clarity',
    completed: false,
  },
  {
    id: 3,
    title: 'Sip-009 NFT',
    description: 'Build your own NFT contract implementing the SIP-009 standard. Mint your first token.',
    difficulty: 'Intermediate' as const,
    reward: 50,
    category: 'NFTs',
    completed: false,
  },
  {
    id: 4,
    title: 'DeFi Swap',
    description: 'Create a simple token swap contract using SIP-010 fungible tokens.',
    difficulty: 'Advanced' as const,
    reward: 100,
    category: 'DeFi',
    completed: false,
  },
  {
    id: 5,
    title: 'Wallet Connect',
    description: 'Integrate a frontend with your smart contract using Stacks.js and WalletConnect.',
    difficulty: 'Intermediate' as const,
    reward: 25,
    category: 'Frontend',
    completed: false,
  },
  {
    id: 6,
    title: 'Bitcoin Oracle',
    description: 'Read Bitcoin state directly from your Clarity smart contract using Proof-of-Transfer.',
    difficulty: 'Advanced' as const,
    reward: 150,
    category: 'Bitcoin L2',
    completed: false,
  },
  {
    id: 7,
    title: 'Access Control',
    description: 'Implement secure access controls and ownership management in your contracts.',
    difficulty: 'Beginner' as const,
    reward: 20,
    category: 'Security',
    completed: false,
  },
];

const CATEGORIES = ['All', 'Clarity', 'NFTs', 'DeFi', 'Frontend', 'Bitcoin L2', 'Security'];

export const QuestsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuests = MOCK_QUESTS.filter((quest) => {
    const matchesCategory = selectedCategory === 'All' || quest.category === selectedCategory;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Available Quests</h1>
          <p className="text-gray-400">Choose your path and start earning rewards.</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'border-violet-500 bg-violet-500 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search quests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Quest Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuests.map((quest) => (
            <QuestCard key={quest.id} {...quest} />
          ))}
        </div>

        {filteredQuests.length === 0 && (
          <div className="mt-20 text-center text-gray-500">
            No quests found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
