import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

interface BadgeProps {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  earnedAt?: string;
  locked?: boolean;
}

export const Badge = ({ name, description, earnedAt, locked }: BadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`group relative flex flex-col items-center p-4 text-center ${
        locked ? 'opacity-50 grayscale' : 'opacity-100'
      }`}
    >
      <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
        {locked ? (
          <Hexagon className="absolute h-full w-full text-gray-700" strokeWidth={1} />
        ) : (
          <div className="absolute h-full w-full">
            <Hexagon className="h-full w-full text-violet-500 fill-violet-500/20" strokeWidth={1.5} />
            <div className="absolute inset-0 animate-pulse bg-violet-500/20 blur-xl rounded-full" />
          </div>
        )}
        
        {/* Placeholder for actual NFT image */}
        <span className={`text-2xl font-bold ${locked ? 'text-gray-600' : 'text-white'}`}>
          {name.charAt(0)}
        </span>
      </div>

      <h3 className={`font-bold ${locked ? 'text-gray-500' : 'text-white'}`}>
        {name}
      </h3>
      
      {!locked && earnedAt && (
        <span className="mt-1 text-xs text-violet-400">Earned {earnedAt}</span>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/90 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};
