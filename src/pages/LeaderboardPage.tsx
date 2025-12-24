import { motion } from 'framer-motion';
import { Trophy, User } from 'lucide-react';

const LEADERBOARD_DATA = [
  { rank: 1, address: 'SP3...822', xp: 12500, quests: 42, badges: 15 },
  { rank: 2, address: 'SP1...933', xp: 11200, quests: 38, badges: 12 },
  { rank: 3, address: 'SP2...441', xp: 10800, quests: 35, badges: 11 },
  { rank: 4, address: 'SP4...119', xp: 9500, quests: 30, badges: 9 },
  { rank: 5, address: 'SP5...228', xp: 8200, quests: 28, badges: 8 },
  { rank: 6, address: 'SP6...337', xp: 7600, quests: 25, badges: 7 },
  { rank: 7, address: 'SP7...446', xp: 6400, quests: 22, badges: 6 },
  { rank: 8, address: 'SP8...555', xp: 5100, quests: 18, badges: 5 },
  { rank: 9, address: 'SP9...664', xp: 4200, quests: 15, badges: 4 },
  { rank: 10, address: 'SPa...773', xp: 3500, quests: 12, badges: 3 },
];

export const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Community Leaderboard</h1>
          <p className="text-gray-400">Top builders making their mark on Stacks.</p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Top 3 Podium */}
          <div className="mb-12 flex flex-col items-end justify-center gap-4 sm:flex-row">
            {/* 2nd Place */}
            <div className="flex w-full flex-col items-center sm:w-1/3">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-gray-400 bg-gray-400/10">
                <span className="text-2xl font-bold text-gray-400">2</span>
              </div>
              <div className="mb-1 font-bold text-white">{LEADERBOARD_DATA[1].address}</div>
              <div className="text-sm text-violet-400">{LEADERBOARD_DATA[1].xp} XP</div>
            </div>

            {/* 1st Place */}
            <div className="order-first flex w-full flex-col items-center sm:order-none sm:w-1/3 sm:-mt-12">
              <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-400 bg-yellow-400/10 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                <Trophy className="h-16 w-16 text-yellow-400" />
              </div>
              <div className="mb-1 text-xl font-bold text-white">{LEADERBOARD_DATA[0].address}</div>
              <div className="text-lg font-bold text-violet-400">{LEADERBOARD_DATA[0].xp} XP</div>
            </div>

            {/* 3rd Place */}
            <div className="flex w-full flex-col items-center sm:w-1/3">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-orange-400 bg-orange-400/10">
                <span className="text-2xl font-bold text-orange-400">3</span>
              </div>
              <div className="mb-1 font-bold text-white">{LEADERBOARD_DATA[2].address}</div>
              <div className="text-sm text-violet-400">{LEADERBOARD_DATA[2].xp} XP</div>
            </div>
          </div>

          {/* Ranking List */}
          <div className="space-y-4">
            {LEADERBOARD_DATA.slice(3).map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center gap-6">
                  <span className="flex h-8 w-8 items-center justify-center font-bold text-gray-500">
                    {user.rank}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20">
                      <User className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{user.address}</div>
                      <div className="text-xs text-gray-500">
                        {user.quests} Quests • {user.badges} Badges
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-bold text-white">{user.xp.toLocaleString()} XP</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
