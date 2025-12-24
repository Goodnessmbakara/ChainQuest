import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Trophy, Wallet, Zap } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300"
            >
              <Zap className="h-4 w-4" />
              <span>Stacks + WalletConnect Builder Challenge</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Master Stacks Development
              <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                One Quest at a Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
            >
              The gamified learn-to-earn platform for the Stacks ecosystem. Complete coding challenges, earn STX rewards, and mint verifiable NFT achievement badges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/quests"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-105 hover:bg-gray-100"
              >
                Start Your First Quest
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://docs.stacks.co"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10"
              >
                Read Stacks Docs
              </a>
            </motion.div>

            {/* Banner Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-violet-500/20"
            >
              <img
                src="/chainquest-banner.png"
                alt="ChainQuest Platform"
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { label: 'Total Quests', value: '7+' },
              { label: 'STX Rewards Pool', value: '12,000' },
              { label: 'NFTs Minted', value: '0' },
              { label: 'Builders Onboarded', value: '0' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Why Choose ChainQuest?</h2>
            <p className="mt-4 text-gray-400">Everything you need to become a Stacks expert.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Code2 className="h-8 w-8 text-violet-400" />,
                title: 'Interactive Coding',
                description: 'Write, deploy, and test Clarity smart contracts directly in the browser with real-time feedback.',
              },
              {
                icon: <Trophy className="h-8 w-8 text-indigo-400" />,
                title: 'Proof-of-Learn',
                description: 'Mint SIP-009 NFT badges upon quest completion as verifiable proof of your skills.',
              },
              {
                icon: <Wallet className="h-8 w-8 text-purple-400" />,
                title: 'Earn Crypto',
                description: 'Get rewarded in STX for every milestone you reach. Learn and earn simultaneously.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-violet-500/30 hover:bg-white/10"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
