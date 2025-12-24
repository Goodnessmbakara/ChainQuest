import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

interface QuestCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  reward: number;
  category: string;
  completed?: boolean;
}

export const QuestCard = ({ id, title, description, difficulty, reward, category, completed }: QuestCardProps) => {
  const difficultyColor = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
    Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
  }[difficulty];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col rounded-2xl border bg-white/5 p-6 transition-colors ${
        completed ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-violet-500/30 hover:bg-white/10'
      }`}
    >
      {completed && (
        <div className="absolute right-4 top-4">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-full border px-3 py-1 text-xs font-medium ${difficultyColor}`}>
          {difficulty}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-violet-400">
          <Trophy className="h-4 w-4" />
          {reward} STX
        </div>
      </div>

      <div className="mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{category}</span>
        <h3 className="mt-1 text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
          {title}
        </h3>
      </div>

      <p className="mb-6 flex-1 text-sm text-gray-400 line-clamp-2">
        {description}
      </p>

      <Link
        to={`/quests/${id}`}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/20"
      >
        {completed ? 'View Details' : 'Start Quest'}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
};
